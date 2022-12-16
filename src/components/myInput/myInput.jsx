import React from 'react';
import classes from './myInput.module.css'

const MyInput = (props) => {
    return (
        <input {...props}
               spellCheck="false"
               className={classes.my_input}/>
    );
};

export default MyInput;