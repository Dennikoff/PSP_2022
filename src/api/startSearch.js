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
    const tokens = storage.get('tokens')
    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
    return await axios.post("http://localhost:8080/api/search", {
        sites: querySitesMas
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
        async (error) => {
            if (error.response.status === 401) {
                return await refreshToken(async () =>  await startSearch(query, limit, offset, querySitesMas))
            } else {
                throw error
            }
        })

}