import axios from "axios";
import {storage} from "../storage/storage";
import {getNewToken} from "./auth/getNewToken";
import {refreshToken} from "../utils/refreshToken";

export async function getLinks() {
    const tokens = storage.get('tokens')
    return await axios.get("http://localhost:8080/api/getLinks", {
        headers: {"Authorization": `Bearer ${tokens[0]}`}
    }).catch(
        async (error) => {
            if(error.response.status === 401){
                await refreshToken(() => getLinks())
            } else {
                throw error
            }
        })
}