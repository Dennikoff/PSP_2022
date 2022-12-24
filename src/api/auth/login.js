import axios from "axios";

export async function login(login, password) {
    return await axios.post("http://localhost:8080/api/auth/login", {
        login,
        password
    })

}