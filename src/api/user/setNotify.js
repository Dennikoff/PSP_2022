import axios from "axios";
import {storage} from "../../storage/storage";
import {refreshToken} from "../../utils/refreshToken";

export async function setNotify(login, flag) {
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/user/notify", {
        login,
        flag,
    }, {
        headers: {"Authorization": `Bearer ${tokens[0]}`},
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                return await refreshToken(() => setNotify(login, flag))
            } else {
                throw error
            }
        })

}


