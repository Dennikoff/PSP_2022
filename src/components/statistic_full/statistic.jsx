import React from 'react';
import './statistic.module.css'
import classes from './statistic.module.css'

const Statistic = ({value, title}) => {
    return (
        <div className={classes.main__statistic}>
            <p>
                {value}
            </p>
            <p>
                {title}
            </p>
        </div>
    );
};

export default Statistic;