<template>
  <!-- Payroll Report -->
  <div class="row">
    <div class="col-lg-12">
      <h3 style="text-align:left;">Payroll Reports</h3>
    </div>
    <!-- <button @click="items.push({id:4, price:50})">Add Total</button>
    <h1>Total - {{ TotaMethod }}</h1> -->
  </div>

  <!-- Download Payroll Report 
  in EXCEL, PDF and CSV -->

  <div class="row">
    <div class="col-lg-9 mt-6 downloadDiv">
      <button
        v-show="enablebtn"
        @click="selectItem"
        class="btn btn-dark excelButton"
      >
        EXCEL
      </button>
      <button
        v-show="enablebtn"
        @click="downloadPdf"
        class="btn btn-dark enableButton"
      >
        PDF
      </button>
      <button
        v-show="enablebtn"
        @click="selectItem"
        class="btn btn-dark enableBtnCsv"
      >
        CSV
      </button>
    </div>
    <div class="col-lg-3">
      <button
        class="btn btn-dark"
        @mouseover="mouseOver"
        style="margin:10px;margin-left:-23px;"
      >
        <span style="margin:5px;"> <em class="fas fa-download"></em> </span
        >Download
      </button>

      <!-- Create new Payroll Report -->

      <button class="btn btn-dark" @click="selectedbtn">
        <span>
          <em class="fas fa-plus"></em>
        </span>
        Create New
      </button>
    </div>
  </div>
  <br />

  <!--  Table for displaying 
  the data from backend  -->
  <div class="row">
    <div id="divToPrint">
      <table class="table table striped table-hover" id="pdfTable">
        <caption></caption>
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" v-model="selectAll" @click="select" />
            </th>
            <th class="pull-left" scope="col">REPORT NAME</th>
            <th scope="col">START DATE</th>
            <th scope="col">END DATE</th>
            <th style="text-align:center" scope="col">DOWNLOAD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in payrollArray" :key="index">
            <td>
              <input
                type="checkbox"
                :value="report._id"
                name="check_box"
                v-model="selected"
              />
            </td>
            <td class="pull-left">{{ report.report_name }}</td>
            <td>{{ report.start_date }}</td>
            <td>{{ report.end_date }}</td>
            <td style="text-align:center">
              <em
                class="fas fa-download"
                @click="excelExportDownload(report)"
                icon="download"
              ></em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
// import All the required package
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake";
import { PayrollReports } from "../service/getPayrollReport";
import { defineComponent } from "vue";
import { payrollReport } from "../models/payrollReport";

export default defineComponent({
  name: "PayrollList",
  data() {
    return {
      ServerData: new PayrollReports(),
      selected: [] as Array<string>,
      selectAll: false,
      enablebtn: false,
      selectedDate: null,
      show_loader: true,
      payrollArray: [] as Array<payrollReport>,
      itemArray: [] as Array<payrollReport>,
      array1: [] as Array<payrollReport>,
      items: [
        { id: 1, price: 200 },
        { id: 2, price: 300 },
        { id: 3, price: 200 },
      ],
    };
  },

  components: {},

  setup() {
    // Write method to export CSV file
    var csvExport = (arrData: Array<payrollReport>) => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]),
        ...arrData.map((item: payrollReport) => Object.values(item)),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "report.csv");
      link.click();
    };

    // Write Method to export Excel file
    var excelExportDownload = (data: payrollReport) => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [Object.keys(data), Object.values(data)]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");
      const dataa = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", dataa);
      link.setAttribute("download", "report.csv");
      link.click();
    };
    return { csvExport, excelExportDownload };
  },

  /* Call the method from backend to 
  get list of Report
   */

  async created() {
    let array = await this.ServerData.getReport();
    this.payrollArray = JSON.parse(JSON.stringify(array));
  },

  computed: {
    csvData(): Array<payrollReport> {
      return this.payrollArray.map((item: payrollReport) => ({
        ...item,
      }));
    },
    // TotaMethod() {  
    //   return (this as any).items.reduce((total:any, curr:any) => (total = total + curr.price), 0)
    // }
  },

  methods: {
    /* Call the method to display the button 
    EXECL, CSV, PDF */
    mouseOver() {
      this.enablebtn = true;
    },

    /*  Call method to download the Csv file 
    according to checkbox tick */
    selectItem() {
      if (JSON.parse(JSON.stringify(this.selected)).length == 0) {
        alert("Select at least one Report");
      } else {
        for (
          let i = 0;
          i < JSON.parse(JSON.stringify(this.selected)).length;
          i++
        ) {
          this.payrollArray.forEach((element) => {
            if (
              element._id.includes(JSON.parse(JSON.stringify(this.selected))[i])
            ) {
              this.array1.push(element);
            }
          });
        }
        this.csvExport(this.array1);
      }
      this.array1 = [];
    },

    // Called method to Download PDF on button Click

    downloadPdf() {
      const pdfTable = document.getElementById(
        "divToPrint"
      ) as HTMLTableElement;

      // html to pdf format

      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).open();
    },

    /* Add the routing to navigate one 
     page to another page */
    selectedbtn() {
      this.$router.push("new-report");
    },

    /* Method to select all data from checkbox */

    select() {
      this.selected = [] as Array<string>;
      this.itemArray = this.payrollArray;
      if (!this.selectAll) {
        for (let i in this.itemArray) {
          var aaa = JSON.parse(JSON.stringify(this.itemArray[i]._id));
          this.selected.push(aaa);
        }
      }
    },
  },
});
</script>

<style scoped>
/* Import the style newReport */
@import "../css/payroll.css";
</style>
