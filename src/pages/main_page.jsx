import React, {useState} from 'react';
import StatisticContainer from "../components/statistic_full_container/statisticContainer";
import SiteStatisticList from "../components/site_statistic_list/site_statistic_list";
import './style/main_page.css'

const MainPage = ({siteStatistics, fullStatistic}) => {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className='main__body'>
            <div className='main__title'>
                <h1>Главная</h1>
            </div>
            <StatisticContainer
                fullStatistic={fullStatistic}
            />
            <SiteStatisticList
                siteStatistics={siteStatistics}
                isOpened={isOpened}
                setIsOpened={setIsOpened}
            />
        </div>
    );
};

export default MainPage;