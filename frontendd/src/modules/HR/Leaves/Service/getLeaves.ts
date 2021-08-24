//const axios=require("axios")
import axios  from "axios";
import  {Singleton } from "@/api/Singleton";
import {leaves} from '../Modals/Leaves'
const api_url='/api/leaves'
 export class Leaves {
  private static leaves_instance: Leaves;
   singleton_instance:Singleton
  private constructor(){
    this.singleton_instance=Singleton.getInstance()

  }
  public static getLeavesInstance(): Leaves {
    if (!Leaves.leaves_instance) {
      Leaves.leaves_instance = new Leaves();
    }

    return Leaves.leaves_instance;
}
          async getLeaves(): Promise<leaves> {
            const string = localStorage.getItem("user_token")?localStorage.getItem("user_token"):''
          const response= await axios.get(`${this.singleton_instance.server_url}${api_url}`,
            { headers: {
                "auth-token":string?string.replace("\"", "").replace("\"", ""):'',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }});
          return response.data
          }
        

}

//export default instance
