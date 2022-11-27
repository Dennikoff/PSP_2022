import axios from "axios";


export async function startIndexing() {
    return await axios.get("http://localhost:8080/api/startIndexing")
}