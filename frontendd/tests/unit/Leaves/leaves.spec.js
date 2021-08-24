//import Vuex from "vuex"
import { shallowMount,mount } from '@vue/test-utils'
import LeavesComponent from '../../../src/modules/HR/Leaves/Views/Leaves.vue'
import LeaveRequest from "../../../src/modules/HR/Leaves/Components/LeaveRequest.vue";
import LeaveCalendar from "../../../src/modules/HR/Leaves/Components/LeavesCalendar.vue";
import { store } from "../../../src/modules/HR/Leaves/Store/index";
  
  describe("test leaves service",  () => {
    it("get the data from db", async () => {
      const wrapper = mount(LeavesComponent,{
        global: {
            plugins: [store]
          }}
      )
      expect(wrapper.find(".inline").text()).toBe("Upcoming Leave:")
    })
  })

describe('Leaves.vue Test', () => {
  it('check the leaves component is rendered or not', () => {
    const wrapper = shallowMount(LeavesComponent, {
        global: {
            plugins: [store]
          }
    })
    expect(wrapper.vm.$options.name).toMatch('Leaves')

  })
  it('Check the intial month and year', () => {
    const wrapper = shallowMount(LeavesComponent, {
        global: {
            plugins: [store]
          }
    })
    expect(wrapper.vm.current_month).toEqual(7)
  expect(wrapper.vm.current_year).toEqual(2021)

  })
 
  it('Check initial state of leaverequest component', () => {
    const wrapper = mount(LeavesComponent, {
        global: {
            plugins: [store]
          }
    })
    expect(wrapper.findComponent(LeaveRequest).exists()).toBe(false);
  })
  it('emits a custom event when the Clear Weather Data button is clicked', async () => {
    const wrapper = mount(LeavesComponent, {
        global: {
            plugins: [store]
          }
    })
    await wrapper.find('#request').trigger('click')
    expect(wrapper.vm.store.state.show_request).toBe(true)
    expect(wrapper.findComponent(LeaveRequest).exists()).toBe(true);
  })

})
describe('Leave calendar test', () => {
    it('renders message when component is created', () => {
      const wrapper = shallowMount(LeaveCalendar, {
          global: {
              plugins: [store]
            }
      })
      expect(wrapper.vm.$options.name).toMatch('LeavesCalendar')
    })
    it('opens sidebar on click', async () => {
      const wrapper = mount(LeaveCalendar, {
          props: {
              currentMonth: 7,
          currentYear:2021
            },
          global: {
              plugins: [store]
            }
      })
  
      await wrapper.find(".fa-plus-circle").trigger("mouseover");
      expect(wrapper.find('.fa-plus-circle').isVisible()).toBe(true);
      await wrapper.find(".fa-plus-circle").trigger("click");
      expect(wrapper.find('#calendar').exists()).toBe(true)
      expect(wrapper.findAll('td').length).toEqual(42)
    
    })
  
  
  })