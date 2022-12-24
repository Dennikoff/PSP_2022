import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/authContext";
import MyButton from "../../../components/myButton/myButton";
import {storage} from "../../../storage/storage";
import {Link, useNavigate} from "react-router-dom";
import classes from './loginPage.module.css'
import MyInput from "../../../components/myInput/myInput";
import {useFetching} from "../../../hooks/useFetching";
import {login} from "../../../api/auth/login";


const LoginPage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState('vadim.murov@mail.ru')
    const [passwordText, setPasswordText] = useState('admin')

    const handleUserLogin = async () => {
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
    }


    return (
        <div className={classes.loginBody}>
                <div className={classes.loginContainer}>

                    <h1 className={classes.title}>
                        Вход
                    </h1>
                    <div className={classes.registerText}>
                        Нет аккаунта?
                        <Link className={classes.link} to={'/register'}>
                            Зарегистрируйтесь
                        </Link>
                    </div>
                    <div className={classes.loginInput}>
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
                    <div className={classes.buttonApply}>
                        <MyButton children={"Войти"}
                                  onClick={async () => {
                                      handleUserLogin()
                                      // storage.set('tokens', [data.accessToken, data.refreshToken])
                                      // storage.set('isAuth', true)
                                      // authContext.setIsAuth(true)
                                      // navigate("/")
                                  }}
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