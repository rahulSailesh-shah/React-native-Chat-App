import axios from "axios";

export default axios.create({
  baseURL: "http://10.200.136.160:8000/api/v1",
});
