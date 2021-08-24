<template>
  <br />

  <!-- Payroll Report -->
  <div id="newIdd">
    <div class="row">
      <div class="col-lg-8">
        <h3 style="text-align:left;">Payroll Reports</h3>
      </div>

      <!-- Save Report Button -->
      <div class="col-lg-4">
        <button
          class="btn btn-dark mx-2 pull-right"
          id="hidden_button"
         
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          @click="onSaveReport"
        >
          <em class="fas fa-save" style="padding:5px;"></em>Save Report
        </button>

        <!-- Add Field Button -->
        <button class="btn btn-dark pull-right" @click="show_element_menu = true; addNewCss()">
          <em class="fas fa-plus" style="padding:5px;"></em>Add fields
        </button>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-lg-3">
        <label class="pull-left">
          <small>From Date</small>
        </label>
        <input
          type="date"
          class="form-control"
          placeholder="enter From Date"
          v-model="from_date"
          required
        />
      </div>
      <div class="col-lg-3">
        <label class="pull-left">
          <small>To Date</small>
        </label>
        <input
          type="date"
          class="form-control"
          placeholder="enter To Date"
          v-model="to_date"
          required
        />
      </div>

     <!--  Called Method to Filter 
      Employee Name  -->
      
      <div class="col-xl-3 col-l-3 col-md-6">
        <label class="pull-left">
          <small>Employee Name</small>
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Employee Name"
          v-model="employee_name"
          @change="scriptInjection()"
          required
        />
      </div>

      <!-- Called Method to Filter Department -->

      <div class="col-xl-3 col-l-3 col-md-6">
        <label class="pull-left">
          <small>Department</small>
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Department Name"
          v-model="department"
          @change="scriptDepart()"
          required
        />
      </div>
    </div>

    <!-- Basic Information -->

    <div class="row" v-if="added_basic_element.length">
      <div class="card mt-5" style="width:150px;">
        <div class="row">
          <div class="col-12">
            <span class="circle pull-right-top">{{added_basic_element.length}}</span>
          </div>
        </div>
        <p style="text-align:center">Basic Info</p>
      </div>
    </div>

    <br />
    <br />

    <!-- Table for displaying the 
    data from backend -->

    <div class="row">
      <div class="col-lg-12" v-if="searched_users.length">
        <table class="table table striped table-hover">
          <caption></caption>
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" v-model="selectAll" @click="selectbtn" />
              </th>
              <th scope="col">EMPLOYEE NAME</th>
              <th scope="col">EMP ID</th>
              <th scope="col">DEPARTMENT</th>
              <th scope="col">DELETE</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="i in searched_users" :key="i._id">
              <td>
                <input type="checkbox" :value="i._id" v-model="selected" />
              </td>
              <td class="profile-info">
                <img :src="i.imageUrl" class="rounded-circle" :alt="i.employee_name" :width="50" />
                {{ i.employee_name }}
              </td>
              <td>{{i.employee_id}}</td>
              <td>{{i.department}}</td>
              <td @click="deleterecord(i)">
                <em class="fas fa-trash"></em>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Display MOdel  on click of Save Report-->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <strong>Name Your Report Before Saving it</strong>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label class="pull-left" style="margin-right: 372px;">Name</label>
            <input type="text" class="form-control" v-model="file_name" />
            <span
              class="pull-left text-danger"
              v-if="file_name_validation.length"
            >{{file_name_validation}}</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" @click="onSaveReport()">
              <em class="fas fa-save" style="padding:3px;"></em>SAVE REPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Go back to Payroll Report -->

  <div id="element" class="bg-text" v-if="show_element_menu">
    <div class="container pop-over" id="payroll">
      <div class="row mt-2">
        <div class="col-9">
          <h6 style="cursor:pointer;" @click="revert_changes()">
            <em class="fas fa-arrow-left"></em>
            <strong>Select Fields for Payroll Report</strong>
          </h6>
        </div>

        <!-- Add basic Information -->

        <div class="col-3">
          <button class="btn btn-dark btn-sm" @click="add_new_elements()">
            <em class="fas fa-plus" style="padding:5px;"></em>ADD
          </button>
        </div>
      </div>
      <div class="row mt-2" id="menu_list">
        <div class="col-10">
          <p class="pointer" :style="basic_style" @click="show_basic()">
            <strong>Basic Information</strong>
          </p>
        </div>
      </div>
      <div class="row" v-if="show_basic_elements">
        <div class="col-12" v-for="(obj,index) in basic_elements" :key="index">
          <div class="row pt-2 pb-1">
            <div class="col-10 pb-1">
              <label class="pull-left">
                <strong>{{obj.name}}</strong>
              </label>
            </div>
            <div class="col-2 pb-1">
              <input
                type="checkbox"
                :value="obj.name"
                v-model="obj.status"
                name="basic_label"
                @change="changed_status_of_parent_element('basic',obj.name)"
                :checked="obj.status"
              />
            </div>
          </div>
          <div class="row pt-2" v-for="(element,index) in obj.elements" :key="index">
            <div class="col-10">
              <label class="pull-left ash">{{element.name}}</label>
            </div>
            <div class="col-2">
              <input
                type="checkbox"
                :value="element.key"
                v-model="element.status"
                :id="obj.name"
                name="basic"
                :checked="element.status"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

/* 
Import All the required model and services
 */ 

import { CreateReport } from "../service/getcreateReport";
import { InformationData } from "../service/getInfromation";
import { defineComponent } from "vue";
import { basicInformations } from "../models/information";
import { createReports } from "../models/createReport";

export default defineComponent({
   name: "PayrollReport",
  props: {
    msg: String
  },
  data() {
    return {
      CreateReport: new CreateReport(),
      basicInformationApi: new InformationData(),
      selected: [] as Array<string>,
      selectAll: false,
      enablebtn: false,
      selectedDate: null,
      from_date: "",
      to_date: "",
      department: "",
      employee_name: "",
      show_element_menu: false,
      basic_style: "border-bottom:black 2px solid;",
      show_basic_elements: true,
      custom_elements_list: [],
      added_basic_element: [] as Array<string>,
      temp_basic_element: [],
      output_data: {},
      file_name: "",
      file_name_validation: "",
      users: [],
      result_obj: {},
      arrayReport: [] as Array<createReports>,
      userList: [],
      itemArray: [] as Array<createReports>,
      show_elemented: false,
      basic_elements: [] as Array<basicInformations>,
      deleteClicked: false,
      error_message:""
    };
  },

  // Called method from backend

  async created() {
    this.arrayReport = JSON.parse(JSON.stringify(await this.CreateReport.getCreateReport()));
    this.basic_elements = JSON.parse(JSON.stringify(await this.basicInformationApi.getInformationReport()));
  },

   /* Method is use to display the table data as per search box 
  of Employee Name and Department Field */

  computed: {
    searched_users(): Array<createReports>{
      if (this.employee_name.length || this.department.length) {
        var result_list = [];

        for (var i = 0; i < this.arrayReport.length; i++) {
          if (this.employee_name.length && !this.department.length) {
            if (
              this.arrayReport[i].employee_name
                .toLowerCase()
                .includes(this.employee_name.toLowerCase())
            ) {
              result_list.push(this.arrayReport[i]);
            }
          } else if (this.department.length && !this.employee_name.length) {
            if (
              this.arrayReport[i].department
                .toLowerCase()
                .includes(this.department.toLowerCase())
            ) {
              result_list.push(this.arrayReport[i]);
            }
          } else {
            if (
              this.arrayReport[i].employee_name
                .toLowerCase()
                .includes(this.employee_name.toLowerCase()) &&
              this.arrayReport[i].department
                .toLowerCase()
                .includes(this.department.toLowerCase())
            ) {
              result_list.push(this.arrayReport[i]);
            }
          }
        }
        return result_list;
      } else return this.arrayReport;
    }
  },

  methods: {

    /*
    Add new classes to add the background color on page 
     */ 
    addNewCss() {
      let body = document.getElementById("newIdd");
      body ?body.classList.add("bgImage"): '' //add the class
    },

     /* Called method to store 
     data in local storage */

    onSaveReport() {
      localStorage.setItem("saveData", JSON.stringify(this.arrayReport));
    },

    // Splice payroll report after click on delete button
    deleterecord(data:number) {
      this.arrayReport.splice(data, 1);
    },

    // called the method to remove the background color
    revert_changes() {
      this.show_element_menu = false;
      let body = document.getElementById("newIdd");
      body ?body.classList.remove("bgImage"): ''
    },

    /* Change status of Add Payroll Report 
    According to Basic information */

    changed_status_of_parent_element(type:string, name:string):void {
      if (type == "basic") {
        for (var i = 0; i < this.basic_elements.length; i++) {
          if (
            this.basic_elements[i].name == name &&
            this.basic_elements[i].status
          ) {
            for (var j = 0; j < this.basic_elements[i].elements.length; j++) {
              this.basic_elements[i].elements[j].status = true;
            }
          }
        }
      }
    },

    /* Method to select all data from checkbox */

    selectbtn() {
      this.selected = [];
      this.itemArray = JSON.parse(JSON.stringify(this.arrayReport));
      if (!this.selectAll) {
        for (let i in this.itemArray) {
         
          this.selected.push(this.itemArray[i]._id);
        }
      }
    },

    //Adding basic elements

    add_new_elements() {
      this.added_basic_element = [];
      for (var basic_i = 0; basic_i < this.basic_elements.length; basic_i++) {
        for (
          var basic_j = 0;
          basic_j < this.basic_elements[basic_i].elements.length;
          basic_j++
        ) {
          if (this.basic_elements[basic_i].elements[basic_j].status)
            this.added_basic_element.push(
              this.basic_elements[basic_i].elements[basic_j].key
            );
        }
      }
    },

     /* Called Method to check 
     validation of Employee Name value */

    scriptInjection():void {
      var htmlRegex = new RegExp(/(<([^>]+)>)/i);
      if (!htmlRegex.test(this.employee_name)) {
        this.error_message = "";
      } else this.error_message = "Enter valid Employee Name";
    },

    /*  Called Method to check 
    validation of Department Name */

    scriptDepart():void {
      var htmlRegex = new RegExp(/(<([^>]+)>)/i);
      if (!htmlRegex.test(this.department)) {
        this.error_message = "";
      } else this.error_message = "Enter valid Department Name";
    }
  }
});
</script>

<style scoped>

/* Import the style newReport */
@import "../css/newReport.css";
</style>