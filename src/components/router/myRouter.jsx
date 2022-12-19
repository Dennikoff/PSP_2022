import React, {useContext} from 'react';
import {useRoutes} from "react-router-dom";
import classes from './router.module.css'
import {AuthContext} from "../../context/authContext";
import {privateRoutes, publicRoutes} from "../../rotes/rotes";

const MyRouter = () => {
    const authContext = useContext(AuthContext)
    const pubRoutes = useRoutes(publicRoutes)
    const priRoutes = useRoutes(privateRoutes)
    return (
        <div className={classes.routes}>
            {
                !authContext.isAuth
                    ?
                    priRoutes
                    :
                    pubRoutes
            }
        </div>
    )
};

export default MyRouter;