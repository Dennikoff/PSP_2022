import React, {useState} from 'react';
import classes from './mySelector.module.css'
import triangle from '../../img/triangle.png'
import MyModal from "../myModal/myModal";

const MySelector = ({text}) => {
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
            />
        </div>
    );
};

export default MySelector;