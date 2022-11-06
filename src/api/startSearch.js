import axios from "axios";


export async function startSearch(query) {
    console.log(`now it only prints query: ${query}`)
    return await axios.get("http://localhost:8080/main")
}