import React, {useContext} from 'react';
import {AuthContext} from "../../context/authContext";
import MyButton from "../../components/myButton/myButton";

const LoginPage = () => {
    const authContext = useContext(AuthContext)
    return (
        <div>
             <MyButton children={"Войти"}
                       onClick={() => {authContext.setIsAuth(true)}}
             />
        </div>
    );
};

export default LoginPage;