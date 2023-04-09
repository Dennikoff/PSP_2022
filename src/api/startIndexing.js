import axios from "axios";
import {storage} from "../storage/storage";
import {getNewToken} from "./auth/getNewToken";
import {refreshToken} from "../utils/refreshToken";


export async function startIndexing(data) {
    console.log(data)
    let json = JSON.stringify(data)
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/startIndexing", {
        data: json
    }, {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        }
    }).catch(
        async (error) => {
            if (error.response.status === 401) {
                await refreshToken(() => startIndexing(data))
            } else {
                throw error
            }
        })
}