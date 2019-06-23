<template>
  <div class="container">
    <form>
      <ProductView :currentProduct="this.currentProduct">
        <input class="button is-black" value="Send" type="submit" v-on:click.prevent="onSubmit">
      </ProductView>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Product } from '@/types/types.ts';
import ProductView from '@/components/product/ProductView.vue';
import { Component, Prop } from 'vue-property-decorator';
import products from '@/store/modules/products';

@Component({
  components: {
    ProductView,
  },
})
export default class AddProduct extends Vue {
  private currentProduct: Product = products.service.getEmpty();

  public async onSubmit() {
    const response = await products.service.createProduct(this.currentProduct);
  }
}
</script>