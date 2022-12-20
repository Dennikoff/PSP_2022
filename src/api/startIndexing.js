import axios from "axios";
import {storage} from "../storage/storage";
import {getNewToken} from "./auth/getNewToken";


export async function startIndexing(data) {
    console.log(data)
    let json = JSON.stringify(data)
    const tokens = storage.get('tokens')
    return await axios.post("http://localhost:8080/api/startIndexing", {
        data: json
    }, {
            headers: {"Authorization": `Bearer ${tokens[0]}`}
        }).catch(
        async (error) => {
            if(error.response.status === 401){
                const response = await getNewToken(tokens[1])
                console.log(response.data.accessToken)
                storage.set('tokens', [response.data.accessToken, tokens[1]])
                return await startIndexing()
            } else {
                console.log("error in request")
            }
        })
}