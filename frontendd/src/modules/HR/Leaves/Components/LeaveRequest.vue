
<template>
  <div class="overlay2" id="hide" v-show="store.state.show_request"></div>
  <div class="overlay1" id="mySidebar" v-show="store.state.show_request">
    <div class="shadow lg bg-body rounded align-baseline " >
        <div class="m-2 p-2">
       <div class="d-flex justify-content-between">   
          <h4><span><em @click="hidesideBar()" class="fas fa-arrow-left"></em></span>     
           Request Vacation</h4>
          <button @click="hidesideBar('save')" class="btn btn-dark btn-sm">
            <em class="fas fa-file"></em> Save
          </button>
      </div>
      <div class="d-flex bd-highlight">
        <div class="p-4">
          <h4>28</h4>
          <p>Total Holidays</p>
        </div>
        <div class="p-4 bd-highlight">
          <h4>17</h4>
          <p>Remaining Holidays</p>
        </div>
        <div class="p-4 bd-highlight">
          <h4>11</h4>
          <p>Used Holidays</p>
        </div>
      </div> 
      <div class="ml-4">
      <p >
        <em class="fas fa-info-circle"></em>Shifts that conflict the vacation period will be set to open shifts
      </p></div>
    </div>
</div>
    <div class="m-2 p-4">
      <div class="d-flex">
        <div class="form-check p-4">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Single Day
          </label>
        </div>
        <div class="form-check p-4">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Range
          </label>
        </div>
      </div>
      <div class="d-flex">
        <input
          type="date"
          class=""
          id="exampleDatepicker3"
          v-model="start_date"
        />
        <input
          type="date"
          class=""
          id="exampleDatepicker3"
        />
      </div>
      <div>
      <input type="text" class="mt-5" id="exampleDatepicker3" placeholder="Comments" /></div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from 'vue';
export default defineComponent({
  data(){
    return{
      start_date:'',
      store:useStore(),
    }
  },
  methods: {
    /**
     * method to hide leave request form
     */
    hidesideBar(save:string) {
      if(save==='save'){
      let request={status:"Pending",start_date:this.start_date}
      this.store.commit('updateLeaveRequests',request);
      }
      this.store.commit('openShowRequest',false)

    },
  },
});
</script>

<style scoped>
@import "../css/LeaveRequest.css";
</style>