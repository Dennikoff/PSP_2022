import {getNewToken} from "../api/auth/getNewToken";
import {storage} from "../storage/storage";
import {logoutUser} from "./logoutUser";

export const refreshToken = async (callback) => {
    const tokens = storage.get('tokens')
    let response
    try {
        response = await getNewToken(tokens[1])
    } catch(e) {
        logoutUser()
        return
    }
    // const responce = await getNewToken(tokens[1])
    // console.log(response)
    // if(response.data.accessToken === null) {
    //     console.log('server is DEAD')
    //     logoutUser()
    //     return
    // }
    storage.set('tokens', [response.data.accessToken, tokens[1]])
    return await callback()
}