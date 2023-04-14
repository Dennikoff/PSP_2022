import React, {useContext, useState, useRef} from 'react';
import {AuthContext} from "../../../context/authContext";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Tooltip } from 'primereact/tooltip';
import {storage} from "../../../storage/storage";
import {Link, useNavigate} from "react-router-dom";
import classes from './registrationPage.module.css'
import MyInput from "../../../components/myInput/myInput";
import {useFetching} from "../../../hooks/useFetching";
import {login} from "../../../api/auth/login";

import '../loginPage/custom_inputs.css'
import {registration} from "../../../api/registration";
import {Toast} from "primereact/toast";

const RegistrationPage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [repPasswordText, setRepPasswordText] = useState('')
    const toast = useRef(null);
    const [handleUserRegistration, loading, isError] = useFetching(async () => {
        if(passwordText !== repPasswordText) {
            toast.current.show({severity:'error', summary: 'Ошибка', detail: 'Пароли не совпадают', life: 3000});
            return
        }

        try {
            await registration(loginText, passwordText)
        } catch (e) {
            toast.current.show({severity:'error', summary: 'Ошибка', detail:e.response.data.error, life: 3000});
            return
        }
        storage.set('email', loginText)
        navigate("/email-confirm")
    })

    function checkPassword(password) {

    }

    return (
        <div className={classes.registrationBody}>
            <Tooltip target="#password" autoHide={false} event="both">
                <div>
                    Пароль должен быть не менее 8 символов <br/>
                    Содержать Одну заглавную и одну строчкую <br/>
                    букву, а также спецсимвол
                </div>
            </Tooltip>
            <Toast ref={toast}></Toast>
            <div className={classes.registrationContainer}>

                <h1 className={classes.title}>
                    Регистрация
                </h1>
                <div className={classes.loginInput}>
                    <span className="p-float-label">
                        <InputText
                            id="username"
                            onKeyDown={(event) => {
                                if(event.code === 'Enter') {
                                    document.getElementById("password").children[0].focus()
                                }
                            }}

                            value={loginText}
                            onChange={(e) => setLoginText(e.target.value)}
                        />
                        <label htmlFor="username">Почта</label>
                    </span>
                </div>
                <div className={classes.passwordInputContainer}>
                    <span className="p-float-label">
                        <Password
                            id="password"
                            className={classes.passwordInput}

                            value={passwordText}
                            onKeyDown={(event) => {
                                if(event.code === 'Enter') {
                                    document.getElementById("rep-password").children[0].focus()
                                }
                            }}
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
                            id="rep-password"
                            value={repPasswordText}
                            onKeyDown={(event) => {
                                if(event.code === 'Enter') {
                                    handleUserRegistration()
                                }
                            }}
                            onChange={(e) => setRepPasswordText(e.target.value)}
                            toggleMask
                            feedback={false}
                        />
                        <label htmlFor="rep-password">Повторите пароль</label>
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
                        label={'Уже есть аккаунт'}
                        severity="secondary" outlined
                        className={classes.buttonApply}
                        onClick={() => navigate('login')}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;