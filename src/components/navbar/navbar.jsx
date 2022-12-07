import React from 'react';
import {Link} from "react-router-dom";
import classes from './navbar.module.css'

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.linkContainer}>
                <Link className={classes.navLink} to={'/'}>Главная</Link>
                <Link className={classes.navLink} to={'/management'}>Управление</Link>
                <Link className={classes.navLink} to={'/search'}>Поиск</Link>
                <Link className={classes.navLink} to={'/profile'}>Профиль</Link>
            </div>
        </div>
    );
};

export default Navbar;