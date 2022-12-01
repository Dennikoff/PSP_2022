import React from 'react';
import {Oval} from "react-loader-spinner";
import './loadingProcess.css'

const LoadingProcess = () => {
    return (
        <Oval
            height={40}
            width={40}
            color="#4fa94d"
            wrapperClass="wrapper"
            visible={true}
            strokeWidth={3}
            strokeWidthSecondary={3}

        />
    );
};

export default LoadingProcess;