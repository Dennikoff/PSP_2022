import {storage} from "../storage/storage";
import {redirect, useNavigate} from "react-router-dom";
import {useContext} from "react";


export const logoutUser = () => {
    storage.set('isAuth', false)
    window.location.assign('/')
}