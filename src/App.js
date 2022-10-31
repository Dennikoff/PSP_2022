import './styles/App.css';
import {BrowserRouter, Link} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Statistic from "./components/statistic_full/statistic";
import StatisticContainer from "./components/statistic_full_container/statisticContainer";
import Site_statistic from "./components/site_statistic/site_statistic";
import SiteStatistic from "./components/site_statistic/site_statistic";

function App() {

    const siteStatistics = [
        {   siteName: 'Сайт дельфинов',
            siteURI: 'https://site.ru',
            indexed: false,
            lastChanged: new Date(2015, 1, 20),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error"
        },
        {   siteName: 'Сайт собак',
            siteURI: 'https://site2.ru',
            indexed: true,
            lastChanged: new Date(2017, 1, 12),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error"
        },
        {   siteName: 'Сайт людей',
            siteURI: 'https://site3.ru',
            indexed: true,
            lastChanged: new Date(2012, 1, 10),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error"
        }
    ]

    return (
        <BrowserRouter>
            <Navbar/>
            <div className='body'>
                <div className='main__header'>
                    <h1>Главная</h1>
                </div>
                <StatisticContainer/>
                <div className='statistic_site_list'>

                    <SiteStatistic statistic={siteStatistics[0]}/>
                    {/*{siteStatistics.map((stat) =>*/}
                    {/*    <SiteStatistic*/}
                    {/*        statistic={stat}*/}
                    {/*        key={stat.siteName}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
