import axios from "axios";

export async function updateLinks(newMas) {
    console.log(newMas)
    let json = JSON.stringify(newMas)
    return await axios.post("http://localhost:8080/api/updateLinks",  {
        data: json
    })

}


