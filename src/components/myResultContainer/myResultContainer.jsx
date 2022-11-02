import React from 'react';
import classes from "./myResultContainer.module.css";
const MyResultContainer = ({sites}) => {
    return (
        <div className={classes.result_container}>
            <h3 className={classes.result_title}>
                Результаты:
            </h3>
            <div className={classes.result_sites_container}>
                
            </div>
        </div>
    );
};

export default MyResultContainer;