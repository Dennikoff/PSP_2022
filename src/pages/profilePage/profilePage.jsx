import React, {useContext} from 'react';
import classes from './profilePage.module.css'
import {AuthContext} from "../../context/authContext";
import MyButton from "../../components/myButton/myButton";
import {storage} from "../../storage/storage";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../utils/logoutUser";
import MyInput from "../../components/myInput/myInput";
import Selected from "../../img/siteSelectedBlack.svg";


const ProfilePage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
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
                                <MyInput placeholder="Старый пароль"
                                         style={{"background": "var(--color-background)"}}
                                />
                            </div>
                            <div className={classes.newPassButtonContainer}>
                                <div className={classes.newPassInput}>
                                    <MyInput placeholder="Новый пароль"
                                             style={{"background": "var(--color-background)"}}
                                    />
                                </div>
                                <div className={classes.saveButton}>
                                    <MyButton children="сохранить"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.notificationsContainer}>
                        <div className={classes.textTitle}>
                            Получать уведомления на почту
                        </div>
                        <img src={Selected} alt="error"
                             className={classes.notificationsImage}
                        />
                    </div>
                    <div className={classes.exitButtonContainer}>
                        <div className={classes.exitButton}>
                        <MyButton children={"Выйти"}
                                  onClick={() => {
                                      storage.set('isAuth', false)
                                      authContext.setIsAuth(false)
                                      navigate("/account")
                                  }}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;