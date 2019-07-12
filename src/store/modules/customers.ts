import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Customer } from '@/types/types';
import { CustomerService} from '@/services/customerService';

/**
 * When namespaced is set to true, contents of the module is automatically namedspaced based on name.
 * Vuex allows adding modules to store dynamically after store is created, we set it to true.
 * store is the Vuex store to which we need to insert our module.
 */
@Module({
    namespaced: true,
    name: 'customers',
    store,
    dynamic: true,
})

class CustomerModule extends VuexModule {
    /**
     * Class variables automatically become part of the state.
     * Our module thus will have customers/allCustomers and customers/service as state variables.
     * The reason we put service inside Vuex is because in this case there will be only one CustomerService
     * which can be shared between all components.
     */
    public allCustomers: Customer[] = [];
    public service: CustomerService = new CustomerService('http://0.0.0.0:4000/api/v1/', 'customers');

    // Action automatically calls setCustomers function with arguments returned by fetchCustomers function.
    @Action({ commit: 'setCustomers' })
    public async fetchCustomers() {
        // Calls into service to get all customers
        const t = await this.service.getAllRequest();
        return t.data.customers;
    }

    // modifies our module state, by setting allCustomers to p.
    @Mutation
    public setCustomers(p: Customer[]) {
        this.allCustomers = p;
    }
}

// Export our module so our components can use it.
export default getModule(CustomerModule);
