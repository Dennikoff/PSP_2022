import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import classes from './navbar.module.css'
import Toggle from 'react-toggle'
import {ThemeContext} from "../../context/themContext";
const Navbar = () => {
    const context = useContext(ThemeContext)
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
            if(ind === index) {
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
            <div className={classes.linkContainer}>
                {
                    navigationMenu.map((element, index) => {
                        const navListCLasses = [classes.navLink]
                        if(element.isActive) {
                            navListCLasses.push(classes.active)
                        }
                        return <Link className={navListCLasses.join(' ')} to={element.path} onClick={() => {lnkClicked(index)}}>{element.text}</Link>
                    })
                }
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