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
            name: "spek.ru",
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

    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setVisible(false)}>
            <div className={classes.modalContent}>
                <ul className={classes.modalList}>
                    {content.map((cont, index) =>
                        <div className={classes.siteAndSeparator}>
                            <div className={classes.siteContainer}>
                                <img src={
                                    cont.isSelected
                                        ?
                                        selected
                                        :
                                        notSelected
                                }
                                     alt="error"/>
                                <div className={classes.siteName}>
                                    <div>
                                        {cont.name}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.separatorContainer}>
                                {
                                    // <div className={classes.separator}>
                                    //
                                    // </div>
                                    index !== content.length - 1
                                        ?
                                        <div className={classes.separator}>

                                        </div>
                                        :
                                        <div className={classes.noneSeparator}>

                                        </div>
                                }
                            </div>

                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyModal;