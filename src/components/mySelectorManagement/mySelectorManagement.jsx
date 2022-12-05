import React, {useState} from 'react';
import classes from './mySelectorManagement.module.css'
import triangle from '../../img/triangle.svg'
import MyModalManagement from "../myModalManagement/myModalManagement";

const MySelectorManagement = ({text, content, setContent}) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div className={classes.mySelector}>
            {text}
            <img src={triangle}
                 alt="error"
                 onClick={() => {setModalVisible(true)}}
                 style={{"width": "2vw"}}
            />
            <MyModalManagement visible={modalVisible}
                               setVisible={setModalVisible}
                               content={content}
                               setContent={setContent}
            />
        </div>
    );
};

export default MySelectorManagement;