
import axios  from "axios";
import  {Singleton } from "@/api/Singleton";
import {leavestatus} from '../Modals/LeaveStatus'
const api_url='/api/leavesStatus'
 export class LeaveStatus {
  private static leaves_status_instance: LeaveStatus;
   singleton_instance:Singleton
  private constructor(){
    this.singleton_instance=Singleton.getInstance()

  }
  public static getLeavesInstance(): LeaveStatus {
    if (!LeaveStatus.leaves_status_instance) {
      LeaveStatus.leaves_status_instance = new LeaveStatus();
    }

    return LeaveStatus.leaves_status_instance;
}
          async getLeaveStatus(): Promise<leavestatus> {
            const string = localStorage.getItem("user_token")?localStorage.getItem("user_token"):''
          const response= await axios.get(`${this.singleton_instance.server_url}${api_url}`,
            { headers: {
                "auth-token":string?string.replace("\"", "").replace("\"", ""):'',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }});
         // console.log('response is',response.data.data)
          return response.data
          }
        

}

