<template>
  <div>
    <div class="field">
      <div class="control">
        <label for="orderMessage" class="label">{{ $t('orderMessage.label') }}</label>
        <input class="input" id="orderMessage" type="text" v-model="currentOrder.message" />
      </div>
    </div>

    <ul>
      <li v-for="item in currentOrder.order_items" :key="item.id">{{item}}</li>
    </ul>

    <div class="field">
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Order, Customer, getEmptyCustomer } from '@/types/types.ts';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {},
})
export default class OrderView extends Vue {
  // Prop are data values that are passed from parent component to child component.
  @Prop()
  public currentOrder!: Order;
}
</script>

<i18n>
{
  "de": {
    "orderMessage": {
      "label": "Nachricht bestellen"
    }
  },
  "en": {
    "orderMessage": {
      "label": "Order Message"
    }
  }
}
</i18n>

<style lang='sass' scoped>
</style>
