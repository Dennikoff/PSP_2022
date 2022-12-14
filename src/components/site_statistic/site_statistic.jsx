import React, {useEffect, useState} from 'react'
import classes from './site_statistic.module.css'
import imageOk from '../../img/indexInfoOk.svg'
import imageProcess from '../../img/indexInfoProcess.svg'
import imageError from '../../img/indexInfoError.svg'
import triangle from '../../img/triangle.svg'
import LoadingProcess from "../loadingBars/loadingProcess";
import SiteStatisticBodyNoError from "./siteStatisticBodyNoError/siteStatisticBodyNoError";
import SiteStatisticBodyError from "./siteStatisticBodyError/siteStatisticBodyError";
import trashBinBlack from "../../img/trashBinBlack.svg";
import trashBinWhite from "../../img/trashBinWhite.svg";
import {ThemeContext} from "../../context/themContext";



const SiteStatistic = ({isOpenedArr, index, statistic, isOpened, setIsOpened}) => {
    const statisticClasses = [classes.site_statistic_container]
    const triangleClasses = [classes.header_triangle]
    const [trashBin, setTrashBin] = useState()
    let context = React.useContext(ThemeContext)

    function getDate(date) {
        let str = ''
        if (date.getDate().toString().length < 2) {
            str = str + `0${date.getDate().toString()}.`
        } else {
            str = str + date.getDate().toString() + '.'
        }
        if (date.getMonth().toString().length < 2) {
            str = str + `0${(date.getMonth() + 1).toString()}.`
        } else {
            str = str + (date.getMonth() + 1).toString() + '.'
        }
        str += date.getFullYear().toString()
        return str
    }

    function getTime(date) {
        let str = ''
        if (date.getHours().toString().length < 2) {
            str = str + `0${date.getHours().toString()}:`
        } else {
            str = str + date.getHours().toString() + ':'
        }
        if (date.getMinutes().toString().length < 2) {
            str = str + `0${date.getMinutes().toString()}:`
        } else {
            str = str + date.getMinutes().toString() + ':'
        }
        if (date.getSeconds().toString().length < 2) {
            str = str + `0${date.getSeconds().toString()}`
        } else {
            str = str + date.getSeconds().toString()
        }
        return str
    }

    function deleteButtonClicked() {

    }

    if (statistic.isOpened) {
        statisticClasses.push(classes.active)
        triangleClasses.push(classes.active)
    }

    useEffect(() => {
        setTrashBin(context.theme ? trashBinBlack : trashBinWhite)
    }, [context])

    return (
        <div className={statisticClasses.join(' ')}>
            <div className={classes.site_statistic_header}
                 onClick={() => {
                     statistic.isOpened = !statistic.isOpened
                     setIsOpened(!isOpened)
                     isOpenedArr[index] = !isOpenedArr[index]
                 }}
            >
                <span className={classes.headerName}>
                    {statistic.name}
                </span>
                <span className={classes.headerUrl}>
                    &nbsp;&mdash;&nbsp;{`${statistic.url}`}
                </span>


                <div className={classes.header_indexed}>
                    <div className={classes.header_indexed_icon}>
                        {statistic.status === "INDEXED" ?
                            <img src={imageOk} alt="Error"/>
                            : statistic.status === 'INDEXING'
                                ? <LoadingProcess/>
                                : <img src={imageError} alt="Error"/>}
                    </div>
                    <div className={classes.header_indexed_text}>
                        {statistic.status === "INDEXED" ?
                            <span>??????????????????????????????</span>
                            : statistic.status === 'INDEXING'
                                ? <span>????????????????????</span>
                                : <span>????????????</span>}
                    </div>
                </div>
                <div className={classes.deleteButton}>
                    <img src={trashBin} alt="error"
                         style={{"width": "2vw"}}
                         onClick={(e) => {
                             e.stopPropagation()
                             deleteButtonClicked()
                         }}
                    />
                </div>
                <div className={triangleClasses.join(' ')}>
                    <img src={triangle} alt="error"
                         style={{"width": "2vw"}}
                    />
                </div>
            </div>
            {statistic.error
            ?
                <SiteStatisticBodyError statistic={statistic}/>
            :
                <SiteStatisticBodyNoError statistic={statistic}/>
            }
        </div>

    );
};

export default SiteStatistic;