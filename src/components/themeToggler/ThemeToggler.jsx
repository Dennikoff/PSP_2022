import React, {useContext, useEffect, useState} from 'react';
import classes from './ThemeToggler.module.css'
import sun from '../../img/sun.svg'
import moon from '../../img/moon.svg'
import {InputSwitch} from 'primereact/inputswitch';
import {ThemeContext, themes} from "../../context/themContext";
import {theme} from "antd";

const ThemeToggle = () => {

    const [toggleValue, setToggleValue] = useState()
    const context = useContext(ThemeContext)
    useEffect(() => {
        setToggleValue(context.theme === themes.dark)
    }, [context])

    return (
        <div className={classes.toggleContainer}>
            <div className={classes.toggleContent} onClick={ () => {
                if (context.theme === themes.light) {
                    context.changeTheme(themes.dark)
                }
                if (context.theme === themes.dark) {
                    context.changeTheme(themes.light)
                }}}>
                {
                    context.theme === themes.dark
                        ?
                        <img src={sun} alt=""/>
                        :
                        <img src={moon} alt=""/>
                }
                {/*<img src={sun} alt=""/>*/}
                {/*<InputSwitch*/}
                {/*    checked={toggleValue}*/}
                {/*    onChange={(e) => {*/}
                {/*        setToggleValue(e.value)*/}
                {/*        if (context.theme === themes.light) {*/}
                {/*            context.changeTheme(themes.dark)*/}
                {/*        }*/}
                {/*        if (context.theme === themes.dark) {*/}
                {/*            context.changeTheme(themes.light)*/}
                {/*        }*/}
                {/*    }}/>*/}
                {/*<img src={moon} alt=""/>*/}
            </div>
        </div>
    );
};

export default ThemeToggle;