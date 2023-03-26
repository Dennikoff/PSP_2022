import React, {useContext, useState} from 'react';
import classes from './profilePage.module.css'
import {AuthContext} from "../../context/authContext";
import MyButton from "../../components/myButton/myButton";
import {storage} from "../../storage/storage";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../utils/logoutUser";
import MyInput from "../../components/myInput/myInput";
import Selected from "../../img/siteSelectedBlack.svg";
import {Password} from 'primereact/password';
import {Button} from "primereact/button";


const ProfilePage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    function handleSaveClicked() {
        if (oldPassword !== newPassword) {

        }
    }

    return (
        <div className={classes.profile__body}>
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
                            vadim.murov@mail.ru
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
                                <div className={classes.saveButton}>
                                    <Button label='Сохранить'
                                            onClick={() => handleSaveClicked()}
                                            className={classes.saveButton}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.notificationsContainer}>
                        <div className={classes.textTitle}>
                            Получать уведомления на почту
                        </div>
                        <img src={Selected} alt="error" style={{"width": "30px"}}
                             className={classes.notificationsImage}
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