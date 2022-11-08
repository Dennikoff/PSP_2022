// const axios = require('axios').default;

/*
    /api/startIndexing
    /api/startSiteIndexing
    /api/stopIndexing
    /api/statistics
    /api/search
 */

import axios from "axios";

export async function startSearch(query, setSites) {
    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
    return await axios.get("http://localhost:8080/api/search", {
        params: {
            query
        }
    })

}