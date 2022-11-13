import axios from "axios";


export async function startIndexing() {
    return await axios.get("http://localhost/api/startIndexing")
}