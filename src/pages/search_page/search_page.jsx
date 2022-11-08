import React, {useEffect, useState} from 'react';
// import MyInput from "../../components/myInput/myInput";
import MySelector from "../../components/mySelector/mySelector";
// import MyButton from "../../components/myButton/myButton";
import classes from './search_page.module.css'
import MyInputContainer from "../../components/myInputContainer/myInputContainer";
import ResultContainer from "../../components/resultContainer/resultContainer";
import json from '../../json_templates/search.json'
import {startSearch} from "../../api/startSearch";
import {useFetching} from "../../hooks/useFetching";


const SearchPage = () => {
    const [query, setQuery] = useState('')


    const [result, setResult] = useState(false)
    const [sites, setSites] = useState([])



    useEffect( () => {
        const siteArray = []
        setResult(json['result'])
        for(let result of json['data']){
            siteArray.push(result)
        }
        setSites(siteArray)
    }, [])

    const [fetch, isLoading, isError] = useFetching(async () => {
        const response = await startSearch(query, setSites)
        console.log(response.data.data)
    })

    return (
        <div className={classes.search__body}>
            <div className={classes.search__title}>
                <h1>Поиск</h1>
            </div>
            <div className={classes.site_body}>
                <div className={classes.site_selector}>
                    <MySelector text='Все сайты'/>
                </div>
                <MyInputContainer query={query} setQuery={setQuery} setSites={setSites}/>

                <ResultContainer sites={sites}/>
            </div>
        </div>);
};

export default SearchPage;