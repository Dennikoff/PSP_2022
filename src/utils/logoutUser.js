import {storage} from "../storage/storage";
import {redirect} from "react-router-dom";
import {useContext} from "react";

export const logoutUser = () => {
    storage.set('isAuth', false)
}