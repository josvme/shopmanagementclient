<template>
  <div class="container">
    <div v-if="this.showNotification" class="notification is-primary">{{$t('productUpdated.label')}}</div>
    <form v-if="this.currentProduct">
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
export default class EditProduct extends Vue {
  // The ! is used to tell typescript, we will provide a value for id and don't need to check for initialization checks for id
  @Prop()
  private id!: number;
  // Union types allows the currentProduct to be a Product or a null and nothing else.
  // See https://mariusschulz.com/blog/typescript-2-0-non-nullable-types#modeling-nullability-with-union-types
  private currentProduct: Product | null = null;
  // When set to True, shows the notification
  private showNotification = false;

  // We still need the v-if because even though created() is called by Vue synchronously, the function called inside created()
  // is asynchronous and can be finished after mounted() and can cause rendering warnings.
  // https://stackoverflow.com/questions/49577394/which-vuejs-lifecycle-hook-must-asynchronous-http-requests-be-called-in
  public async created() {
    const response = await products.service.get(this.id);
    this.currentProduct = response.data.data;
  }

  public async onSubmit() {
    // Typescript allows property access of nullable types based on conditions.
    // See https://mariusschulz.com/blog/typescript-2-0-non-nullable-types#property-access-with-nullable-types
    if (this.currentProduct) {
      const response = await products.service.update(
        this.id,
        this.currentProduct,
      );
    // If successful show our notification
      if (response.status == 200) {
      this.showNotification = true;
      // Hide notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
    }
  }
}
</script>

<style lang='sass' scoped>

</style>

<i18n>
{
  "de": {
    "productUpdated": {
      "label": "Produkt aktualisiert"
    }
  },
  "en": {
    "productUpdated": {
      "label": "Product updated"
    }
  }
}
</i18n>
