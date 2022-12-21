import React, {useEffect, useState} from 'react';
import classes from './management_page.module.css'
import MyButton from "../../components/myButton/myButton";
import {startIndexing} from "../../api/startIndexing";
import {useFetching} from "../../hooks/useFetching";
import {useStopFetching} from "../../hooks/useStopFetching";
import {stopIndexing} from "../../api/stopIndexing";
import InputContainer from "../../components/inputContainer/inputContainer";
import SiteListManagement from "../../components/siteListManagement/siteListManagement";
import {useStartIndexing} from "../../hooks/useStartIndexing";
import {addLink} from "../../api/addLink";
import {getLinks} from "../../api/getLinks";
import {useFetchingWithTimeout} from "../../hooks/useFetchingWithTimeout";
import {takeStatistic} from "../../api/takeStatistic";

let Reg = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9.]*)\.{1}[A-Za-zА-Яа-я0-9-]{2,8}$/;

const ManagementPage = () => {

    const [flag, setFlag] = useState(0)
    const [sites, setSites] = useState([])
    const [link, setLink] = useState('')
    const [name, setName] = useState('')

    async function btnStartIndexing() {
        const selectedSites = {}
        for (let site of sites) {
            if (site.isSelected) {
                selectedSites[site.url] = site.name
            }
        }
        if (Object.keys(selectedSites).length !== 0) {
            await startIndex(selectedSites)
        } else {
            alert("Не выбрана ни одна ссылка")
        }
    }

    async function btnStopIndexing() {
        await stopIndex()
    }

    const [startIndex, isIndexing, setIsIndexing, isErrorStart] = useStartIndexing(async (data) => {
        const response = await startIndexing(data)
        console.log(response)
    })

    const [stopIndex, isErrorStop] = useStopFetching(setIsIndexing, async () => {
        const response = await stopIndexing()
        console.log(response)
    }, isIndexing)

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
        let Reg = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9.]*)\.{1}[A-Za-zА-Яа-я0-9-]{2,8}$/;
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
            alert('Неверный формат ссылки')
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
            isSelected: true
        }
        try {
            await addLink(temp_link, newName, 1)
        } catch (error) {
            alert(error["response"]["data"]["error"])
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

    const [fetch, isLoading] = useFetching(async (setIsIndexing) => {
        const response = await takeStatistic()
        if (response["data"]["statistics"]["total"]["indexing"]) {
            setIsIndexing(true)
        }

    })

    useEffect(() => {
        (async () => await getLnk(false))()
        fetch(setIsIndexing)
    }, [])


    return (
        <div className={classes.management__body}>
            <div className={classes.management__title}>
                <h1>Управление</h1>
            </div>

            <div className={classes.siteBody}>
                <div className={classes.buttonContainer}>
                    {isIndexing
                        ?
                        <MyButton children="Остановить индексацию"
                                  onClick={async () => {
                                      await btnStopIndexing()
                                  }}
                                  style={{"backgroundColor": "red"}}
                        />
                        :
                        <MyButton children="Начать индексацию"
                                  onClick={async () => {
                                      await btnStartIndexing()
                                  }}
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