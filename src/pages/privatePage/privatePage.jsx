import React from 'react';
import Navbar2 from "../../components/navbar2/navbar";
import PrivateRouter from "../../components/router/privateRouter";

const PrivatePage = () => {
    return (
        <div style={{"display": "flex", "width": "100%"}}>
            <Navbar2/>
            <PrivateRouter/>
        </div>
    );
};

export default PrivatePage;