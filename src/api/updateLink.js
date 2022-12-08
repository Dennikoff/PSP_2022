import axios from "axios";

export async function updateLink(url, isSelected) {
    return await axios.post("http://localhost:8080/api/updateLink",null, {
        params: {
            url,
            isSelected
        }
    })
}


