import NewReport from '../../../src/modules/HR/Payroll/views/NewReport.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper: any;
describe("NewReport.vue", () => {
    beforeEach(() => {
        wrapper = shallowMount(NewReport, {
        })
    })

    // check existence of component render
    it("render", () => {
        expect(wrapper.exists()).toBe(true);
    })
})

describe("test h3 text", () => {
    // see if the message renders
    it("renders a h3 and responds correctly to user input", () => {
        expect(wrapper.find("h3").text()).toBe("Payroll Reports");
    })
})

describe("NewReport Report", () => {
    // check the name of the component
    it("name of the component", () => {
        expect(wrapper.vm.$options.name).toMatch('PayrollReport')

    })
})

describe("NewReport Report", () => {
    // Trigger the test cases on click
    it('render text', async () => {
        const wrapper = shallowMount(NewReport)
        await wrapper.trigger('click')
    })

    //  to check for the existence of elements on mouseover
    it("mouseover", () => {
        const wrapper = shallowMount(NewReport)
        wrapper.find('button').trigger('mouseover')
    })

})

describe("Method", () => {
    it('get Method', () => {
        const wrapper = shallowMount(NewReport, {
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

describe("NewReport.vue", () => {
    it('find component name', () => {
        // check component existence
        const wrapper = shallowMount(NewReport)
        expect(wrapper.findComponent(NewReport).exists()).toBe(true)
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
//     var wrapper = await shallowMount(NewReport);
//     wrapper.vm.$nextTick(() => {
//       expect(wrapper.vm.data.length).toBe(1);
//     });
//   });
// })
