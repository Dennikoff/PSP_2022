import React, {useEffect} from 'react';
import MyInput from "../myInput/myInput";
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';
import classes from './inputContainer.module.css'
import xmark from '../../img/xmark.svg'
import vmark from '../../img/vmark.svg'
import {Tooltip} from "antd";
import {focus} from "@testing-library/user-event/dist/focus";


const InputContainer = ({generateName, checkLink, link, setLink, name, setName, btnAdd, flag}) => {


    return (
        <div className={classes.kek}>
            <div className={classes.input_title}>
                Добавить ссылку
            </div>
            <div className={classes.input}>
                <div className={classes.linkInputContainer}>
                    <span className="p-float-label" style={{"width": "91%"}}>
                        <InputText
                            id="link-url"
                            value={link} onChange={(e) => setLink(e.target.value)}
                            className={classes.linkInput}
                            onKeyDown={async (event) => {
                                if(event.code === 'Enter') {
                                    if (checkLink(link)) {
                                        await setName(generateName(link))
                                        document.getElementById("link-name").focus()
                                    } else {
                                        console.log("incorrect link")
                                    }
                                }
                            }}
                        />
                        <label htmlFor="link-url">Url</label>
                    </span>
                    {flag === -1 ? <Tooltip title="Некорректная ссылка">
                        <img src={xmark}
                             alt="error"
                             style={{
                                 "marginLeft": "1vw", "height": "3vh"
                             }}
                        />
                    </Tooltip> : flag === 1 ? <Tooltip title="Корректная ссылка">
                        <img src={vmark}
                             alt="error"
                             style={{
                                 "marginLeft": "1vw", "height": "3vh"
                             }}
                        />
                    </Tooltip> : <div>

                    </div>}
                </div>
                <div className={classes.inputAndButton}>
                    <span className="p-float-label" style={{"width": "70%"}}>
                        <InputText
                            id="link-name"
                            value={name} onChange={(e) => setName(e.target.value)}
                            className={classes.linkInput}
                            onKeyDown={(event) => {
                                if(event.code === 'Enter') {
                                    btnAdd(link)
                                }
                            }}
                            onFocus={(e) => e.target.select()}
                        />
                        <label htmlFor="link-name">Название сайта</label>
                    </span>
                    <Button label="Добавить"
                            onClick={() => {
                                btnAdd(link)
                            }}
                            className={classes.input_button}
                    />
                </div>
            </div>

        </div>);
};

export default InputContainer;