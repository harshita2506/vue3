<template>
  <div class="container leavescontainer" id="mainContent">
    <div class="row">
      <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 bd-highlight"><h4>Leaves</h4></div>
        <div class="p-2 bd-highlight">
          <button class="btn btn-dark btn-block">MyLeaves</button>
        </div>
        <div class="col-lg-4 ms-auto">
          <div class="row">
            <div class="col-lg-6 m-0">
              <button id="request" class="btn btn-dark btn-block" @click="openRequestForm()">
                <span class="fs-6"> Request Vacation </span>
              </button>
            </div>
            <div class="col-lg-6">
              <div
                class="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div class="btn-group" role="group" aria-label="First group">
                  <button type="button" class="btn btn-light" @click="previous">
                    <em class="fas fa-arrow-left"></em>
                  </button>
                  <span class="btn btn-light">{{ buttonTitle }}</span>
                  <button type="button" class="btn btn-light" @click="next">
                    <em class="fas fa-arrow-right"></em>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 bd-highlight">
          <h4>{{totalLeaves[0] ? totalLeaves[0].total_leaves:''}}</h4>
          <p class="fw-bold">Total Holidays</p>
        </div>
        <div class="p-2 bd-highlight">
          <h4>{{totalLeaves[0]?(totalLeaves[0].total_leaves - totalLeaves[0].used_leaves):''}}</h4>
          <p class="fw-bold">Remaining Holidays</p>
        </div>
        <div class="p-2 bd-highlight">
          <h4>{{totalLeaves[0]?(totalLeaves[0].used_leaves):''}}</h4>
          <p class="fw-bold">Used Holidays</p>
        </div>
         <div class="p-2 bd-highlight">
          <h4>{{store.getters.pendingLeaves}}</h4>
          <p class="fw-bold">Pending Leaves</p>
        </div>
        
        <div class="col-lg-4 ms-auto">
          <p class="inline mt-3 fw-normal fs-6">
            <span class="fw-bold">Upcoming Leave: </span>
            {{store.getters.upcomingLeaves}}
          </p>
        </div>
      </div>
    </div>
    <LeavesCalendar
      :currentMonth="current_month"
      :currentYear="current_year"
    />
  </div>
  <LeaveRequest v-if="store.state.show_request" />
</template>
<script lang="ts">
import LeavesCalendar from "../Components/LeavesCalendar.vue";
import LeaveRequest from "../Components/LeaveRequest.vue";
import {Leaves} from "../Service/getLeaves";
import { useStore } from "vuex";
import { defineComponent } from 'vue';
import { leaves } from '../Modals/Leaves'
export default defineComponent({
  components: { LeavesCalendar, LeaveRequest },
  name:'Leaves',
  data() {
    return {
      show: false,
      current_month: new Date().getMonth() as number,
      current_year: new Date().getUTCFullYear() as number,
      leaves:[] as Array<leaves>,
      store:useStore(),
      months: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]as Array<string>,
    };
  },
  /**
   * gets leave balence from perticular employee
   */
   async created(){
     let leaves_instance=Leaves.getLeavesInstance()
      let employee_leaves = await leaves_instance.getLeaves();     
     this.leaves=JSON.parse(JSON.stringify(employee_leaves))
    console.log("leavs are",JSON.parse(JSON.stringify(this.leaves)))
  },
  computed: {
    /**
     * returns every month name and year
     */
    buttonTitle() :string {
      let button_title=`${this.months[this.current_month]}${this.current_year}`;
      console.log(button_title)
      return button_title
    },
    /**
     * Returns total number of leaves
     */
    totalLeaves(){
      if(JSON.parse(JSON.stringify(this.leaves))){
        let total_leaves=JSON.parse(JSON.stringify(this.leaves))
 return total_leaves
      }
      else return null
     
    },
   
  },
  methods: {
    previous() {
      this.current_month--;
    },
    next() {
      this.current_month++;
    },
    /**
     * store method to toggles show request form 
     */
    openRequestForm() {
      this.store.commit('openShowRequest',true)
      this.show = true;
    },
  },
});
</script>
<style scoped>
@import "../css/Leaves.css";

</style>
