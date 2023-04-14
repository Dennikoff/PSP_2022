import axios from "axios";
import {storage} from "../../storage/storage";
import {refreshToken} from "../../utils/refreshToken";

export async function changePassword(login, password, newPassword) {
    const tokens = storage.get('tokens')
    return await axios.patch("http://localhost:8080/api/user/change",{
        login,
        password,
        newPassword,
    },{
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        },
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                await refreshToken(() => changePassword(login, password, newPassword))
            } else {
                throw error
            }
        })
}


