// const axios = require('axios').default;

/*
    /api/startIndexing
    /api/startSiteIndexing
    /api/stopIndexing
    /api/statistics
    /api/search
 */

import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function startSearch(query, limit, offset, querySitesMas) {
    let json = JSON.stringify(querySitesMas)
    const tokens = storage.get('tokens')
    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
    return await axios.post("http://localhost:8080/api/search", {
        sites: json
    }, {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        },
        params: {
            query,
            limit,
            offset
        }
    }).catch(
        async (e) => {
            if (e.response.status === 401) {
                await refreshToken(() => startSearch(query, limit, offset, querySitesMas))
            } else {
                console.log('error in request')
            }
        })

}