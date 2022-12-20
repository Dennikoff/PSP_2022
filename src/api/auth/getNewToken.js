import axios from "axios";

export async function getNewToken(token) {
    return await axios.post("http://localhost:8080/api/auth/token", {
        "refreshToken": token
    })

}


