import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { State } from '../Modals/State'
import {mutations} from './Mutations'
import { getters } from './Getters'
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
    leave_status: [],
    show_request:false,
  },
  mutations: mutations,
      getters:getters
})