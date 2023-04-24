import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function updateLinks(newMas) {
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/updateLinks",  {
        data: newMas
    },{
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        }
    }).catch(
        async (error) => {
            if(error.response.status === 401) {
                return await refreshToken(async () => await updateLinks(newMas))
            } else {
                throw error
            }
        }
    )

}


