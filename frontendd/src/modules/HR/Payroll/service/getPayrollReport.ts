import axios from 'axios';
import { Singleton } from '../../../../api/Singleton';
import { payrollReport } from '../models/payrollReport';
const api_url = "/api/reportList"

export class PayrollReports {
    ReportInstance = Singleton.getInstance()
    async getReport():Promise<payrollReport> {
        const string = localStorage.getItem("user_token")?localStorage.getItem("user_token"):''

        return axios.get(`${this.ReportInstance.server_url}${api_url}`, {
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