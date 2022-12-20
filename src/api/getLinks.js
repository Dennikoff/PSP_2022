import axios from "axios";
import {storage} from "../storage/storage";
import {getNewToken} from "./auth/getNewToken";

export async function getLinks() {
    const tokens = storage.get('tokens')
    return await axios.get("http://localhost:8080/api/getLinks", {
        headers: {"Authorization": `Bearer ${tokens[0]}`}
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                const response = await getNewToken(tokens[1])
                console.log(response.data.accessToken)
                storage.set('tokens', [response.data.accessToken, tokens[1]])
                return await getLinks()
            } else {
                console.log("error in request")
            }
        })
}