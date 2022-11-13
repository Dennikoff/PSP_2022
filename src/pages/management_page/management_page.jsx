import React from 'react';
import classes from './management_page.module.css'
import MyButton from "../../components/myButton/myButton";


const ManagementPage = () => {
    return (
        <div className={classes.management__body}>
            <div className={classes.management__title}>
                <h1>Управление</h1>
            </div>
            <div className={classes.site_body}>
                <MyButton children="Остановить индексацию"

                />
            </div>

        </div>
    );
};

export default ManagementPage;