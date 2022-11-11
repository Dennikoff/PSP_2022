import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages/main_page/main_page";
import ManagementPage from "../../pages/management_page/management_page";
import SearchPage from "../../pages/search_page/search_page";
import ProfilePage from "../../pages/profile_page/profile_page";

const MyRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}
            />
            <Route path="/management" element={<ManagementPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    );
};

export default MyRouter;