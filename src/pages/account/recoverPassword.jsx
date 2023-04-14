import React from 'react';
import classes from './recoverPassword.module.css'
import {InputText} from 'primereact/inputtext'
import {useState, useRef} from "react";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Link, useNavigate} from "react-router-dom";
import {Toast} from 'primereact/toast'
import {storage} from "../../storage/storage";
import {sendRecoverEmail} from "../../api/email/sendRecoverEmail";
import {recoverPassword} from "../../api/user/recoverPassword";
import {Tooltip} from "primereact/tooltip";

const RecoverPassword = () => {
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const toast = useRef(null)
    const navigate = useNavigate()
    const [codeSend, setCodeSend] = useState(false)

    async function resetPassword() {
        if(password !== repPassword) {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: 'Пароли не совпадают', life: 3000});
            return
        }
        try {
            await recoverPassword(email, password, code)
            toast.current.show({severity: 'success', summary: 'Успешно', detail: 'Пароль успешно изменён', life: 1400});
            setTimeout(() => navigate('/login'), 1500)
        } catch (e) {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: e.response.data.error, life: 3000});
            return
        }
    }

    async function sendCode() {
        let response
        try {
            await sendRecoverEmail(email)
            setCodeSend(true)
        } catch(e) {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: e.response.data.error, life: 3000});
            return
        }
        toast.current.show({severity: 'success', summary: 'Успешно', detail: 'Код успешно отправлен', life: 3000});


    }

    return (
        <div className={classes.recoverBody}>
            <Toast ref={toast}></Toast>
            <Tooltip target="#password" autoHide={false} event="both">
                <div>
                    Пароль должен быть не менее 8 символов <br/>
                    Содержать одну заглавную и одну строчкую <br/>
                    букву, а также спецсимвол
                </div>
            </Tooltip>
            <div className={classes.recoverContainer}>

                <h1 className={classes.title}>
                    Восстановление
                </h1>
                <div className={classes.emailInputContainer}>
                    <span className="p-float-label">
                        <InputText
                            id="email"
                            value={email}
                            className={classes.emailInput}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Почта</label>
                    </span>
                    <Button
                        severity={'success'}
                        className={classes.buttonSend}
                        label='Отправить код'
                        onClick={sendCode}
                    />
                </div>
                <div className={classes.codeInput}>
                    <span className="p-float-label">
                        <InputText
                            disabled={!codeSend}
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <label htmlFor="code">Код подтверждения</label>
                    </span>
                </div>
                <div className={classes.codeInput}>

                    <span className="p-float-label">
                        <Password
                            id="password"
                            value={password}
                            onKeyDown={(event) => {
                                if(event.code === 'Enter') {
                                    document.getElementById("rep-password").children[0].focus()
                                }
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                        />
                        <label htmlFor="password">Новый пароль</label>
                    </span>
                </div>
                <div className={classes.codeInput}>
                    <span className="p-float-label">
                        <Password
                            id="rep-password"
                            value={repPassword}
                            onKeyDown={(event) => {
                                if(event.code === 'Enter') {
                                    resetPassword()
                                }
                            }}
                            onChange={(e) => setRepPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                        />
                        <label htmlFor="rep-password">Повторить пароль</label>
                    </span>
                </div>


                <div className={classes.buttonApplyContainer}>
                    <Button
                        children={<span>&nbsp;Подтвердить</span>}
                        className={classes.buttonApply}

                        loading={loading}
                        severity="success"
                        onClick={resetPassword}
                    />
                </div>
                <div className={classes.buttonReturnContainer}>
                    <Button
                        children={<span>Вернуться</span>}
                        className={classes.buttonApply}

                        loading={loading}
                        severity="secondary" outlined
                        onClick={() => navigate('/login')}
                    />
                </div>

            </div>
        </div>

    );
};

export default RecoverPassword;