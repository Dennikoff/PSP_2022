import axios from "axios";


export async function stopIndexing() {
    return await axios.get("http://localhost:8080/api/stopIndexing")
}