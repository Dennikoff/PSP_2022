import React from 'react';
import classes from './myButton.module.css'

const MyButton = (props) => {
    return (
        <button {...props} className={classes.button}/>
    );
};

export default MyButton;