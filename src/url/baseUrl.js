import axios from 'axios';
import APIConfig from "../config/basic.json";

export default axios.create({
  baseURL: APIConfig[APIConfig.APIMode].APIBase_URL,
});
