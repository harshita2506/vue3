import { MutationTree } from 'vuex'
import { State } from '../Modals/State'
import { Mutations } from '../Modals/Mutations'
import {MutationTypes} from '../Modals/MutationTypes'

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.openShowRequest](state, is_show) {
      state.show_request=is_show
    },
    [MutationTypes.addLeaveRequest](state, item){
      state.leave_status=[...item]
    },
    [MutationTypes.updateLeaveRequests](state, item) {
      state.leave_status.push(item);
    }
  
  }