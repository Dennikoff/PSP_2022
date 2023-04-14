import axios from "axios";
import {storage} from "../../storage/storage";
import {refreshToken} from "../../utils/refreshToken";

export async function recoverPassword(login, password, code) {
    const tokens = storage.get('tokens')
    return await axios.patch("http://localhost:8080/api/user/recover", {
        login,
        password,
        code,
    }, {
        headers: {"Authorization": `Bearer ${tokens[0]}`},
    }).catch(
        async (error) => {
            if (error.response.status === 401) {
                return await refreshToken(() => recoverPassword(login, password, code))
            } else {
                throw error
            }
        })
}
