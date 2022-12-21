import {getNewToken} from "../api/auth/getNewToken";
import {storage} from "../storage/storage";

export const refreshToken = async (callback) => {
    const tokens = storage.get('tokens')
    const response = await getNewToken(tokens[1])
    console.log(response.data.accessToken)
    storage.set('tokens', [response.data.accessToken, tokens[1]])
    return await callback
}