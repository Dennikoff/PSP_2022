import React from 'react';
import classes from './siteListManagement.module.css'
import {useFetching} from "../../hooks/useFetching";
import {deleteLink} from "../../api/deleteLink";
import {updateLinks} from "../../api/updateLinks";
import selected from "../../img/siteSelected.svg";
import notSelected from "../../img/siteNotSelected.svg";
import trashBin from "../../img/trashBin.svg";

const SiteListManagement = ({text, content, setContent}) => {
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
        <div className={classes.mySelector}>
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
                                     (async () => await buttonApplyTapped())()
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
            {/*{text}*/}
            {/*<img src={triangle}*/}
            {/*     alt="error"*/}
            {/*     onClick={() => {setModalVisible(true)}}*/}
            {/*     style={{"width": "2vw"}}*/}
            {/*/>*/}
            {/*<MyModalManagement visible={modalVisible}*/}
            {/*                   setVisible={setModalVisible}*/}
            {/*                   content={content}*/}
            {/*                   setContent={setContent}*/}
            {/*/>*/}
        </div>
    );
};

export default SiteListManagement;