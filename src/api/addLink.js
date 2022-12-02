import axios from "axios";

export async function addLink(url, name, isSelected) {
    isSelected = +isSelected
    return await axios.post("http://localhost:8080/api/addLink", null, {
        params: {
            url,
            name,
            isSelected
        }
    })

}


