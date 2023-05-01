import React, {useContext, useState, useEffect, useRef} from 'react';
import classes from './profilePage.module.css'
import {AuthContext} from "../../context/authContext";
import {Toast} from 'primereact/toast'
import MyButton from "../../components/myButton/myButton";
import {storage} from "../../storage/storage";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../utils/logoutUser";
import MyInput from "../../components/myInput/myInput";
import SelectedBlack from "../../img/siteSelectedBlack.svg";
import UnSelectedBlack from "../../img/siteNotSelectedBlack.svg";
import {Password} from 'primereact/password';
import {Button} from "primereact/button";
import {getAuthInfo} from "../../api/user/getAuthInfo";
import {changePassword} from "../../api/user/changePassword";
import notSelectedBlack from "../../img/siteNotSelectedBlack.svg";
import notSelectedWhite from "../../img/siteNotSelectedWhite.svg";
import selectedBlack from "../../img/siteSelectedBlack.svg";
import selectedWhite from "../../img/siteSelectedWhite.svg";
import trashBinBlack from "../../img/trashBinBlack.svg";
import trashBinWhite from "../../img/trashBinWhite.svg";
import {ThemeContext} from "../../context/themContext";
import * as string_decoder from "string_decoder";
import {setNotify} from "../../api/user/setNotify";

const ProfilePage = () => {
    const [selected, setSelected] = useState()
    const [notSelected, setNotSelected] = useState()
    const authContext = useContext(AuthContext)
    let context = React.useContext(ThemeContext)
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [login, setLogin] = useState('')

    const toast = useRef(null)
    const [notificationFlag, setNotificationFlag] = useState(true)

    async function handleNotification() {
        try {
            await setNotify(login, !notificationFlag)
        } catch(e) {
            console.log(e)
        }
        setNotificationFlag(!notificationFlag)
    }

    async function handleSaveClicked() {
        let response

        try {
            response = await changePassword(login, oldPassword, newPassword)
        } catch(e) {
            toast.current.show({severity:'error', summary: 'Ошибка', detail:e.response.data.error, life: 3000});
            return
        }

        const data = response.data
        storage.set('tokens', [data.accessToken, data.refreshToken])
        storage.set('isAuth', true)
        toast.current.show({severity:'success', summary: 'Успешно', detail: 'Пароль успешно изменён', life: 3000});
        setNewPassword('')
        setOldPassword('')
    }
    useEffect(() => {
        setNotSelected(context.theme === 'light' ? notSelectedBlack : notSelectedWhite)
        setSelected(context.theme === 'light' ? selectedBlack : selectedWhite)
    }, [context])
    useEffect(() => {

        try {
            (async () => {
                const response = await getAuthInfo()
                console.log(response)
                setLogin(response.data.login)
                setNotificationFlag(response.data.flag)
            })()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className={classes.profile__body}>
            <Toast ref={toast}></Toast>
            <div className={classes.profile__title}>
                <h1>Профиль</h1>
            </div>
            <div className={classes.siteBody}>
                <div className={classes.profileContainer}>
                    <div className={classes.emailContainer}>
                        <div className={classes.textTitle}>
                            Почта:
                        </div>
                        <div className={classes.email}>
                            {login}
                        </div>
                    </div>
                    <div className={classes.changePassContainer}>
                        <div className={classes.textTitle}>
                            Сменить пароль:
                        </div>
                        <div className={classes.changePassInputContainer}>
                            <div className={classes.oldPassInput}>
                                <span className="p-float-label" style={{"width": "100%"}}>
                                    <Password
                                        id="old-password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.code === 'Enter') {
                                                handleSaveClicked()
                                            }
                                        }}
                                        feedback={false}
                                        toggleMask
                                    />
                                    <label htmlFor="old-password">Старый пароль</label>
                                </span>
                            </div>
                            <div className={classes.newPassButtonContainer}>
                                <div className={classes.newPassInput}>
                                    <span className="p-float-label" style={{"width": "100%"}}>
                                        <Password
                                            id="new-password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.code === 'Enter') {
                                                    handleSaveClicked()
                                                }
                                            }}
                                            feedback={false}
                                            toggleMask
                                        />
                                        <label htmlFor="new-password">Новый пароль</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.saveButton}>
                            <Button label='Сохранить'
                                    onClick={() => handleSaveClicked()}
                                    className={classes.saveButton}
                            />
                        </div>
                    </div>
                    <div className={classes.notificationsContainer}>
                        <div className={classes.textTitle}>
                            Получать уведомления на почту
                        </div>
                        <img src={notificationFlag ? selected : notSelected} alt="error" style={{"width": "30px"}}
                             className={classes.notificationsImage} onClick={handleNotification}
                        />
                    </div>
                    <div className={classes.exitButtonContainer}>
                        <Button label='Выйти'
                                onClick={() => {
                                    storage.set('isAuth', false)
                                    authContext.setIsAuth(false)
                                    navigate("/account")
                                }}
                                className={classes.exitButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;