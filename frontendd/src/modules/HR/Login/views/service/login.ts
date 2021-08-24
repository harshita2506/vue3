import axios from 'axios';
import { Singleton } from '@/api/Singleton';
import { login } from '../model/login'
const api_url = "/api/user/login"
export class Login {
    
       server = Singleton.getInstance()
    
 
     

    async login(email:string,password:string): Promise<login>{
     const obj=   {
            email: email,
     password: password

};


      const response=  await axios.post(`${this.server.server_url}${api_url}`,obj, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"application/json"
            }
            
        }) ;

        return response.data.data.token
    }
}