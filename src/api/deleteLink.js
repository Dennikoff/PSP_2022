import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function deleteLink(url) {
    const tokens = storage.get('tokens')
    return await axios.delete("http://localhost:8080/api/deleteLink", {
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        },
        params: {
            url
        }
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                await refreshToken(() => deleteLink(url))
            } else {
                console.log("error in request")
            }
        })
}


