import axios from "axios";

export async function deleteLink(url) {
    return await axios.delete("http://localhost:8080/api/deleteLink",  {
        params: {
            url
        }
    })

}


