import React from 'react';
import Navbar from "../../components/navbar/navbar";
import PrivateRouter from "../../components/router/privateRouter";

const PrivatePage = () => {
    return (
        <div style={{"display": "flex", "width": "100%"}}>
            <Navbar/>
            <PrivateRouter/>
        </div>
    );
};

export default PrivatePage;