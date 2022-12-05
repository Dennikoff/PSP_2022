// const axios = require('axios').default;

/*
    /api/startIndexing
    /api/startSiteIndexing
    /api/stopIndexing
    /api/statistics
    /api/search
 */

import axios from "axios";

export async function startSearch(query, limit, offset, querySitesMas) {
    console.log(JSON.stringify(querySitesMas))
    let json = JSON.stringify(querySitesMas)
    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
    return await axios.post("http://localhost:8080/api/search",{
        sites: json
    },{
         params:{
            query,
            limit,
            offset
        }
    })

}