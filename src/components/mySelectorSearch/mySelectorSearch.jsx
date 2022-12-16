import React, {useState} from 'react';
import classes from './mySelectorSearch.module.css'
import triangle from '../../img/triangle.svg'
import MyModalSearch from "../myModalSearch/myModalSearch";

const MySelectorSearch = ({text, content, setContent}) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div className={classes.mySelector}
             onClick={() => {
                 setModalVisible(true)
             }}>
            <div className={classes.headerContainer}>
                <div className={classes.text}>
                    {text}
                </div>
                <div className={classes.triangle}>
                    <img src={triangle}
                         alt="error"
                         style={{"width": "2vw"}}
                    />
                </div>
            </div>
            <MyModalSearch visible={modalVisible}
                           setVisible={setModalVisible}
                           content={content}
                           setContent={setContent}
            />
        </div>
    );
};

export default MySelectorSearch;