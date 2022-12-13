import React, {useEffect} from 'react';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
import classes from './inputContainer.module.css'
import xmark from '../../img/xmark.svg'
import vmark from '../../img/vmark.svg'
import {Tooltip} from "antd";
import {focus} from "@testing-library/user-event/dist/focus";


const InputContainer = ({generateName, checkLink, link, setLink, name, setName, btnAdd, flag}) => {


    return (
        <div className={classes.inputContainer}>
            <div className={classes.input_title}>
                Добавить ссылку
            </div>
            <div className={classes.input}>
                <div className={classes.linkInput}>
                    <MyInput placeholder="Ссылка*"
                             value={link}
                             style={{"width": "60vw"}}
                             onChange={(e) => {
                                 setLink(e.target.value)
                             }}
                             onKeyDown={async (e) => {
                                 if(e.key === 'Enter') {
                                     if (checkLink(link)) {
                                         await setName(generateName(link))
                                         const inputs = document.getElementById("nameInput")
                                         focus(inputs)
                                     } else {
                                         console.log("incorrect link")
                                     }
                                 }
                             }}
                    />
                    {
                        flag === -1
                            ?
                            <Tooltip title="Некорректная ссылка">
                                <img src={xmark}
                                     alt="error"
                                     style={{
                                         "marginLeft": "1vw",
                                         "height": "3vh"
                                     }}
                                />
                            </Tooltip>
                            : flag === 1
                                ?
                                <Tooltip title="Корректная ссылка">
                                    <img src={vmark}
                                         alt="error"
                                         style={{
                                             "marginLeft": "1vw",
                                             "height": "3vh"
                                         }}
                                    />
                                </Tooltip>
                                :
                                <div>

                                </div>
                    }
                </div>
                <MyInput placeholder="Имя"
                         id={"nameInput"}
                         value={name}
                         style={{"width": "60vw"}}
                         onChange={(e) => {
                             setName(e.target.value)
                         }}
                         onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                                 btnAdd(link)
                             }
                         }}
                         onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={classes.input_button}>
                <MyButton children="Добавить"
                          onClick={() => {
                              btnAdd(link)
                          }}
                />
            </div>
        </div>
    );
};

export default InputContainer;