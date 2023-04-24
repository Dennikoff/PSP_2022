import React, {useEffect, useRef, useState} from 'react';
import classes from './managementPage.module.css'
import {startIndexing} from "../../api/startIndexing";
import {useFetching} from "../../hooks/useFetching";
import {useStopFetching} from "../../hooks/useStopFetching";
import {stopIndexing} from "../../api/stopIndexing";
import InputContainer from "../../components/inputContainer/inputContainer";
import SiteListManagement from "../../components/siteListManagement/siteListManagement";
import {useStartIndexing} from "../../hooks/useStartIndexing";
import {addLink} from "../../api/addLink";
import {getLinks} from "../../api/getLinks";
import {takeStatistic} from "../../api/takeStatistic";
import {Button} from 'primereact/button';
import { Toast } from 'primereact/toast'
import {updateLink} from "../../api/updateLink";


const ManagementPage = () => {
    const [flag, setFlag] = useState(0)
    const [sites, setSites] = useState([])
    const [link, setLink] = useState('')
    const [name, setName] = useState('')
    const toast = useRef(null)

    const [getLnk, _, isError] = useFetching(async (flag) => {
        let response = await getLinks()
        let links = response["data"]["links"]
        let tempSites = []
        for (let li of links) {
            let newLink = {
                name: li['name'],
                url: li['url'],
                isSelected: Boolean(li['isSelected'])
            }
            tempSites.push(newLink)
        }
        tempSites.sort(compareFunction)
        setSites(tempSites)
    })

    async function btnStartIndexing() {
        const selectedSites = {}
        for (let site of sites) {
            if (site.isSelected) {
                selectedSites[site.url] = site.name
                await updateLink(site.url, 0)
            }
        }

        if (Object.keys(selectedSites).length !== 0) {
            await getLnk(false)
            await startIndex(selectedSites)

        } else {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: 'Не выбрана ни одна ссылка', life: 2000})
        }

    }

    async function btnStopIndexing() {
        await stopIndex()
    }

    const [startIndex, isIndexing, setIsIndexing, isErrorStart] = useStartIndexing(async (data) => {
        await startIndexing(data)
    })

    const [stopIndex, isStopIndexing, isErrorStop] = useStopFetching(setIsIndexing, async () => {
        await stopIndexing()
    })

    const generateName = (link) => {
        let newName = link
        if (newName.indexOf('//') !== -1) {
            newName = newName.slice(newName.indexOf('/') + 2, newName.lastIndexOf('.'))
        } else {
            newName = newName.slice(0, newName.lastIndexOf('.'))
        }
        return newName.slice(0, 25)
    }

    const checkLink = (link) => {
        let Reg = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;
        if (Reg.test(link)) {
            if (link.includes("..")) {
                return false
            }
            let string = link.replace(Reg, '')
            return string === ""
        } else {
            return false
        }
    }


    const btnAdd = async () => {
        let temp_link = link.trim()
        if (!checkLink(temp_link)) {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: 'Неверный формат ссылки', life: 2000})
            return
        }
        let newName = name
        if (name === '') {
            newName = generateName(temp_link)
            setName(newName)
        }
        const site = {
            url: temp_link,
            name: newName,
            isSelected: false
        }
        try {
            await addLink(temp_link, newName, 1)
        } catch (error) {
            toast.current.show({severity: 'error', summary: 'Ошибка', detail: error["response"]["data"]["error"], life: 2000})
            return
        }
        setSites([...sites, site])
    }


    useEffect(() => {
        let temp_link = link.trim()
        if (temp_link === '') {
            setName('')
            setFlag(0)
        } else {
            if (checkLink(temp_link)) {
                setFlag(1)
            } else {
                setFlag(-1)
            }
        }
    }, [link])


    let compareFunction = (a, b) => {
        if (a.name > b.name) {
            return 1
        } else {
            return -1
        }
    }


    const [fetch, isLoading] = useFetching(async (setIsIndexing) => {
        const response = await takeStatistic()
        if (response["data"]["statistics"]["total"]["indexing"]) {
            setIsIndexing(true)
        }
    })


    useEffect(() => {
        (async () => {
            await fetch(setIsIndexing)
            await getLnk(false)
        })()

        let interval = setInterval( async () => {
            await getLnk(false)
            await fetch(setIsIndexing)
        }, 10000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    return (
        <div className={classes.management__body}>
            <Toast ref={toast} />
            <div className={classes.management__title}>
                <h1>Управление индексацией</h1>
            </div>

            <div className={classes.siteBody}>
                <div className={classes.buttonContainer}>
                    {isIndexing
                        ?
                        <Button label="Остановить индексацию"
                                onClick={async () => {
                                    await btnStopIndexing()
                                }}
                                loading={isStopIndexing}
                                severity="danger"
                                className={classes.btn}

                        />
                        :
                        <Button label="Начать индексацию"
                                onClick={async () => {
                                    await btnStartIndexing()
                                }}
                                className={classes.btn}
                        />
                    }
                </div>
                <div className={classes.inputContainer}>
                    <InputContainer generateName={generateName}
                                    checkLink={checkLink}
                                    link={link}
                                    setLink={setLink}
                                    name={name}
                                    setName={setName}
                                    btnAdd={btnAdd}
                                    flag={flag}
                    />
                </div>
                {sites.length > 0 &&
                    <SiteListManagement content={sites}
                                        setContent={setSites}
                    />
                }
            </div>
        </div>
    );
};

export default ManagementPage;