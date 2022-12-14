import axios from "axios";
import {refreshToken} from "../utils/refreshToken";
import {storage} from "../storage/storage";


export async function stopIndexing() {
    const tokens = storage.get('tokens')
    return await axios.get("http://localhost:8080/api/stopIndexing", {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        }
    }).catch(
        async (e) => {
            if (e.response.status === 401) {
                await refreshToken(stopIndexing)
            } else {
                console.log('error in request')
            }
        })
}