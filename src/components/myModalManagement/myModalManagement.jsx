import React, {useEffect, useState} from 'react';
import classes from './myModalManagement.module.css'
import notSelected from '../../img/siteNotSelected.svg'
import selected from '../../img/siteSelected.svg'
import trashBin from '../../img/trashBin.svg'
import {useFetching} from "../../hooks/useFetching";
import {deleteLink} from "../../api/deleteLink";
import MyButton from "../myButton/myButton";
import {updateLinks} from "../../api/updateLinks";


const MyModalManagement = ({visible, setVisible, content, setContent}) => {
    let rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active)
    }
    const [reload, setReload] = useState(false)

    const [deleteLnk] = useFetching(async (url) => {
        await deleteLink(url)
    })

    const deleteButtonClicked = async (index) => {
        let url = content[index].link
        setContent(content.filter((_, ind) => {
            return index !== ind
        }))
        await deleteLnk(url)
        // content = content.slice(0, id) + content.slice(id + 1)
        // console.log(content)
    }

    const [updtLinks] = useFetching(async (mas) => {
        await updateLinks(mas)
    })

    const buttonApplyTapped = async () => {
        let newMas = {}
        for(let cont of content){
            newMas[cont.link] = +cont.isSelected
        }
        await updtLinks(newMas)
    }

    return (
            <div className={rootClasses.join(' ')}
                 onClick={() => setVisible(false)}>
                <div className={classes.modalContent}
                     onClick={(e) => {
                         e.stopPropagation()
                     }}
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
                                             let tempCont = content[index]
                                             tempCont.isSelected = !tempCont.isSelected
                                             setContent([...content.slice(0, index), tempCont, ...content.slice(index + 1)])
                                             buttonApplyTapped()
                                         }
                                         }
                                    />
                                    <div className={classes.nameButtonContainer}>
                                        <div className={classes.sitePair}>
                                            <div className={classes.siteName}>
                                                {cont.name}
                                            </div>
                                            <div className={classes.siteLink}>
                                                {cont.link}
                                            </div>
                                        </div>
                                        <div className={classes.deleteButtonContainer}>
                                            <img src={trashBin} alt="error"
                                                 className={classes.deleteButton}
                                                 onClick={() => deleteButtonClicked(index)}
                                            />
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
                    {/*<div className={classes.applyButton}>*/}
                    {/*    <MyButton children="Подтвердить"*/}
                    {/*              style={{"textAlign": "center"}}*/}
                    {/*              onClick={() => {buttonApplyTapped()}}/>*/}
                    {/*</div>*/}
                </div>
            </div>
    );
};

export default MyModalManagement;