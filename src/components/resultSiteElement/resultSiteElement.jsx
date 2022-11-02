import React from 'react';
import classes from './resultSiteElement.module.css'

const ResultSiteElement = ({site}) => {
    return (
        <div className={classes.listElement}>
            <div className={classes.siteText}>
                <div className={classes.siteURL}>
                    {site.site + site.uri}
                </div>
                <div className={classes.siteTitle}>
                    {site.title}
                </div>
                <div className={classes.snippetContainer}>
                    <div className={classes.siteSnippet}>
                        {site.snippet}
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