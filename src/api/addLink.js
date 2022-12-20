import axios from "axios";
import {storage} from "../storage/storage";
import {getNewToken} from "./auth/getNewToken";

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
            const response = await getNewToken(tokens[1])
            console.log(response.data.accessToken)
            storage.set('tokens', [response.data.accessToken, tokens[1]])
            return await addLink()
        } else {
            console.log("error in request")
        }
    })

}


