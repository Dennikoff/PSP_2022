import axios from "axios";


export async function startIndexing(data) {
    let json = JSON.stringify(data)
    return await axios.post("http://localhost:8080/api/startIndexing", {
        data: json
    })
}