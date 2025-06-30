import axios from "axios";

const axiosUtils=axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true,
})

export default axiosUtils;