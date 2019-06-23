<template>
  <div>
    <li v-for="product in this.productsList" v-bind:key="product.id">
      <ProductView :currentProduct="product"/>
    </li>
  </div>
</template>

<script lang='ts'>
import { Product, getEmptyProduct } from '@/types/types';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import products from '@/store/modules/products';
import ProductView from '@/components/product/ProductView.vue';

@Component({
  components: {
    ProductView,
  },
})
export default class ProductList extends Vue {
  public created() {
    products.fetchProducts();
  }

  get productsList(): Product[] {
    return products.allProducts;
  }
}
</script>

<style lang='sass' scoped>

</style>
