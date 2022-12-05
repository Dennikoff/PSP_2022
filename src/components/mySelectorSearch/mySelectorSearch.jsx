import React, {useState} from 'react';
import classes from './mySelectorSearch.module.css'
import triangle from '../../img/triangle.svg'
import MyModalSearch from "../myModalSearch/myModalSearch";

const MySelectorSearch = ({text, content, setContent}) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div className={classes.mySelector}>
            {text}
            <img src={triangle}
                 alt="error"
                 onClick={() => {setModalVisible(true)}}
                 style={{"width": "2vw"}}
            />
            <MyModalSearch visible={modalVisible}
                               setVisible={setModalVisible}
                               content={content}
                               setContent={setContent}
            />
        </div>
    );
};

export default MySelectorSearch;