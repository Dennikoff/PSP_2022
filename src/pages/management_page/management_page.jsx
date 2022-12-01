import React, {useEffect, useState} from 'react';
import classes from './management_page.module.css'
import MyButton from "../../components/myButton/myButton";
import {startIndexing} from "../../api/startIndexing";
import {useFetching} from "../../hooks/useFetching";
import {useStopFetching} from "../../hooks/useStopFetching";
import {stopIndexing} from "../../api/stopIndexing";
import InputContainer from "../../components/inputContainer/inputContainer";
import MySelector from "../../components/mySelector/mySelector";
import {useStartIndexing} from "../../hooks/useStartIndexing";
import {addLink} from "../../api/addLink";
import {getLinks} from "../../api/getLinks";


const ManagementPage = () => {

    const [flag, setFlag] = useState(0)

    const [sites, setSites] = useState([])

    const [link, setLink] = useState('')
    const [name, setName] = useState('')
    async function btnStartIndexing() {
        const selectedSites = {}
        for(let site of sites) {
            if(site.isSelected) {
                selectedSites[site.link] = site.name
            }
        }
        await startIndex(selectedSites)
    }

    async function btnStopIndexing() {
        await stopIndex()
    }

    const [startIndex, isIndexing, setIsIndexing, isErrorStart] = useStartIndexing(async (data) => {
        const response = await startIndexing(data)
        console.log(response)
    })

    const [stopIndex, isErrorStop] = useStopFetching(setIsIndexing,  async () => {
        const response = await stopIndexing()
        console.log(response)
    }, isIndexing)

    const generateName = (link) => {
        console.log("name")
        let newName = link
        alert(newName.indexOf('//'))
        if(newName.indexOf('//') !== -1) {
            newName = newName.slice(newName.indexOf('/') + 2, newName.lastIndexOf('.'))
        } else {
            newName = newName.slice(0, newName.lastIndexOf('.'))
        }
        return newName
    }

    const checkLink = (link) => {
        let RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
        let string = link.replace(RegExp, '')
        return string === ""
    }



    const btnAdd = () => {
        const flag = checkLink(link)
        if(!flag) {
            alert('Неверная формат ссылки')
            return
        }
        let newName = name
        if(name === '') {
            newName = generateName(link)
            setName(newName)
        }
        const site = {
            link,
            name: newName,
            isSelected: true
        }
        let response
        try {
            response = addLink(link, newName)
        } catch(error) {
            console.log(error)
        }
        console.log(response)
        setSites([...sites, site])
    }

    useEffect(() => {
        if(link === '') {
            setName('')
            setFlag(0)
        } else {
            if(checkLink(link)) {
                setFlag(1)
            } else {
                setFlag(-1)
            }
        }
    }, [link])


    useEffect(() => {
        let response
        try {
            response = getLinks()
        } catch(error) {
            console.log("Error in use effect", error)
        }
        console.log(response)
    }, [])



    return (
        <div className={classes.management__body}>
            <div className={classes.management__title}>
                <h1>Управление</h1>
            </div>

            <div className={classes.site_body}>
                <div className={classes.button_container}>
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
                <InputContainer link={link}
                                setLink={setLink}
                                name={name}
                                setName={setName}
                                btnAdd={btnAdd}
                                flag={flag}
                />
                <MySelector text="Добавленные сайты" content={sites}/>
            </div>
        </div>
    );
};

export default ManagementPage;