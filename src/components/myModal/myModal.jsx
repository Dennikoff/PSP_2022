import React from 'react';
import classes from './myModal.module.css'
import notSelected from '../../img/siteNotSelected.png'
import selected from '../../img/siteSelected.png'


const MyModal = ({visible, setVisible}) => {
    let rootClasses = [classes.myModal]
    if (visible) {
       rootClasses.push(classes.active)
    }
    let content = [
        {
            name: "kek.com",
            isSelected: false
        },
        {
            name: "spek.ru",
            isSelected: true
        },
        {
            name: "reallongsiteeeeee.ru",
            isSelected: false
        },
        {
            name: "playback.com",
            isSelected: true
        }
    ]

    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setVisible(false)}>
            <div className={classes.modalContent}>
                <ul>
                    {content.map((cont) =>
                        <div className={classes.siteContainer}>
                                <div>
                                    {
                                        <img src={
                                            cont.isSelected
                                                ?
                                                selected
                                                :
                                                notSelected
                                        }
                                             alt="error"/>

                                    }
                                </div>
                                <div>
                                    {cont.name}
                                </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyModal;