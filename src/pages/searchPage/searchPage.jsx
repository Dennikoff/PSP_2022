import React, {useEffect, useState, useRef} from 'react';
import classes from './searchPage.module.css'
import MyInputContainer from "../../components/myInputContainer/myInputContainer";
import ResultContainer from "../../components/resultContainer/resultContainer";
import {startSearch} from "../../api/startSearch";
import {useFetching} from "../../hooks/useFetching";
import {takeStatistic} from "../../api/takeStatistic";
import MySelectorSearch from "../../components/mySelectorSearch/mySelectorSearch";
import {storage} from "../../storage/storage";
import {MultiSelect} from 'primereact/multiselect';
import {Toast} from "primereact/toast";


const SearchPage = () => {
    let [flagOfSearch, setFlagOfSearch] = useState(false)
    const [selectedSites, setSelectedSites] = useState([])
    let headerClass = classes.headerBodyCenter
    const [sites, setSites] = useState([])
    if (sites.length !== 0) {
        headerClass = classes.headerBody
    }
    const toast = useRef(null);
    const limit = 10
    const [query, setQuery] = useState('')
    const [content, setContent] = useState([])
    const [result, setResult] = useState({
        result: false,
        count: 10
    })

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
            if (selectedSites.length === 0) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не выбран ни один сайт',
                    life: 2000
                });
                return;
            }
            let response
            try {
                if (flag) {
                    response = await startSearch(query, limit, 0, querySiteMas)
                } else {
                    response = await startSearch(query, limit, offset, querySiteMas)
                }
            } catch (e) {
                if(e.response.status === 404) {
                    toast.current.show({severity: 'warn', summary: 'Предупреждение', detail: e.response.data.error || 'Неизвестная ошибка', life: 2000});
                } else {
                    toast.current.show({severity: 'error', summary: 'Ошибка', detail: e.response.data.error || 'Неизвестная ошибка', life: 2000});
                }
                setSites([])
            }
            console.log(response.data.data || [])
            setSites(response.data.data || [])
            setResult({
                result: response.data.result,
                count: response.data.count
            })
            setStartS(false)
        } else {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: 'Поисковой запрос пуст', life: 2000});
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

    return (
        <div className={classes.searchBody}>
            <Toast ref={toast}/>
            <div className={classes.searchHeader}>
                <div className={classes.search__title}>
                    <h1>Поиск</h1>
                </div>
                <div className={headerClass}>
                    <div className={classes.site_selector}>
                        <MultiSelect value={selectedSites} onChange={(e) => setSelectedSites(e.value)} options={content}
                                     optionLabel="name"
                                     placeholder="Выбрать сайт" className={classes.primeSelector}/>
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
                {sites.length !== 0 &&
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