import React, {useState} from 'react';
import classes from './mySelector.module.css'
import triangle from '../../img/triangle.png'
import MyModal from "../myModal/myModal";

const MySelector = ({text}) => {
    let content = [
        {
            name: "kek.com",
            isSelected: true
        },
        {
            name: "spek.ru",
            isSelected: true
        },
        {
            name: "reallongsiteeeeee.ru",
            isSelected: true
        },
        {
            name: "playback.com",
            isSelected: true
        },
        {
            name: "spek1.ru",
            isSelected: true
        },
        {
            name: "reallongsiteeeeee112.ru",
            isSelected: true
        },
        {
            name: "playback123.com",
            isSelected: true
        }
    ]
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div className={classes.mySelector}>
            {text}
            <img src={triangle}
                 alt="error"
                 onClick={() => {setModalVisible(true)}}
            />
            <MyModal visible={modalVisible}
                     setVisible={setModalVisible}
                     content={content}
            />
        </div>
    );
};

export default MySelector;