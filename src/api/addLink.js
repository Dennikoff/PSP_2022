//POST /api/saveLink?link=…&name=…
/*
    /api/startIndexing
    /api/startSiteIndexing
    /api/stopIndexing
    /api/statistics
    /api/search
 */

import axios from "axios";

export async function addLink(link, name) {
    return await axios.post("http://localhost:8080/api/addLink", {
        params: {
            link,
            name
        }
    })

}


