import React from 'react';
import {ColorRing} from "react-loader-spinner";
import './loadingProcess.css'

const LoadingProcess = ({color}) => {
    return (
        <ColorRing
            visible={true}
            height="100%"
            width="100%"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper"
            colors={[color,color,color,color,color]}
        />
    );
};

export default LoadingProcess;