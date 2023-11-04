import axios from "axios";
import { errorToast } from "./toaster.service";
import { config } from "../config"

export const postData = async (url: string, data: any) => {
    try {
        const resp = await axios.post(`${config.SERVER_URL}${url}`, data);
        return resp.data;
    } catch (error: any) {
        errorToast(error.response.data.error);
    }
}