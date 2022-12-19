import React from 'react';
import classes from './authorizationPage.module.css'
import MyInput from "../../../components/myInput/myInput";


const AuthorizationPage = () => {
    return (
        <div className={classes.body}>
            <MyInput/>
            <MyInput/>
        </div>
    );
};

export default AuthorizationPage;