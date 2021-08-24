import axios from 'axios';
import { Singleton } from '../../../../api/Singleton';
import{ createReports } from '../models/createReport';
const api_url = "/api/reports"
export class CreateReport {
    CreateReportInstance = Singleton.getInstance()
    async getCreateReport(): Promise<createReports>{
        const string = localStorage.getItem("user_token")?localStorage.getItem("user_token"):''
        return axios.get(`${this.CreateReportInstance.server_url}${api_url}`, {
            headers: {
                "auth-token":string?string.replace("\"", "").replace("\"", ""):'',
                "Access-Control-Allow-Origin": "*",
            }
        }).then(result => {
            return result.data.data;
        }).catch(err => {
            console.error(err)
        })    
    }
}