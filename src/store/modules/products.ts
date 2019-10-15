import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Product } from '@/types/types';
import { ProductService } from '@/services/productService';

/**
 * When namespaced is set to true, contents of the module is automatically namedspaced based on name.
 * Vuex allows adding modules to store dynamically after store is created, we set it to true.
 * store is the Vuex store to which we need to insert our module.
 */
@Module({
    namespaced: true,
    name: 'products',
    store,
    dynamic: true,
})

class ProductModule extends VuexModule {
    /**
     * Class variables automatically become part of the state.
     * Our module thus will have products/allProducts and products/service as state variables.
     * The reason we put service inside Vuex is because in this case there will be only one ProductService
     * which can be shared between all components.
     */
    public allProducts: Product[] = [];
    public service: ProductService = new ProductService('http://localhost/api/v1/', 'products', 'product');

    // Action automatically calls setProducts function with arguments returned by fetchProducts function.
    @Action({ commit: 'setProducts' })
    public async fetchProducts() {
        // Calls into service to get all products
        const t = await this.service.getAllRequest();
        return t.data.data;
    }

    // modifies our module state, by setting allProducts to p.
    @Mutation
    public setProducts(p: Product[]) {
        this.allProducts = p;
    }
}

// Export our module so our components can use it.
export default getModule(ProductModule);
