import React from 'react';
import {RotatingLines} from "react-loader-spinner";

const LoadingStatistic = () => {
    return (
        <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    );
};

export default LoadingStatistic;