<template>
  <div v-if="item">
    <table>
      <tr>
        <td>
          Product ID
          {{item.product_id}}
        </td>
        <td>
          Amount
          {{item.amount}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue'
import { OrderItem, Product } from '@/types/types';
@Component({
  components: {
  },
})
export default class OrderItemView extends Vue {

  @Prop()
  public item!: OrderItem;

}
</script>
