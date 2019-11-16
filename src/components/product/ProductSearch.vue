<template>
<div>
         <AutoComplete
        :displayText="$t('searchProduct.label')"
        :searchFn="searchProducts"
        @OptionSelected="productChosen"
      >
      <!--
        Here with v-slot:itemView, we say we need to fill the slot named itemView.
        With "{item}", we use ES2015 destructing to get item value passed to 
        slot. This is because, vue internally wraps contents of a scoped slot into  
        a single argument function with slot props as the argument.
        See https://vuejs.org/v2/guide/components-slots.html#Destructuring-Slot-Props
      -->
      <template v-slot:itemView="{item}">
        {{item.name}}
        {{item.phone}}
      </template>
      </AutoComplete>
      </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Product } from '@/types/types.ts';
import AutoComplete from '../utils/AutoComplete.vue';
import ProductView from '@/components/product/ProductView.vue';
import { Component, Prop } from 'vue-property-decorator';
import products from '@/store/modules/products';
import { setTimeout } from 'timers';

@Component({
  components: {
      AutoComplete,
  },
})
export default class SearchProduct extends Vue {
   /**
   * Contacts backend using products service and get autocompletion suggestions
   */
  public searchProducts(name: string) {
    return products.service.search({ term: name });
  }


  public productChosen(item: Product) {
      // Move to page
      this.$router.push('/products/edit/' + item.id);
  }
}
</script>