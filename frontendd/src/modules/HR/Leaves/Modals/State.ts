import { leavestatus } from './LeaveStatus'
// import { leaves } from './Leaves'
// define your typings for the store state
export interface State {
  leave_status: Array<leavestatus>
  show_request:Boolean
  // employee_leaves:Array<leaves>
}