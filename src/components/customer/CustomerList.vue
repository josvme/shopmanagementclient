<template>
  <div>
    <li v-for="customer in this.customersList" v-bind:key="customer.id">
      <CustomerView :currentCustomer="customer"/>
    </li>
  </div>
</template>

<script lang='ts'>
import { Customer, getEmptyCustomer } from '@/types/types';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import customers from '@/store/modules/customers';
import CustomerView from '@/components/customer/CustomerView.vue';

@Component({
  components: {
    CustomerView,
  },
})
export default class CustomerList extends Vue {
  public created() {
    customers.fetchCustomers();
  }

  get customersList(): Customer[] {
    return customers.allCustomers;
  }
}
</script>

<style lang='sass' scoped>

</style>
