import React, {useEffect, useState} from 'react';
import classes from './myModal.module.css'
import notSelected from '../../img/siteNotSelected.png'
import selected from '../../img/siteSelected.png'


const MyModal = ({visible, setVisible, content}) => {
    let rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active)
    }
    const [reload, setReload] = useState(false)


    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setVisible(false)}>
            <div className={classes.modalContent}
                 onClick={(e) => {e.stopPropagation()}}
            >
                <ul className={classes.modalList}>
                    {content.map((cont, index) =>
                        <li className={classes.siteAndSeparator}
                            key={cont.link}
                        >
                            <div className={classes.siteContainer}>
                                <img src={
                                    cont.isSelected
                                        ?
                                        selected
                                        :
                                        notSelected
                                }
                                     alt="error"
                                     onClick={() => {
                                         console.log(content[index].isSelected)
                                         content[index].isSelected = !content[index].isSelected
                                         setReload(!reload)
                                         console.log(content[index].isSelected)
                                     }
                                }
                                />
                                <div className={classes.sitePair}>
                                    <div className={classes.siteName}>
                                        {cont.name}
                                    </div>
                                    <div className={classes.siteLink}>
                                        {cont.link}
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

                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyModal;