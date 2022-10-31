import React from 'react';
import classes from './site_statistic.module.css'
import imageOk from '../../img/index_info_ok.png'
import imageProcess from '../../img/index_info_process.png'
import triangle from '../../img/triangle.png'

const SiteStatistic = ({statistic}) => {
    return (
        <div className={classes.site_statistic_container} >
            <div className={classes.site_statistic_header}>
                <span className={classes.header_name_uri}>
                    {`${statistic.siteName} - ${statistic.siteURI}`}
                </span>

                <div className={classes.header_indexed}>
                    <div className={classes.header_indexed_icon}>
                        {statistic.indexed
                            ? <img src={imageOk} alt="Error"/>
                            : <img src={imageProcess} alt="Error"/>
                        }
                    </div>
                    <div className={classes.header_indexed_text}>
                        {statistic.indexed
                            ? <span>Проиндексирован</span>
                            : <span>Индексация</span>
                        }
                    </div>
                </div>
                <div className={classes.header_triangle}>
                    <img src={triangle} alt=""/>
                </div>
            </div>
            <div className={classes.site_statistic_body}>

            </div>
        </div>
);
};

export default SiteStatistic;