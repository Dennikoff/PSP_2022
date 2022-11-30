import React, {useState} from 'react';
import classes from './mySelector.module.css'
import triangle from '../../img/triangle.svg'
import MyModal from "../myModal/myModal";

const MySelector = ({text, content}) => {
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