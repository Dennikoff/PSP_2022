import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages/main_page";
import ManagementPage from "../../pages/management_page";
// import Search_page from "../../pages/search_page";
import SearchPage from "../../pages/search_page";
import ProfilePage from "../../pages/profile_page";
//import classes from './router.module.css'

const MyRouter = ({statistic, fullStatistic}) => {
    return (
        <Routes>
            <Route path="/" element={<MainPage
                siteStatistics={statistic}
                fullStatistic={fullStatistic}
            />}
            />
            <Route path="/management" element={<ManagementPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    );
};

export default MyRouter;