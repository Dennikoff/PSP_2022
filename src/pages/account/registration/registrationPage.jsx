

import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/authContext";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import {storage} from "../../../storage/storage";
import {Link, useNavigate} from "react-router-dom";
import classes from './registrationPage.module.css'
import MyInput from "../../../components/myInput/myInput";
import {useFetching} from "../../../hooks/useFetching";
import {login} from "../../../api/auth/login";

import '../loginPage/custom_inputs.css'
import {registration} from "../../../api/registration";

const RegistrationPage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [repPasswordText, setRepPasswordText] = useState('')

    const [handleUserRegistration, loading, isError] = useFetching(async () => {
        try {
            await registration(loginText, passwordText)
        } catch (e) {
            console.log(e)
            return
        }

        navigate("/login")
    })


    return (
        <div className={classes.registrationBody}>
            <div className={classes.registrationContainer}>

                <h1 className={classes.title}>
                    Регистрация
                </h1>
                <div className={classes.loginInput}>
                    <span className="p-float-label">
                        <InputText
                            id="username"
                            value={loginText}
                            onChange={(e) => setLoginText(e.target.value)}
                        />
                        <label htmlFor="username">Почта</label>
                    </span>
                </div>
                <div className={classes.passwordInput}>
                    <span className="p-float-label">
                        <Password
                            id="password"
                            value={passwordText}
                            onChange={(e) => setPasswordText(e.target.value)}
                            toggleMask
                            feedback={false}
                        />
                        <label htmlFor="password">Пароль</label>
                    </span>
                </div>
                <div className={classes.repeatPasswordInput}>
                    <span className="p-float-label">
                        <Password
                            id="password"
                            value={repPasswordText}
                            onChange={(e) => setRepPasswordText(e.target.value)}
                            toggleMask
                            feedback={false}
                        />
                        <label htmlFor="password">Повторите пароль</label>
                    </span>
                </div>
                <div className={classes.buttonApplyContainer}>
                    <Button
                        children={<span>&nbsp;Зарегистрироваться</span>}
                        className={classes.buttonApply}
                        icon="pi pi-check"
                        loading={loading}
                        severity="success"
                        onClick={handleUserRegistration}
                    />
                </div>
                <div className={classes.buttonRegContainer}>
                    <Button
                        children={<Link className={classes.regLink} to={'/login'}>
                            Уже есть аккаунт
                        </Link>}
                        severity="secondary" outlined
                        className={classes.buttonApply}

                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;