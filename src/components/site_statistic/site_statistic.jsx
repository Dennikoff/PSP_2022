import React, {useEffect, useState, useRef} from 'react'
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
import {deleteSite} from "../../api/deleteSite";
import {Toast} from "primereact/toast";


const SiteStatistic = ({isOpenedArr, index, statistic, isOpened, setIsOpened, fetchWithoutLoading}) => {
    const statisticClasses = [classes.site_statistic_container]
    const triangleClasses = [classes.header_triangle]
    const [trashBin, setTrashBin] = useState()
    let context = React.useContext(ThemeContext)
    const toast = useRef(null);

    async function deleteButtonClicked() {
        setTimeout(() => fetchWithoutLoading(), 300)
        await deleteSite(statistic.url)
        fetchWithoutLoading()
        toast.current.show({severity:'success', summary: 'Успешно', detail:'Сайт успешно удален', life: 3000});
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
            <Toast ref={toast}></Toast>
            <div className={classes.site_statistic_header}
                 onClick={() => {
                     statistic.isOpened = !statistic.isOpened
                     setIsOpened(!isOpened)
                     isOpenedArr[index] = !isOpenedArr[index]
                 }}
            >
                <div className={classes.nameUrl}>
                    <span className={classes.headerName}>
                        {statistic.name}
                    </span>
                    <span className={classes.headerUrl}>
                        &nbsp;&mdash;&nbsp;{`${statistic.url}`}
                    </span>
                </div>


                <div className={classes.header_indexed}>
                    <div className={classes.header_indexed_icon}>
                        {statistic.status === "INDEXED" ?
                            <img src={imageOk} alt="Error"/>
                            : statistic.status === 'INDEXING'
                                ? <LoadingProcess color='#3261BC'/>
                                : statistic.status === 'DELETING'
                                    ? <LoadingProcess color={'red'}/>
                                    : <img src={imageError} alt="Error"/>}

                    </div>
                    <div className={classes.header_indexed_text}>
                        {statistic.status === "INDEXED" ?
                            <span>Проиндексирован</span>
                            : statistic.status === 'INDEXING'
                                ? <span>Индексация</span>
                                : statistic.status === 'DELETING'
                                    ? <span>Удаление</span>
                                    : <span>Ошибка</span>}
                    </div>
                </div>
                <div className={classes.deleteButton}>
                    <img src={trashBin} alt="error"
                         style={{"width": "30px"}}
                         onClick={(e) => {
                             e.stopPropagation()
                             deleteButtonClicked()
                         }}
                    />
                </div>
                <div className={triangleClasses.join(' ')}>
                    <img src={triangle} alt="error"
                         style={{"width": "30px"}}
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