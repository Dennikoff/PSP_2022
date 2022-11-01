import React, {useState} from 'react';
import StatisticContainer from "../components/statistic_full_container/statisticContainer";
import SiteStatistic from "../components/site_statistic/site_statistic";
import SiteStatisticList from "../components/site_statistic_list/site_statistic_list";
import './style/main_page.css'

const MainPage = ({siteStatistics}) => {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className='main__body'>
            <div className='main__header'>
                <h1>Главная</h1>
            </div>
            <StatisticContainer/>
            <SiteStatisticList
                siteStatistics={siteStatistics}
                isOpened={isOpened}
                setIsOpened={setIsOpened}
            />
        </div>
    );
};

export default MainPage;