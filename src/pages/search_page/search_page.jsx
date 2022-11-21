import React, {useEffect, useState} from 'react';
// import MyInput from "../../components/myInput/myInput";
import MySelector from "../../components/mySelector/mySelector";
// import MyButton from "../../components/myButton/myButton";
import classes from './search_page.module.css'
import MyInputContainer from "../../components/myInputContainer/myInputContainer";
import ResultContainer from "../../components/resultContainer/resultContainer";
import {startSearch} from "../../api/startSearch";
import {useFetching} from "../../hooks/useFetching";


const SearchPage = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const limit = 20

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

    const [fetch, isLoading, isError] = useFetching(async (flag) => {
        let response
        if(flag) {
            response = await startSearch(query, limit, 0)
        } else {
            response = await startSearch(query, limit, offset)
        }
        setSites(response.data.data)
        setResult({
            result: response.data.result,
            count: response.data.count
        })
        setStartS(false)
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
                    <MySelector text='Все сайты'/>
                </div>
                <MyInputContainer query={query}
                                  setQuery={setQuery}
                                  fetch={fetch}
                                  isLoading={isLoading}
                                  setStartS={setStartS}
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