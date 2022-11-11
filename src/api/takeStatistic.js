import axios from "axios";

export async function takeStatistic() {
    return await axios.get("http://localhost:8080/api/statistics")
}