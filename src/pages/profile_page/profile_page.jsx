import React from 'react';
import classes from './profile_page.module.css'
import MyInput from "../../components/myInput/myInput";
import MyButton from "../../components/myButton/myButton";
import Selected from '../../img/siteSelectedBlack.svg'

const ProfilePage = () => {
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;