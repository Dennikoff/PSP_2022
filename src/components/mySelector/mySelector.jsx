import React from 'react';
import classes from './mySelector.module.css'
import triangle from '../../img/triangle.png'

const MySelector = ({text}) => {
    return (
        <div className={classes.my_selector}>
            {text}
            <img src={triangle} alt="error"/>

        </div>
    );
};

export default MySelector;