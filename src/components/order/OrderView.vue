<template>
  <div>
    <div class="field">
      <div class="control">
        <label for="orderMessage" class="label">{{ $t('orderMessage.label') }}</label>
        <input class="input" id="orderMessage" type="text" v-model="currentOrder.message" />
      </div>
    </div>

    <div>
      <!--
        We loop through all order items and add a + and - button.
        We also bind it to plusClicked and minusClicked functions respectively.
        We also add a button to delete the product
        We use font-awesome icons for + and - signs and align it in a row.
      -->
      <table>
        <tr v-for="item in currentOrder.order_items" :key="item.product_id">
          <td>
            <OrderItemView :item="item"></OrderItemView>
          </td>
          <td v-if="showAmountChanger" @click="plusClicked(item)">
            <i class="fas fa-plus"></i>
          </td>
          <td v-if="showAmountChanger">&nbsp;&nbsp;</td>
          <td v-if="showAmountChanger" @click="minusClicked(item)">
            <i class="fas fa-minus"></i>
          </td>
          <td v-if="showAmountChanger">&nbsp;&nbsp;</td>
          <td v-if="showAmountChanger" @click="deleteClicked(item)">
            <i class="fas fa-times"></i>
          </td>
        </tr>
      </table>
    </div>

    <!--
      Slot enable to replace <slot></slot> with a component.
      -->
    <div class="field">
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Order, OrderItem } from '@/types/types.ts';
import { Component, Prop, Provide } from 'vue-property-decorator';
import OrderItemView from '../orderitem/OrderItemView.vue';

@Component({
  components: {
    OrderItemView
  },
})
export default class OrderView extends Vue {
  @Prop()
  public currentOrder!: Order;

  @Prop({ default: false })
  public showAmountChanger!: boolean;

 /**
 * We signal a plus clicked or minus clicked with 
 * AmountIncremented and AmountDecremented events respectively. 
 */
  public plusClicked(item: OrderItem) {
    this.$emit('AmountIncremented', item);
  }

  public minusClicked(item: OrderItem) {
    this.$emit('AmountDecremented', item);
  }

  public deleteClicked(item: OrderItem) {
    this.$emit('OrderItemRemoved', item);
  }
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
