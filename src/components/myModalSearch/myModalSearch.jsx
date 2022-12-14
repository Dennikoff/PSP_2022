import React, {useEffect, useState} from 'react';
import classes from './myModalSearch.module.css'
import notSelected from '../../img/siteNotSelected.svg'
import selected from '../../img/siteSelected.svg'
import triangle from '../../img/triangle.svg'
import {useFetching} from "../../hooks/useFetching";
import {updateLinks} from "../../api/updateLinks";


const MyModalSearch = ({visible, setVisible, content, setContent}) => {

    const [allSitesSelected, setAllSitesSelected] = useState(false)

    let rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    useEffect(() => {
        let flag = true
        for (let cont of content) {
            if (!cont.isSelected) {
                flag = false
                break
            }
        }
        setAllSitesSelected(flag)
    }, [content])

    function handleAllSitesSelected(flag) {
        let tempContentArr = []
        for (let index = 0; index < content.length; index++) {
            let tempContent = content[index]
            tempContent.isSelected = flag
            tempContentArr.push(tempContent)
        }
        setContent(tempContentArr)
    }

    return (
        <div className={rootClasses.join(' ')}
             onClick={(e) => {
                 e.stopPropagation()
             }}>
            <div className={classes.modalHeader}>
                <div className={classes.siteAndSeparator}>
                    <div className={classes.headerContainer}>
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
                                 // let tempCont = content[index]
                                 // tempCont.isSelected = !tempCont.isSelected
                                 // setContent([...content.slice(0, index), tempCont, ...content.slice(index + 1)])
                                 // buttonApplyTapped()
                             }}
                        />
                        <div className={classes.headerTextImgContainer}>
                            <div className={classes.headerText}>
                                Все сайты
                            </div>
                            <img src={triangle} alt="error"
                                 className={classes.triangle}
                                 onClick={() => setVisible(false)}
                            />
                        </div>
                    </div>
                    <div className={classes.separatorContainer}>
                        <div className={classes.separator}>

                        </div>
                    </div>

                </div>
            </div>
            <div className={classes.modalContent}

            >
                <ul className={classes.modalList}>
                    {content.map((cont, index) =>
                        <li className={classes.siteAndSeparator}
                            key={cont.url}
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
                                     }}
                                />
                                <div className={classes.nameButtonContainer}>
                                    <div className={classes.sitePair}>
                                        <div className={classes.siteName}>
                                            {cont.name}
                                        </div>
                                        <div className={classes.siteLink}>
                                            {cont.url}
                                        </div>
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
                {/*<div className={classes.applyButton}>*/}
                {/*    <MyButton children="Подтвердить"*/}
                {/*              style={{"textAlign": "center"}}*/}
                {/*              onClick={() => {buttonApplyTapped()}}/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default MyModalSearch;