import React, {useEffect, useState} from 'react';
import SiteListManagement from "../../components/mySelectorManagement/siteListManagement";
import classes from './search_page.module.css'
import MyInputContainer from "../../components/myInputContainer/myInputContainer";
import ResultContainer from "../../components/resultContainer/resultContainer";
import {startSearch} from "../../api/startSearch";
import {useFetching} from "../../hooks/useFetching";
import {takeStatistic} from "../../api/takeStatistic";
import MySelectorSearch from "../../components/mySelectorSearch/mySelectorSearch";


const SearchPage = () => {
    const limit = 10
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [result, setResult] = useState({
        result: false,
        count: 10
    })
    const [sites, setSites] = useState([])
    const [offset, setOffset] = useState(0)

    const [startS, setStartS] = useState(false)

    // useEffect( () => {
    //     const siteArray = []
    //     setResult({
    //         result: json['result'],
    //         count: json['count']
    //     })
    //     for(let result of json['data']){
    //         siteArray.push(result)
    //     }
    //     setSites(siteArray)
    // }, [])

    const [takeStat, isLoadingStat, isErrorStat] = useFetching(async () => {
        const response = await takeStatistic()
        let tempArray = []
        for(let site of response["data"]["statistics"]["detailed"]) {
            if(site["status"] === "INDEXED") {
                tempArray.push({
                    link: site["url"],
                    name: site["name"],
                    isSelected: true
                })
            }
        }
        setContent(tempArray)
    })

    useEffect(() => {
        takeStat()
    }, [])

    const [fetch, isLoading, isError] = useFetching(async (flag) => {
        if(query) {
            let querySiteMas = []
            for(let cont of content) {
                if(cont.isSelected) {
                    querySiteMas.push(cont.link)
                }
            }
            let response
            if (flag) {
                response = await startSearch(query, limit, 0, querySiteMas)
            } else {
                response = await startSearch(query, limit, offset, querySiteMas)
            }
            setSites(response.data.data)
            setResult({
                result: response.data.result,
                count: response.data.count
            })
            setStartS(false)
        }
    })

    useEffect(() => {
        console.log(isError) //TODO: something wrong with isError
    }, [isError])

    useEffect(() => {
        if(startS) {
            setPage(1)
        }
    }, [startS])

    useEffect(() => {
        setOffset((page - 1) * limit)
    }, [page])

    useEffect(() => {
        if(!startS) {
            fetch()
        }
    }, [offset])



    return (
        <div className={classes.search__body}>
            <div className={classes.search__title}>
                <h1>Поиск</h1>
            </div>
            <div className={classes.site_body}>
                <div className={classes.site_selector}>
                    <MySelectorSearch text='Все сайты'
                                        content={content}
                                        setContent={setContent}
                    />
                </div>
                <MyInputContainer query={query}
                                  setQuery={setQuery}
                                  fetch={fetch}
                                  isLoading={isLoading}
                                  setStartS={setStartS}
                                  content={content}
                />
                <ResultContainer sites={sites}
                                 isLoading={isLoading}
                                 result={result}
                                 page={page}
                                 setPage={setPage}
                                 isError={isError}
                />
            </div>
        </div>);
};

export default SearchPage;