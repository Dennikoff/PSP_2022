// const axios = require('axios').default;

/*
    /api/startIndexing
    /api/startSiteIndexing
    /api/stopIndexing
    /api/statistics
    /api/search
 */

import axios from "axios";

export async function startSearch(query) {
    console.log(`now it only prints query: ${query}`)
    axios.get("http://localhost:8080/api/search", {
        params: {
            query
        }
    })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}