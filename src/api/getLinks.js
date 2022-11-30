import axios from "axios";

export async function getLinks() {
    return await axios.get("http://localhost:8080/api/addLink")
}