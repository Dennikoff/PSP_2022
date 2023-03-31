import React from 'react';
import {RotatingLines} from "react-loader-spinner";

const LoadingStatisticSmall = () => {
    return (
        <RotatingLines
            strokeColor="gray"
            strokeWidth="5"
            animationDuration="0.75"
            width={30}
            visible={true}
        />
    );
};

export default LoadingStatisticSmall;