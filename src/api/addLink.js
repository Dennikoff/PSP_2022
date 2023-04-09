import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function addLink(url, name, isSelected) {
    isSelected = +isSelected
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/addLink", null, {
        headers: {"Authorization": `Bearer ${tokens[0]}`},
        params: {
            url,
            name,
            isSelected
        }
    }).catch(
    async (error) => {
        if(error.response.status === 401){
            return await refreshToken(() => addLink(url, name, isSelected))
        } else {
            throw error
        }
    })

}


