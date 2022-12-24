import React, {useContext} from 'react';
import classes from './profilePage.module.css'
import {AuthContext} from "../../context/authContext";
import MyButton from "../../components/myButton/myButton";
import {storage} from "../../storage/storage";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../utils/logoutUser";


const ProfilePage = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();


    return (
        <div className={classes.profile__body}>
            <div className={classes.profile__title}>
                <h1>Профиль</h1>
            </div>
            <div className={classes.profile__body}>
                <div className={classes.buttonContainer}>
                    <MyButton children={"Выйти"}
                              onClick={() => {
                                  storage.set('isAuth', false)
                                  authContext.setIsAuth(false)
                                  navigate("/login")
                              }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;