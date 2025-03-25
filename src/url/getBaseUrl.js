import axios from 'axios';
import APIConfig from "../config/basic.json";


export default function getBaseUrl() {
  return APIConfig[APIConfig.APIMode].APIBase_URL;
};
