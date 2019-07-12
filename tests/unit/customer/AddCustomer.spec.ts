import 'jest';
import { mount } from '@vue/test-utils';
import AddCustomer from '@/components/customer/AddCustomer.vue';
import { Customer } from '@/types/types';
import customers from '@/store/modules/customers';
import { doesNotReject } from 'assert';

// We mock the whole store/modules/customers module, with jest.
jest.mock('@/store/modules/customers', () => ({
  service: {
    // jest.fn creates mock function which replaces actually implementation of function.
    // It captures all calls to function with arguments and more.
    createCustomer: jest.fn(() => async (p: Customer) => {
      return {}
    }),
    getEmpty: () => {
      return {};
    },
  },
}));

describe('AddCustomer.vue', () => {
  test('Checks if the customer is sent correctly when clicking submit button', async () => {
    // mount, mounts the component AddCustomer in isolation and returns a wrapper with helper functions.
    const wrapper = mount(AddCustomer, {
      mocks: {
        // Here we pass a mock for global function $t. $t is the translation function from vue-i18n
        $t: () => { },
      },
    });
    // Finds the element with id customerName
    const inputV = wrapper.find('#customerName');
    // We manually set the value of input field to testNamer
    inputV.setValue('testNamer');
    // And we trigger a click event to check if required functions are getting called.
    wrapper.find('[type=\'submit\']').trigger('click');

    // We need to cast to HTMLInputElement, because Typescript by default provides a generic HTMLElement,
    // which lacks some function from an input field.
    const t = inputV.element as HTMLInputElement;
    // Check if the value we set before clicking submit is sent to createCustomer function.
    expect(customers.service.createCustomer).toBeCalledWith({ name: 'testNamer' });
  });

  test('Check if customer created notification displayed when showNotification is true', async () => {
    // mount, mounts the component AddCustomer in isolation and returns a wrapper with helper functions.
    const wrapper = mount(AddCustomer, {
      mocks: {
        // Here we pass a mock for global function $t. $t is the translation function from vue-i18n
        $t: () => { }
      },
    });
    // We set showNotification to true and wait for Vue to update DOM by waiting for vm.nextTick
    wrapper.vm.$data.showNotification = true;
    await wrapper.vm.$nextTick();
    // Search for element with class=notification
    const t = wrapper.find('.notification');
    // Assert the element is visible.
    expect(t.isVisible()).toBe(true)
  })
});
