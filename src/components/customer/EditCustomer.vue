<template>
  <div class="container">
    <div v-if="this.showNotification" class="notification is-primary">{{$t('customerUpdated.label')}}</div>
    <form v-if="this.currentCustomer">
      <CustomerView :currentCustomer="this.currentCustomer">
        <input class="button is-black" value="Send" type="submit" v-on:click.prevent="onSubmit">
      </CustomerView>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Customer } from '@/types/types.ts';
import { CustomerService } from '@/services/customerService.ts';
import CustomerView from '@/components/customer/CustomerView.vue';
import { Component, Prop } from 'vue-property-decorator';
import customers from '@/store/modules/customers';

@Component({
  components: {
    CustomerView,
  },
})
export default class EditCustomer extends Vue {
  // The ! is used to tell typescript, we will provide a value for id and don't need to check for initialization checks for id
  @Prop()
  private id!: number;
  // Union types allows the currentCustomer to be a Customer or a null and nothing else.
  // See https://mariusschulz.com/blog/typescript-2-0-non-nullable-types#modeling-nullability-with-union-types
  private currentCustomer: Customer | null = null;
  // When set to True, shows the notification
  private showNotification = false;

  // We still need the v-if because even though created() is called by Vue synchronously, the function called inside created()
  // is asynchronous and can be finished after mounted() and can cause rendering warnings.
  // https://stackoverflow.com/questions/49577394/which-vuejs-lifecycle-hook-must-asynchronous-http-requests-be-called-in
  public async created() {
    const response = await customers.service.getCustomer(this.id);
    this.currentCustomer = response.data.customer;
  }

  public async onSubmit() {
    // Typescript allows property access of nullable types based on conditions.
    // See https://mariusschulz.com/blog/typescript-2-0-non-nullable-types#property-access-with-nullable-types
    if (this.currentCustomer) {
      const response = await customers.service.updateCustomer(
        this.id,
        this.currentCustomer,
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
    "customerUpdated": {
      "label": "Produkt aktualisiert"
    }
  },
  "en": {
    "customerUpdated": {
      "label": "Customer updated"
    }
  }
}
</i18n>
