<template>
  <div class="container">
    <li v-for="order in this.ordersList" v-bind:key="order.id">
      <OrderView :currentOrder="order"/>
    </li>
  </div>
</template>

<script lang='ts'>
import { Order, getEmptyOrder } from '@/types/types';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import orders from '@/store/modules/orders';
import OrderView from '@/components/order/OrderView.vue';

@Component({
  components: {
    OrderView,
  },
})
export default class OrderList extends Vue {
  public created() {
    orders.fetchOrders();
  }

  get ordersList(): Order[] {
    return orders.allOrders;
  }
}
</script>

<style lang='sass' scoped>

</style>
