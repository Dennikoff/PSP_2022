import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import './active.css'
import classes from './navbar.module.css'
import Toggle from 'react-toggle'
import classNames from "classnames";
import {ThemeContext, themes} from "../../context/themContext";
import Logo from '../../img/searchIcon.svg'

const Navbar = () => {
    const context = useContext(ThemeContext)

    function getActive() {
        const href = window.location.href
        if (href.includes('management')) {
            return 1
        } else if (href.includes('search')) {
            return 2
        } else if (href.includes('profile')) {
            return 3
        }
        return 0
    }

    const location = useLocation();
    const [active, setActive] = useState(getActive())
    useEffect(() => {
        setActive(getActive())
    }, [location])
    const [navigationMenu, setNavigationMenu] = useState([
        {
            path: '/',
            text: "Главная",
            isActive: true
        },
        {
            path: '/management',
            text: "Управление",
            isActive: false
        },
        {
            path: '/search',
            text: "Поиск",
            isActive: false
        },
        {
            path: '/profile',
            text: "Профиль",
            isActive: false
        },
    ])

    function lnkClicked(index) {
        let newMas = []
        navigationMenu.map((value, ind) => {
            if (ind === index) {
                let temp = value
                temp.isActive = true
                newMas.push(temp)
            } else {
                let temp = value
                temp.isActive = false
                newMas.push(temp)
            }
        })
        setNavigationMenu(newMas)
    }

    return (
        <div className={classes.navbar}>
            <div className={classes.logoContainer}>
                <img src={Logo} alt="LOGO"/>
            </div>
            <div className={classes.navbarLinkContainer}>
                <Link to={'/'} className={classes.link}>
                   <span
                       className={classNames(classes.linkText, {'active': active === 0})}
                       onClick={() => setActive(0)}
                   >
                        Главная
                    </span>
                </Link>
                <Link to={'/management'} className={classes.link}>
                    <span
                        className={classNames(classes.linkText, {'active': active === 1})}
                        onClick={() => setActive(1)}
                    >
                        Управление
                    </span>
                </Link>
                <Link to={'/search'} className={classes.link}>
                     <span
                         className={classNames(classes.linkText, {'active': active === 2})}
                         onClick={() => setActive(2)}
                     >
                        Поиск
                    </span>
                </Link>
                <Link to={'/profile'} className={classes.link}>
                    <span
                        className={classNames(classes.linkText, {'active': active === 3})}
                        onClick={() => setActive(3)}
                    >
                        Профиль
                    </span>
                </Link>
            </div>
            <div className={classes.themToggle}
                 onClick={() => {
                     console.log(context.theme)
                     if (context.theme === themes.light) {
                         console.log('mem1')
                         context.changeTheme(themes.dark)
                     }
                     if (context.theme === themes.dark) {
                         console.log('mem2')
                         context.changeTheme(themes.light)
                     }
                 }}
            >
                Сменить тему
            </div>
        </div>
    );
};

export default Navbar;