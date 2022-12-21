import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function updateLink(url, isSelected) {
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/updateLink",null, {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        },
        params: {
            url,
            isSelected
        }
    }).catch(
        async (error) => {
            if(error.response.status === 401) {
                await refreshToken(updateLink)
            } else {
                console.log("error in response")
            }
        }
    )
}


