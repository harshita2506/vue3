import { leavestatus } from '../Modals/LeaveStatus'
import { State } from '../Modals/State'
import {MutationTypes} from './MutationTypes'
  export type Mutations<S = State> = {
    [MutationTypes.openShowRequest](state: S, is_show: boolean): void
    [MutationTypes.addLeaveRequest](state: S, item:Array<leavestatus>): void
    [MutationTypes.updateLeaveRequests](state: S, item:leavestatus): void
  }