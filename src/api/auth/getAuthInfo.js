import axios from "axios";
import {storage} from "../../storage/storage";
import {refreshToken} from "../../utils/refreshToken";

export async function getAuthInfo() {
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/auth/info", null, {
        headers: {"Authorization": `Bearer ${tokens[0]}`},
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                return await refreshToken(() => getAuthInfo())
            } else {
                throw error
            }
        })

}


