import React, {useState} from 'react';
import classes from './management_page.module.css'
import MyButton from "../../components/myButton/myButton";
import MyInput from "../../components/myInput/myInput";
import {startIndexing} from "../../api/startIndexing";
import {useFetching} from "../../hooks/useFetching";
import {useStopFetching} from "../../hooks/useStopFetching";
import {stopIndexing} from "../../api/stopIndexing";


const ManagementPage = () => {
    const [link, setLink] = useState('')
    const [name, setName] = useState('')
    async function btnStartIndexing() {
        await startIndex()
    }

    async function btnStopIndexing() {
        await stopIndex()
    }

    const [startIndex, isIndexing, isErrorStart] = useFetching(async () => {
        const response = await startIndexing()
        console.log(response)
    })

    const [stopIndex, isErrorStop] = useStopFetching(async () => {
        const response = await stopIndexing()
        console.log(response)
    }, isIndexing)

    function btnAdd(link) {

    }

    return (
        <div className={classes.management__body}>
            <div className={classes.management__title}>
                <h1>Управление</h1>
            </div>

            <div className={classes.site_body}>
                <div className={classes.button_container}>
                    {isIndexing
                        ?
                        <MyButton children="Остановить индексацию"
                                  onClick={async () => {
                                      await btnStopIndexing()
                                  }}
                                  style={{"backgroundColor": "red"}}
                        />
                        :
                        <MyButton children="Начать индексацию"
                                  onClick={async () => {
                                      await btnStartIndexing()
                                  }}
                        />
                    }
                </div>
                <div className={classes.input_container}>
                    <div className={classes.input_title}>
                        Добавить\Обновить ссылку
                    </div>
                    <div className={classes.input}>
                        <MyInput placeholder="Ссылка*"
                                 value={link}
                                 onChange={(e) => {
                                     setLink(e.target.value)
                                 }}
                        />
                        <MyInput placeholder="Имя"
                                 value={name}
                                 onChange={(e) => {
                                     setName(e.target.value)
                                 }}
                        />
                    </div>
                    <div className={classes.input_button}>
                        <MyButton children="Добавить"
                                  onClick={() => {btnAdd(link)}}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManagementPage;