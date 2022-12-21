import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function updateLinks(newMas) {
    console.log(newMas)
    let json = JSON.stringify(newMas)
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/updateLinks",  {
        data: json
    },{
        headers: {
            "Authorization": `Bearer ${tokens[0]}`
        }
    }).catch(
        async (error) => {
            if(error.response.status === 401) {
                await refreshToken(updateLinks)
            } else {
                console.log('error in response')
            }
        }
    )

}


