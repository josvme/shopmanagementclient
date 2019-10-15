import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Order } from '@/types/types';
import { OrderService } from '@/services/orderService';

/**
 * When namespaced is set to true, contents of the module is automatically namedspaced based on name.
 * Vuex allows adding modules to store dynamically after store is created, we set it to true.
 * store is the Vuex store to which we need to insert our module.
 */
@Module({
    namespaced: true,
    name: 'orders',
    store,
    dynamic: true,
})

class OrderModule extends VuexModule {
    /**
     * Class variables automatically become part of the state.
     * Our module thus will have orders/allOrders and orders/service as state variables.
     * The reason we put service inside Vuex is because in this case there will be only one OrderService
     * which can be shared between all components.
     */
    public allOrders: Order[] = [];
    public service: OrderService = new OrderService('http://localhost/api/v1/', 'orders', 'order');

    // Action automatically calls setOrders function with arguments returned by fetchOrders function.
    @Action({ commit: 'setOrders' })
    public async fetchOrders() {
        // Calls into service to get all orders
        const t = await this.service.getAllRequest();
        return t.data.data;
    }

    // modifies our module state, by setting allOrders to p.
    @Mutation
    public setOrders(p: Order[]) {
        this.allOrders = p;
    }
}

// Export our module so our components can use it.
export default getModule(OrderModule);
