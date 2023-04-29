import React from 'react';
import {MagnifyingGlass, RotatingLines} from "react-loader-spinner";


const LoadingSearch = () => {
    return (
        <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
        // <MagnifyingGlass
        //     visible={true}
        //     height="80"
        //     width="80"
        //     ariaLabel="MagnifyingGlass-loading"
        //     wrapperStyle={{}}
        //     wrapperClass="MagnifyingGlass-wrapper"
        //     glassColor = '#c0efff'
        //     color = '#e15b64'
        // />
    );
};

export default LoadingSearch;