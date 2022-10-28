import axios from "axios";
import ENV from "../../conf/EnvData";

const {URL_BASE} = ENV;

export const apiLogin = (loginData) => {

    return axios.post(URL_BASE+"/api/auth/local", loginData);

}

