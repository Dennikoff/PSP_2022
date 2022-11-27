import React from 'react';
import classes from './myModal.module.css'

const MyModal = ({visible, setVisible}) => {
    let rootClasses = [classes.myModal]
    if (visible) {
       rootClasses.push(classes.active)
    }
    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setVisible(false)}>
            <div className={classes.modalContent}>

            </div>
        </div>
    );
};

export default MyModal;