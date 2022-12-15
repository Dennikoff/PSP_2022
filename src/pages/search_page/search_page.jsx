import React, {useEffect, useState} from 'react';
import SiteListManagement from "../../components/siteListManagement/siteListManagement";
import classes from './search_page.module.css'
import MyInputContainer from "../../components/myInputContainer/myInputContainer";
import ResultContainer from "../../components/resultContainer/resultContainer";
import {startSearch} from "../../api/startSearch";
import {useFetching} from "../../hooks/useFetching";
import {takeStatistic} from "../../api/takeStatistic";
import MySelectorSearch from "../../components/mySelectorSearch/mySelectorSearch";
import {storage, store} from "../../storage/storage";

let counter = 0

let flagOfSearch = false
const SearchPage = () => {

    let headerClass = classes.headerBodyCenter

    if(flagOfSearch) {
        headerClass = classes.headerBody
    }

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

    const [takeStat, isLoadingStat, isErrorStat] = useFetching(async () => {
        const response = await takeStatistic()
        let tempArray = []
        for (let site of response["data"]["statistics"]["detailed"]) {
            if (site["status"] === "INDEXED") {
                tempArray.push({
                    url: site["url"],
                    name: site["name"],
                    isSelected: true
                })
            }
        }
        setContent(tempArray)
    })
    useEffect(() => {
        (async () => await takeStat())()
        console.log("some cont")
        console.log(content)
        return () => {
            console.log("im here")
            console.log(content)
            storage.set('content', content)
        }
    }, [])

    const [fetch, isLoading, isError] = useFetching(async (flag) => {
        if (query) {
            let querySiteMas = []
            for (let cont of content) {
                if (cont.isSelected) {
                    querySiteMas.push(cont.url)
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
        //TODO: something wrong with isError
    }, [isError])

    useEffect(() => {
        if (startS) {
            setPage(1)
        }
    }, [startS])

    useEffect(() => {
        setOffset((page - 1) * limit)
    }, [page])

    useEffect(() => {
        if (!startS) {
            fetch()
        }
    }, [offset])

    useEffect(() => {
        if (startS) {
            flagOfSearch = true
        }
        return () => flagOfSearch = false
    }, [startS])


    return (
        <div className={classes.searchBody}>
            <div className={classes.searchHeader}>
                <div className={classes.search__title}>
                    <h1>Поиск</h1>
                </div>
                <div className={headerClass}>
                    <div className={classes.site_selector}>
                        <MySelectorSearch text='Выбрать сайты'
                                          content={content}
                                          setContent={setContent}
                        />
                    </div>
                    <MyInputContainer query={query}
                                      setQuery={setQuery}
                                      fetch={fetch}
                                      isLoading={isLoading}
                                      setStartS={setStartS}
                    />
                </div>
            </div>
            <div className={classes.site_body}>
                {flagOfSearch &&
                    <ResultContainer sites={sites}
                                     isLoading={isLoading}
                                     result={result}
                                     page={page}
                                     setPage={setPage}
                                     isError={isError}
                                     flag={flagOfSearch}
                                     limit={limit}
                    />
                }
            </div>
        </div>);
};

export default SearchPage;