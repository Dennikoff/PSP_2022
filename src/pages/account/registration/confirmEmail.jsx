import React from 'react';
import classes from './confirmEmailPage.module.css'
import {InputText} from 'primereact/inputtext'
import {useState, useRef} from "react";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Link, useNavigate} from "react-router-dom";
import {storage} from "../../../storage/storage";
import {checkVerificationCode} from "../../../api/checkVerificationCode";
import {Toast} from 'primereact/toast'
const ConfirmEmail = () => {
    const [code, setCode] = useState('')
    const [loading, setLoading] =  useState(false)
    const email = storage.get('email')
    const toast = useRef(null)
    const navigate = useNavigate()
    async function handleUserConfirmation() {
        try {
            await checkVerificationCode(code, email)
        } catch(e) {
            toast.current.show({severity:'error', summary: 'Ошибка', detail:e.response.data.error, life: 3000});
            return
        }
        navigate('/login')
    }

    return (
        <div className={classes.confirmationContent}>
            <Toast ref={toast}></Toast>
            <div className={classes.confirmationContainer}>

                <h1 className={classes.title}>
                    Регистрация
                </h1>
                <div className={classes.confirmationLabel}>
                    Сообщение с подтверждением отправлено!
                </div>
                <div className={classes.confirmationBody}>
                    Чтобы завершить регистрацию,
                    необходимо подтвердить адрес эл. почты.
                    Пожалуйста, проверьте ваш почтовый ящик и введите полученный код ниже.
                    <br/>Сообщение отправлено на почту: <b>{email}</b>
                </div>
                <div className={classes.codeInput}>
                    <span className="p-float-label">
                        <InputText
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <label htmlFor="code">Код подтверждения</label>
                    </span>
                </div>


                <div className={classes.buttonApplyContainer}>
                    <Button
                        children={<span>&nbsp;Подтвердить</span>}
                        className={classes.buttonApply}
                        icon="pi pi-check"
                        loading={loading}
                        severity="success"
                        onClick={handleUserConfirmation}
                    />
                </div>

            </div>
        </div>

    );
};

export default ConfirmEmail;