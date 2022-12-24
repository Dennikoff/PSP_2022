import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/authContext";
import MyButton from "../../../components/myButton/myButton";
import {storage} from "../../../storage/storage";
import {Link, useNavigate} from "react-router-dom";
import classes from './registrationPage.module.css'
import MyInput from "../../../components/myInput/myInput";
import {useFetching} from "../../../hooks/useFetching";
import {login} from "../../../api/auth/login";
import {registration} from "../../../api/registration";


const RegistrationPage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [repPasswordText, setRepPasswordText] = useState('')

    const handleUserLogin = async () => {
        if(passwordText !== repPasswordText) {
            alert('Пароли не совпадают')
            return
        }
        let response
        try {
            response = await registration(loginText, passwordText)
        } catch (e) {
            alert(e.response.data.error)
            return
        }
        navigate("/login")
    }


    return (
        <div className={classes.registrationBody}>
            <div className={classes.registrationContainer}>

                <h1 className={classes.title}>
                    Регистрация
                </h1>
                <div className={classes.loginText}>
                    Уже есть аккаунт?
                    <Link className={classes.link} to={'/login'}>
                        Войдите
                    </Link>
                </div>
                <div className={classes.emailInput}>
                    <MyInput placeholder="Почта"
                             value={loginText}
                             onChange={(e) => {setLoginText(e.target.value)}}
                             autoComplete={loginText}
                    />
                </div>
                <div className={classes.passwordInput}>
                    <MyInput placeholder="Пароль"
                             value={passwordText}
                             onChange={(e) => {setPasswordText(e.target.value)}}
                    />
                </div>
                <div className={classes.repPasswordInput}>
                    <MyInput placeholder="Повторите пароль"
                             value={repPasswordText}
                             onChange={(e) => {setRepPasswordText(e.target.value)}}
                    />
                </div>
                <div className={classes.buttonApply}>
                    <MyButton children={"Зарегистрироваться"}
                              onClick={async () => {
                                  handleUserLogin()
                              }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;