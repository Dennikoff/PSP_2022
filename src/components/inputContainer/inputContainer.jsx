import React, {useEffect} from 'react';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
import classes from './inputContainer.module.css'
import xmark from '../../img/xmark.svg'
import vmark from '../../img/vmark.svg'


const InputContainer = ({link, setLink, name, setName, btnAdd, flag}) => {


    return (
        <div className={classes.inputContainer}>
            <div className={classes.input_title}>
                Добавить\Обновить ссылку
            </div>
            <div className={classes.input}>
                <div className={classes.linkInput}>
                    <MyInput placeholder="Ссылка*"
                             value={link}
                             style={{"width": "40vw"}}
                             onChange={(e) => {
                                 setLink(e.target.value)
                             }}
                    />
                    {
                        flag === -1
                            ?
                            <img src={xmark}
                                 alt="error"
                                 style={{
                                     "marginLeft": "1vw",
                                     "height": "3vh"
                                 }}
                            />
                            : flag === 1
                                ?
                                <img src={vmark}
                                     alt="error"
                                     style={{
                                         "marginLeft": "1vw",
                                         "height": "3vh"
                                     }}
                                />
                                :
                                <div>

                                </div>
                    }
                </div>
                <MyInput placeholder="Имя"
                         value={name}
                         style={{"width": "40vw"}}
                         onChange={(e) => {
                             setName(e.target.value)
                         }}
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