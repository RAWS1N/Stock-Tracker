import axios from "axios";

const TOKEN = 'ccjh7aaad3i2ngrpl420ccjh7aaad3i2ngrpl42g'

const Server = axios.create({
    baseURL:'https://finnhub.io/api/v1',
    params :{
        token : TOKEN
    }
})



export default Server