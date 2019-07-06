import 'jest';
import { mount } from '@vue/test-utils';
import AddProduct from '@/components/product/AddProduct.vue';
import { Product } from '@/types/types';
import products from '@/store/modules/products';
import { doesNotReject } from 'assert';

// We mock the whole store/modules/products module, with jest.
jest.mock('@/store/modules/products', () => ({
  service: {
    // jest.fn creates mock function which replaces actually implementation of function.
    // It captures all calls to function with arguments and more.
    createProduct: jest.fn(() => async (p: Product) => {
      return {}
    }),
    getEmpty: () => {
      return {};
    },
  },
}));

describe('AddProduct.vue', () => {
  test('Checks if the product is sent correctly when clicking submit button', async () => {
    // mount, mounts the component AddProduct in isolation and returns a wrapper with helper functions.
    const wrapper = mount(AddProduct, {
      mocks: {
        // Here we pass a mock for global function $t. $t is the translation function from vue-i18n
        $t: () => { },
      },
    });
    // Finds the element with id productName
    const inputV = wrapper.find('#productName');
    // We manually set the value of input field to testNamer
    inputV.setValue('testNamer');
    // And we trigger a click event to check if required functions are getting called.
    wrapper.find('[type=\'submit\']').trigger('click');

    // We need to cast to HTMLInputElement, because Typescript by default provides a generic HTMLElement,
    // which lacks some function from an input field.
    const t = inputV.element as HTMLInputElement;
    // Check if the value we set before clicking submit is sent to createProduct function.
    expect(products.service.createProduct).toBeCalledWith({ name: 'testNamer' });
  });

  test('Check if product created notification displayed when showNotification is true', async () => {
    // mount, mounts the component AddProduct in isolation and returns a wrapper with helper functions.
    const wrapper = mount(AddProduct, {
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
    expect(t.isVisible()).toBe(true
  })
});
