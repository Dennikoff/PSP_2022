import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function deleteSite(url) {
    const tokens = storage.get('tokens')
    return await axios.delete("http://localhost:8080/api/deleteSite", {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        },
        params: {
            url
        }
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                await refreshToken(() => deleteSite(url))
            } else {
                throw error
            }
        })
}

export async function deleteAllSites() {
    const tokens = storage.get('tokens')
    return await axios.delete("http://localhost:8080/api/deleteAllSites", {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        }
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                await refreshToken(() => deleteAllSites())
            } else {
                throw error
            }
        })
}



