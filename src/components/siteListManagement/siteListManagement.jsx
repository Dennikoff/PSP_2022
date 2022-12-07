import React, {useEffect, useState} from 'react';
import classes from './siteListManagement.module.css'
import {useFetching} from "../../hooks/useFetching";
import {deleteLink} from "../../api/deleteLink";
import {updateLinks} from "../../api/updateLinks";
import selected from "../../img/siteSelected.svg";
import notSelected from "../../img/siteNotSelected.svg";
import trashBin from "../../img/trashBin.svg";

const SiteListManagement = ({content, setContent}) => {
    const [allSitesSelected, setAllSitesSelected] = useState(false)
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

    function handleAllSitesSelected(flag) {
        if(flag) {
            let tempContentArr = []
            for(let index = 0; index < content.length; index++) {
                let tempContent = content[index]
                tempContent.isSelected = true
                tempContentArr.push(tempContent)
            }
            setContent(tempContentArr)
        } else {
            let tempContentArr = []
            for(let index = 0; index < content.length; index++) {
                let tempContent = content[index]
                tempContent.isSelected = false
                tempContentArr.push(tempContent)
            }
            setContent(tempContentArr)
        }
    }

    useEffect(() => {
        let flag = true
        for(let cont of content) {
            if(!cont.isSelected) {
                flag = false
                break
            }
        }
        setAllSitesSelected(flag)
    }, [content])

    return (
        <div className={classes.mySelector}>
            <ul className={classes.modalList}>
                <li className={classes.siteAndSeparator}>
                    <div className={classes.siteContainer}>
                        <img src={
                            allSitesSelected
                                ?
                                selected
                                :
                                notSelected
                        }
                             alt="error"
                             onClick={() => {
                                 handleAllSitesSelected(!allSitesSelected)
                                 setAllSitesSelected(!allSitesSelected)
                             }
                             }
                             className={classes.sitePicker}
                        />
                        <div className={classes.nameButtonContainer}>
                            <div className={classes.sitePair}>
                                <div className={classes.siteName}>
                                    Все сайты
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.separatorContainer}>
                        <div className={classes.separator}></div>
                    </div>

                </li>
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
                                     //buttonApplyTapped()
                                 }
                                 }
                                 className={classes.sitePicker}
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
        </div>
    );
};

export default SiteListManagement;