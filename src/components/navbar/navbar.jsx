import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import classes from './navbar.module.css'
import Toggle from 'react-toggle'
import {ThemeContext} from "../../context/ThemContext";
const Navbar = () => {
    const context = useContext(ThemeContext)
    return (
        <div className={classes.navbar}>
            <div className={classes.linkContainer}>
                <Link className={classes.navLink} to={'/'}>Главная</Link>
                <Link className={classes.navLink} to={'/management'}>Управление</Link>
                <Link className={classes.navLink} to={'/search'}>Поиск</Link>
                <Link className={classes.navLink} to={'/profile'}>Профиль</Link>
            </div>
            <div className={classes.themToggle}
                 onClick={() => {
                    context.toggleTheme()
                 }
                 }
            >
                Сменить тему
            </div>
        </div>
    );
};

export default Navbar;