<template>
  <div class="contemplate">
    <div class="backgroundImage">
      <form class="modal-content animate">
        <div class="imgcontainer">
          <p class="paragraphStyle">
            Welcome To
            <br />
            <span class="paraStyle">R</span>
            <span class="paragraphO">O</span>
            <span class="paraStyle">S</span>
          </p>
        </div>
<br/><br/>
        <div class="container">
          <label for="uname" style="float:left;">
            <strong>Email</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Email Id"
            class="form-control"
            v-model="email"
            name="uname"
            required
          /><br/><br/>

          <label for="psw" style="float:left">
            <strong>Password</strong>
          </label>
          <input type="password" placeholder="Enter Password" name="psw" v-model="password" required />
          <br />
          <br />
          <button @click.stop="loginbtn">Login</button>
          <span class="psw">
            Forgot
            <a href="#">password?</a>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { Login } from './service/login'
export default defineComponent({
  data() {
    return {
      email:'',
      password:''
    };
  },
  methods: {
    async loginbtn(event:Event):Promise<void> {
      event.preventDefault()
      let login_instance=new Login();
     let response=await login_instance.login(this.email,this.password)
     if(response){
       localStorage.setItem('user_token',JSON.stringify(response))
       this.$router.push("/home/leaves");
     }
     
    }
  }
});
</script>
<style scoped>

p.paragraphStyle {
  font-weight: bold;
  font-size: 40px;
  margin-top: -20px;
}

p span.paraStyle {
  font-weight: bold;
  font-size: 52px;
}

p span.paragraphO {
  font-weight: bold;
  font-size: 52px;
  color: #32b1e7;
  font-family: Arial;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: black solid 1px;
}

.lform {
  text-align: center;
  margin-top: 10px;
}

button {
  background-color:#32b1e7;
  color: white;
  padding: 14px 20px;
  margin: 1px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 -80px 0;
  position: relative;
}

img.avatar {
  width: 20%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  /* top: 0; */
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 130px auto 0 auto;
  width: 30%;
  border-radius: 7px;
  box-shadow: 10px 10px 5px #aaaaaa;
}

.backgroundImage {
  position: relative;
}

.contemplate {
  background-image: url("https://p4.wallpaperbetter.com/wallpaper/1002/220/951/abstract-background-wallpaper-preview.jpg");
  position: absolute;
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  margin-top: -67px;
}
</style>