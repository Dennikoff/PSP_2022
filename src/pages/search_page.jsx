import React, {useState} from 'react';
import './style/search_page.css'
import MyInput from "../components/myInput/myInput";
import MySelector from "../components/mySelector/mySelector";
import MyButton from "../components/myButton/myButton";


const SearchPage = () => {
    const [query, setQuery] = useState('')

    return (
        <div className='search__body'>
            <div className='search__title'>
                <h1>Поиск</h1>
            </div>
            <div className="site_body">
                <div className="site_selector">
                    <MySelector text='Все сайты'/>
                </div>

                <div className="query_container">
                    <div className="query_input">
                        <MyInput type='text'
                                 value={query}
                                 onChange={(e) => setQuery(e.target.value)}
                                 placeholder='Запрос'
                        />
                    </div>
                    <div className='query_button'>
                        <MyButton children='Поиск'
                                  onClick={() => console.log(query)}
                        />
                    </div>

                </div>
            </div>


        </div>);
};

export default SearchPage;