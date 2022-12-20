import React, {useContext} from 'react';
import classes from './profilePage.module.css'
import {AuthContext} from "../../context/authContext";
import MyButton from "../../components/myButton/myButton";


const ProfilePage = () => {
    const authContext = useContext(AuthContext)
    return (
        <div className={classes.profile__body}>
            <div className={classes.profile__title}>
                <h1>Профиль</h1>
            </div>
            <div className={classes.profile__body}>
                <div className={classes.buttonContainer}>
                    <MyButton children={"Выйти"}
                              onClick={() => {
                                  console.log(authContext.isAuth)
                                  authContext.setIsAuth(false)
                              }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;