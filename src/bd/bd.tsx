import axios  from "axios";

export const basedatos=axios.create({
    baseURL: 'http://localhost:3001/',
})