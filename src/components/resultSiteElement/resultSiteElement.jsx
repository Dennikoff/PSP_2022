import React from 'react';
import classes from './resultSiteElement.module.css'

function returnSnippetArr(snippet){
    let arr = []
    while(snippet.indexOf('<b>') !== -1 || snippet.indexOf('</b>') !== -1) {
        if(arr.length % 2 === 0) {
            arr.push(snippet.slice(0, snippet.indexOf('<b>')))
            snippet = snippet.slice(snippet.indexOf('<b>') + 3)
            console.log('kek1')
        } else {
            arr.push(snippet.slice(0, snippet.indexOf('</b>')))
            snippet = snippet.slice(snippet.indexOf('</b>') + 4)
            console.log('kek2')
        }
        console.log(snippet)
    }
    arr.push(snippet)
    return arr
}

const ResultSiteElement = ({site}) => {
    const snippetArr = returnSnippetArr(site.snippet)
    return (
        <div className={classes.listElement}>
            <div className={classes.siteText}>
                <a className={classes.siteURL}
                   href={site.site + site.uri}
                   target='_blank' rel="noreferrer"
                >{site.site + site.uri}</a>
                <div className={classes.siteTitle}>
                    {site.title}
                </div>
                <div className={classes.snippetContainer}>
                    <div className={classes.siteSnippet}>
                        {snippetArr.map((value, index)=>
                            index % 2 === 1
                                ?
                                <span key={value}><b>{value}</b></span>
                                :
                                <span key={value}>{value}</span>

                        )}
                    </div>
                    <div className={classes.siteRelevance}>
                        {site.relevance !==  1
                            ?
                            Math.ceil(site.relevance * 100) / 100
                            :
                            "1.00"
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultSiteElement;