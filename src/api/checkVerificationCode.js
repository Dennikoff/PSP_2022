import axios from "axios";
import {storage} from "../storage/storage";
import {refreshToken} from "../utils/refreshToken";

export async function checkVerificationCode(code, login) {
    return await axios.get("http://localhost:8080/api/verification/check", {
        params: {
            login,
            code
        }
    })
}


