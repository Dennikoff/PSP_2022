import React from 'react';
import classes from './resultSiteElement.module.css'

function returnSnippetArr(snippet){
    let arr = []
    while(snippet.indexOf('<') !== -1) {
        arr.push(snippet.slice(0, snippet.indexOf('<')))
        snippet = snippet.slice(snippet.indexOf('>')+1, snippet.length)
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
                        {Math.ceil(site.relevance * 100) / 100}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultSiteElement;