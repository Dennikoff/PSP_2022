import axios from "axios";


export async function startIndexing(data) {
    console.log(data)
    console.log(JSON.stringify(data))
    return await axios.get("http://localhost:8080/api/startIndexing", {
        data: data
    })
}