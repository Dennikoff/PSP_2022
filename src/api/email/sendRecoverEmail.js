import axios from "axios";
import {storage} from "../../storage/storage";
import {refreshToken} from "../../utils/refreshToken";

export async function sendRecoverEmail(login) {
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/email/recover", {
        login
    }, {
        headers: {"Authorization": `Bearer ${tokens[0]}`},
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                return await refreshToken(() => sendRecoverEmail(login))
            } else {
                throw error
            }
        })

}


