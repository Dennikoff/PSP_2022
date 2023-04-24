import axios from "axios";
import {storage} from "../storage/storage";
import {getNewToken} from "./auth/getNewToken";
import {refreshToken} from "../utils/refreshToken";


export async function startIndexing(data) {
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/startIndexing", {
        data
    }, {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        }
    }).catch(
        async (error) => {
            if (error.response.status === 401) {
                return await refreshToken(async () => await startIndexing(data))
            } else {
                throw error
            }
        })
}