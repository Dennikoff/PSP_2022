import React, {useState} from 'react';
import MyInput from "../../components/myInput/myInput";
import MySelector from "../../components/mySelector/mySelector";
import MyButton from "../../components/myButton/myButton";
import classes from './search_page.module.css'

const SearchPage = () => {
    const [query, setQuery] = useState('')

    return (
        <div className={classes.search__body}>
            <div className={classes.search__title}>
                <h1>Поиск</h1>
            </div>
            <div className={classes.site_body}>
                <div className={classes.site_selector}>
                    <MySelector text='Все сайты'/>
                </div>

                <div className={classes.query_container}>
                    <div className={classes.query_input}>
                        <MyInput type='text'
                                 value={query}
                                 onChange={(e) => setQuery(e.target.value)}
                                 placeholder='Запрос'
                        />
                    </div>
                    <div className={classes.query_button}>
                        <MyButton children='Поиск'
                                  onClick={() => console.log(query)}
                        />
                    </div>
                </div>
                <div className={classes.result_container}>
                    <h3 className={classes.result_title}>
                        Результаты:
                    </h3>
                </div>
            </div>


        </div>);
};

export default SearchPage;