<script lang="ts">
import { ref, reactive, computed } from "vue";
import {LeaveStatus} from "../Service/getLeaveStatus";
import leaveStatus from "../Service/LeaveStatus.json"
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { monthDay } from "../Modals/MonthDays";
import { leavestatus } from "../Modals/LeaveStatus";
export default defineComponent({
    name:'LeavesCalendar',
  props: {
    currentMonth: {
      type: Number,
    },
    currentYear: {
      type: Number,
    },
  },
  // Watches changes in current month and current year
  watch: {
    currentMonth: "getCurrentMonth",
    currentYear: "getCurrentYear",
  },
  components: {},
  setup(props) {
    const store = useStore();
    const status=leaveStatus;
    var current_date = ref("");
    // Gets the leave statuses of an employee
    (async () => {
      let leave_status_instance=LeaveStatus.getLeavesInstance();
      store.commit("addLeaveRequest", await leave_status_instance.getLeaveStatus()); 
      console.log("store is", store.state.leave_status);
    })();
    // days array
    const week_days = [
      "Monday",
      "Tuesday",
      "Wednusday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    var month_days: monthDay[] = reactive([]);
    // style objects for calendar grids 
    var default_style = reactive({
      height: "100px",
      width: "100px",
      color: "black",
      backgroundColor: "",
    });
    var style_obj3 = ref({
      height: "100px",
      width: "100px",
      color: "black",
      backgroundColor: "#ebedeb",
    });
    var style_obj = ref({
      height: "100px",
      width: "100px",
      color: "#2e8b57",
      backgroundColor: "rgb(0,255,0,0.2)",
    });
    var style_obj2 = ref({
      height: "100px",
      width: "100px",
      color: "#800000",
      backgroundColor: "rgba(255, 0, 0, 0.1)",
    });
    var current_month = ref(0);
    var current_year = ref(0);
// computed property to get month days 
    const getArrayOfDays = computed(() => {
      if (JSON.stringify(store.state.leave_status)) {
        let events: leavestatus[] = JSON.parse(
          JSON.stringify(store.state.leave_status)
        );
        console.log("eajdflalsf", events);
        return filterEvents(events);
      } else return getDatesPerMonth();
    });
    function getDatesPerMonth() {
      month_days = [];
      current_month.value = props.currentMonth?props.currentMonth:0;
      current_year.value = props.currentYear?props.currentYear:0;
      let day_iterator = 1;
      let next_day_iterator = 1;
      let month_start_day = new Date(
        current_year.value,
        current_month.value,
        1
      ).getDay();
      let month_end_day = new Date(
        current_year.value,
        current_month.value + 1,
        0
      ).getDate();
      let last_month_end_day = new Date(
        current_year.value,
        current_month.value,
        0
      ).getDate();
      for (let i = 0; i < 42; i++) {
        if (i < month_start_day - 1) {
          let today = last_month_end_day - i;
          let full_date = `${current_year.value}-${current_month.value}-${today}`;
          var obj = {
            day: today,
            event: "",
            date: full_date,
            style: default_style,
          };
          month_days.unshift(obj);
        } else {
          if (day_iterator <= month_end_day) {
            let full_date = `${current_year.value}-${current_month.value +
              1}-${day_iterator}`;
            var obj2 = {
              day: day_iterator,
              event: "",
              date: full_date,
              style: default_style,
            };
            month_days.push(obj2);
            day_iterator++;
          } else {
            let full_date = `${current_year.value}-${current_month.value +
              2}-${next_day_iterator}`;
            var obj3 = {
              day: next_day_iterator,
              event: "",
              date: full_date,
              style: default_style,
            };
            month_days.push(obj3);
            next_day_iterator++;
          }
        }
      }
      return month_days;
    }
    // filter the days based on the leave status
    function filterEvents(events: leavestatus[]) {
      let dates = getDatesPerMonth();
      events.forEach((item1) => {
        dates.forEach((item) => {
          if (
            new Date(new Date(item.date).toDateString()).getTime() ==
            new Date(new Date(item1.start_date).toDateString()).getTime()
          ) {
            item.event = item1.status;
            item.event == leaveStatus.failure_key
              ? (item.style = style_obj2.value)
              : item.event == leaveStatus.success_key
              ? (item.style = style_obj.value)
              : item.event == leaveStatus.pending_key
              ? (item.style = style_obj3.value)
              : "";

            return;
          }
        });
      });
      return dates;
    }
    return {
      filterEvents,
      default_style,
      store,
      status,
      style_obj3,
      style_obj,
      style_obj2,
      current_date,
      current_month,
      current_year,
      getArrayOfDays,
      month_days,
      week_days,
    };
  },
  methods: {},
});
</script>

<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <button
            type="button"
            class="btn-close float-end"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div class="mt-5 p-1">
            <h5 class="text-start">
              <em class="fas fa-info-circle"></em> Are you sure about cancelling
              your vacation?
            </h5>

            <div class="mt-3">
              <p><small class="text-start">Reason</small></p>
              <input class="" type="text" placeholder="Reason" />
            </div>
            <div class="mt-5 float-end">
              <button type="button" class="btn btn-sm btn-dark">
                CancelVacation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="tableClass">
    <table
      class="table table-borderless table-responsive-sm"
      height="50px"
      id="calendar"
    >
    <caption></caption>
      <thead>
        <tr class="shadow-lg bg-body rounded trchanger">
          <th
            class="col-lg-1 p-2 fs-6 m-3 border border-5"
            v-for="item in week_days" id="employeeleave"
            :key="item"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody id="calendar-body" class="bg-body rounded mt-10">
        <tr v-for="item1 in week_days.length" :key="item1">
          <td
            v-for="item2 in getArrayOfDays.slice((item1 - 1) * 7, item1 * 7)"
            :key="item2"
            :style="item2.style ? item2.style : default_style"
            class="col-lg-1 p-2 fs-6 m-3 border border-5"
          >
            {{ item2.day }}
            <p class="text-center mt-3">
              <em
                @click="store.commit('openShowRequest', true)"
                v-if="!item2.event"
                class="fas fa-plus-circle"
              ></em>
            </p>
            <p class="p-0 mt-5">
              <em
                v-if="item2.event === 'Accepted'"
                class="fas fa-check-circle"
              ></em>
              {{ item2.event }}
              <em
                @click="store.commit('openShowRequest', true)"
                v-if="item2.event === 'Pending'"
                class="fas fa-edit p-2"
              ></em>
              <em
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                v-if="item2.event === 'Pending'"
                class="far fa-trash-alt "
              ></em>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "../css/LeavesCalendar.css";
</style>

