import axios from 'axios';
import { Singleton } from '../../../../api/Singleton';
import { basicInformations } from '../models/information';
const api_url = "/api/basicInformation"
export class InformationData {

    InformationInstance = Singleton.getInstance()
    async getInformationReport():Promise<basicInformations> {
        const string = localStorage.getItem("user_token")?localStorage.getItem("user_token"):''
        return axios.get(`${this.InformationInstance.server_url}${api_url}`, {
            headers: {
                "auth-token":string?string.replace("\"", "").replace("\"", ""):'',
                "Access-Control-Allow-Origin": "*",
            }
        }).then(result => {
            return result.data.data
        }).catch(err => {
            console.error(err)
        })
        
    }
}