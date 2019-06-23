<template>
  <div>
    <div class="field">
      <div class="control">
        <label class="label" for="productName">{{ $t('productName.label') }}</label>
        <!-- We bind currentProduct.name to this input field -->
        <input
          class="input"
          id="productName"
          type="text"
          v-model="currentProduct.name"
        >
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label for="productPrice" class="label">{{ $t('productPrice.label') }}</label>
        <input
          class="input"
          id="productPrice"
          type="text"
          v-model="currentProduct.price"
        >
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label" for="productStock">{{ $t('productStock.label') }}</label>
        <input
          class="input"
          id="productStock"
          type="text"
          v-model="currentProduct.stock"
        >
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label" for="productTax">{{ $t('productTax.label') }}</label>
        <input
          class="input"
          id="productTax"
          type="text"
          v-model="currentProduct.tax"
        >
      </div>
    </div>

    <div class="field">
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Product} from '@/types/types.ts';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {},
})
export default class ProductView extends Vue {
  // Prop are data values that are passed from parent component to child component.
  @Prop()
  public currentProduct!: Product;
}
</script>

<style lang='sass' scoped>
</style>

<i18n>
{
  "de": {
      "productName": {
        "label": "Produkt Name"
      },
      "productPrice": {
        "label": "Produkt Preis"
      },
      "productStock": {
        "label": "Produkt Stock"
      },
      "productDetail": {
        "label": "Produkt Detail"
      },
      "productTax": {
        "label": "Produkt Steuer"
      }
  },
  "en": {
      "productName": {
        "label": "Product Name"
      },
      "productPrice": {
        "label": "Product Price"
      },
      "productStock": {
        "label": "Product Stock"
      },
      "productDetail": {
        "label": "Product Detail"
      },
      "productTax": {
        "label": "Product Tax"
      }
  }
}
</i18n>