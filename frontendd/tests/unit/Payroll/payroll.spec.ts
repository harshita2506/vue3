import Payroll from '../../../src/modules/HR/Payroll/views/Payroll.vue';
import { shallowMount } from '@vue/test-utils';
import axios from 'axios'

let wrapper: any;
describe("payroll.vue", () => {
  beforeEach(() => {
    wrapper = shallowMount(Payroll, {
    })
  })
  // check existence of component render
  it("render", () => {
    expect(wrapper.exists()).toBe(true);
  })
})

describe("test h3 text", () => {
  // see if the message renders
  it("renders a h3 text", () => {
    expect(wrapper.find("h3").text()).toBe("Payroll Reports");
  })
})

describe("Payroll Report", () => {
  // check the name of the component
  it("name of the component", () => {
    expect(wrapper.vm.$options.name).toMatch('Payroll')
  })
})


describe("Payroll Report", () => {
  // Trigger the test cases
  it('render text', async () => {
    const wrapper = shallowMount(Payroll)
    await wrapper.trigger('click')
    expect(wrapper.find('button').text()).toBe('EXCEL')
  })

  describe("mouseover on button", () => {
    //  to check for the existence of elements on mouseover
    it("mouseover", () => {
      const wrapper = shallowMount(Payroll)
      wrapper.find('button').trigger('mouseover')
      expect(wrapper.find('i').isVisible()).toBe(true);
    })
  })
})

describe("Find Component", () => {
  it('check component', () => {
    // check component
    const wrapper = shallowMount(Payroll)
    expect(wrapper.findComponent(Payroll).exists()).toBe(true)
  })
})

describe("Method", () => {
  it('get Method', () => {
    const wrapper = shallowMount(Payroll, {
      global: {
        mocks: {
          axios: {
            // get: Promise.resolve({ data: { 'http://localhost:3000/api/reportList': true }})
  
            // OR use an async function, which internally returns a Promise
            get: async () => ({ data: { 'http://localhost:3000/api/reportList': true } })
          }
        }
      }
    })
  })
})

// jest.mock("axios", () => ({
//   get: () => Promise.resolve({
//     data:
//       [{ report_name: "Attendence", start_date: "02 Feb 2021", end_date: "10 Mar 2020" }]
//   })
// }));
// describe("Payroll.vue", () => {
//   it("mocking the axios call to get posts should work", async () => {
//     var wrapper = await shallowMount(Payroll);
//     wrapper.vm.$nextTick(() => {
//       expect(wrapper.vm.data.length).toBe(1);
//     });
//   });
// })
