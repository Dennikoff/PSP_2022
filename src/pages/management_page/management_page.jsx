import React, {useState} from 'react';
import classes from './management_page.module.css'
import MyButton from "../../components/myButton/myButton";
import MyInput from "../../components/myInput/myInput";
import {startIndexing} from "../../api/startIndexing";


const ManagementPage = () => {
    const [link, setLink] = useState('')
    return (
        <div className={classes.management__body}>
            <div className={classes.management__title}>
                <h1>Управление</h1>
            </div>

            <div className={classes.site_body}>
                <div className={classes.button_container}>
                    <MyButton children="Начать индексацию"
                              onClick={() => {startIndexing()}}
                    />
                </div>
                <div className={classes.input_container}>
                    <div className={classes.input_title}>
                        Добавить\Обновить ссылку
                    </div>
                    <div className={classes.input}>
                        <MyInput placeholder="Ссылка"
                                 value={link}
                                 onChange={(e) => {
                                     setLink(e.target.value)
                                 }}
                        />
                    </div>
                    <div className={classes.input_button}>
                        <MyButton children="Добавить"/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManagementPage;