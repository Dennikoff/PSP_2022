import React, {useState} from 'react';
import classes from './management_page.module.css'
import MyButton from "../../components/myButton/myButton";
import MyInput from "../../components/myInput/myInput";


const ManagementPage = () => {
    const [link, setLink] = useState('')
    return (
        <div className={classes.management__body}>
            <div className={classes.management__title}>
                <h1>Управление</h1>
            </div>

            <div className={classes.site_body}>
                <div className={classes.button_container}>
                    <MyButton children="Остановить индексацию"
                    />
                </div>
                <div className={classes.input_container}>
                    <div className={classes.input_title}>
                        Добавить\Обновить ссылку
                    </div>
                    <div className={classes.input}>
                        <MyInput placeholder="Ссылка"
                                 value={link}
                                 onChange={(e) => {setLink(e.target.value)}}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManagementPage;