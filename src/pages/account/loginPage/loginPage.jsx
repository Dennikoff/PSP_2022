import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/authContext";

import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';

import {storage} from "../../../storage/storage";
import {Link, useNavigate} from "react-router-dom";
import classes from './loginPage.module.css'
import MyInput from "../../../components/myInput/myInput";
import {useFetching} from "../../../hooks/useFetching";
import {login} from "../../../api/auth/login";

import './custom_inputs.css'

const LoginPage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')

    const [handleUserLogin, loading, isError] = useFetching(async () => {
        let response
        try {
            response = await login(loginText, passwordText)
        } catch (e) {
            console.log(e)
            alert("Неправильный логин или пароль")
            return
        }
        const data = response.data
        storage.set('tokens', [data.accessToken, data.refreshToken])
        storage.set('isAuth', true)
        authContext.setIsAuth(true)
        navigate("/")
    })


    return (
        <div className={classes.loginBody}>
            <div className={classes.loginContainer}>

                <h1 className={classes.title}>
                    Вход
                </h1>
                <div className={classes.loginBodyTextContainer}>
                    <span className={classes.loginBodyText}>
                        Для входа в аккаунт введите вашу почту и пароль
                    </span>
                </div>
                <div className={classes.loginInput}>
                    <span className="p-float-label">
                        <InputText
                            id="username"
                            value={loginText}
                            onChange={(e) => setLoginText(e.target.value)}
                        />
                        <label htmlFor="username">Логин для входа</label>
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
                <div className={classes.buttonApplyContainer}>
                    <Button
                        children={<span>&nbsp;Вход</span>}
                        className={classes.buttonApply}
                        icon="pi pi-check"
                        loading={loading}
                        severity="success"
                        onClick={handleUserLogin}
                    />
                </div>
                <div className={classes.buttonRegContainer}>
                    <Button
                        children={<Link className={classes.regLink} to={'/register'}>
                            Регистрация
                        </Link>}
                        severity="secondary" outlined
                        className={classes.buttonApply}

                    />
                </div>
                <div className={classes.restorePassword}>
                    Забыли пароль?
                    <Link className={classes.link} to={'/notFound'}>
                        Восстановить
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;