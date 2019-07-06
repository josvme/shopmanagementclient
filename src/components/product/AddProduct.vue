<template>
  <div class="container">
    <div v-if="this.showNotification" class="notification is-primary">{{$t('productCreated.label')}}</div>
    <form>
      <ProductView :currentProduct="this.currentProduct">
        <input class="button is-black" value="Send" type="submit" v-on:click.prevent="onSubmit" />
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
import { setTimeout } from 'timers';

@Component({
  components: {
    ProductView,
  },
})
export default class AddProduct extends Vue {
  private currentProduct: Product = products.service.getEmpty();
  private showNotification = false;

  public async onSubmit() {
    const response = await products.service.createProduct(this.currentProduct);

    // If status is 201, which stands for content created we show a notification
    if (response.status == 201) {
      this.showNotification = true;
      // Hide notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}
</script>

<i18n>
{
  "de": {
    "productCreated": {
      "label": "Produkt erstellt"
    }
  },
  "en": {
    "productCreated": {
      "label": "Product created"
    }
  }
}
</i18n>
