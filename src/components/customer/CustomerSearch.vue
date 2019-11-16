<template>
<div>
         <AutoComplete
        :displayText="$t('searchCustomer.label')"
        :searchFn="searchCustomers"
        @OptionSelected="customerChosen"
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
import { Customer } from '@/types/types.ts';
import AutoComplete from '../utils/AutoComplete.vue';
import CustomerView from '@/components/customer/CustomerView.vue';
import { Component, Prop } from 'vue-property-decorator';
import customers from '@/store/modules/customers';
import { setTimeout } from 'timers';

@Component({
  components: {
      AutoComplete,
  },
})
export default class SearchCustomer extends Vue {
   /**
   * Contacts backend using customers service and get autocompletion suggestions
   */
  public searchCustomers(name: string) {
    return customers.service.search({ term: name });
  }


  public customerChosen(item: Customer) {
      // Move to page
      this.$router.push('/customers/edit/' + item.id);
  }
}
</script>