import axios from "axios";

export async function registration(login, password) {
    return await axios.post("http://localhost:8080/api/registration", {
        login,
        password
    }, {
        validateStatus: (status) => {
            return status === 200 || status === 205
        }
    })

}