import axios from "axios";

export function takeStatistic(setJsonInfo) {
    axios.get("http://localhost:8080/api/statistics")
        .then(function(response) {
            console.log(response.data)
            setJsonInfo(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
}