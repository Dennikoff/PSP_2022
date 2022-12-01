import React from 'react';
import {ColorRing} from "react-loader-spinner";
import './loadingProcess.css'

const LoadingProcess = () => {
    return (
        <ColorRing
            visible={true}
            height="100%"
            width="100%"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper"
            colors={['#3261BC','#3261BC','#3261BC','#3261BC','#3261BC']}
        />
    );
};

export default LoadingProcess;