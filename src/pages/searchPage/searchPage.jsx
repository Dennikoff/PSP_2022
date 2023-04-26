import React, {useEffect, useState} from 'react';
import classes from './searchPage.module.css'
import MyInputContainer from "../../components/myInputContainer/myInputContainer";
import ResultContainer from "../../components/resultContainer/resultContainer";
import {startSearch} from "../../api/startSearch";
import {useFetching} from "../../hooks/useFetching";
import {takeStatistic} from "../../api/takeStatistic";
import MySelectorSearch from "../../components/mySelectorSearch/mySelectorSearch";
import {storage} from "../../storage/storage";
import { MultiSelect } from 'primereact/multiselect';



const SearchPage = () => {
    let [flagOfSearch, setFlagOfSearch] = useState(false)
    let headerClass = classes.headerBodyCenter

    if (flagOfSearch) {
        headerClass = classes.headerBody
    }

    const limit = 10
    const [query, setQuery] = useState('')
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
        return () => {
            storage.set('content', content)
        }
    }, [])

    const [fetch, isLoading, isError] = useFetching(async (flag) => {
        if (query) {
            let querySiteMas = []
            for (let cont of selectedSites) {
                querySiteMas.push(cont.url)
            }
            let response
            if (flag) {
                response = await startSearch(query, limit, 0, querySiteMas)
            } else {
                response = await startSearch(query, limit, offset, querySiteMas)
            }
            console.log(response.data.data)
            setSites(response.data.data || [])
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
            setOffset(0)
        }
    }, [startS])

    useEffect(() => {
        if (!startS) {
            fetch()
        }
    }, [offset])

    useEffect(() => {
        if (startS) {
            setFlagOfSearch(true)
        }
    }, [startS])
    const [selectedSites, setSelectedSites] = useState(null)

    return (
        <div className={classes.searchBody}>
            <div className={classes.searchHeader}>
                <div className={classes.search__title}>
                    <h1>Поиск</h1>
                </div>
                <div className={headerClass}>
                    <div className={classes.site_selector}>
                        <MultiSelect value={selectedSites} onChange={(e) => setSelectedSites(e.value)} options={content} optionLabel="name"
                                     placeholder="Выбрать сайт" className={classes.primeSelector} />
                        {/*<MySelectorSearch text='Выбрать сайты'*/}
                        {/*                  content={content}*/}
                        {/*                  setContent={setContent}*/}
                        {/*/>*/}
                    </div>
                    <MyInputContainer query={query}
                                      setQuery={setQuery}
                                      fetch={fetch}
                                      isLoading={isLoading}
                                      setStartS={setStartS}
                    />
                </div>
            </div>
            <div className={classes.siteBody}>
                {flagOfSearch &&
                    <ResultContainer sites={sites}
                                     isLoading={isLoading}
                                     result={result}
                                     page={offset}
                                     setPage={setOffset}
                                     isError={isError}
                                     flag={flagOfSearch}
                                     limit={limit}
                    />
                }
            </div>
        </div>);
};

export default SearchPage;