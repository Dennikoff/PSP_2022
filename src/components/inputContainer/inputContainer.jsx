import React from 'react';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
import classes from './inputContainer.module.css'

const InputContainer = ({link, setLink, name, setName, btnAdd}) => {
    return (
        <div className={classes.inputContainer}>
            <div className={classes.input_title}>
                Добавить\Обновить ссылку
            </div>
            <div className={classes.input}>
                <MyInput placeholder="Ссылка*"
                         value={link}
                         onChange={(e) => {
                             setLink(e.target.value)
                         }}
                />
                <MyInput placeholder="Имя"
                         value={name}
                         onChange={(e) => {
                             setName(e.target.value)
                         }}
                />
            </div>
            <div className={classes.input_button}>
                <MyButton children="Добавить"
                          onClick={() => {btnAdd(link)}}
                />
            </div>
        </div>
    );
};

export default InputContainer;