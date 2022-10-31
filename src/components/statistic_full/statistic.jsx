import React from 'react';
import './statistic.css'

const Statistic = ({value, title}) => {
    return (
        <div className='main__statistic'>
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