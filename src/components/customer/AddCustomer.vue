<template>
  <div class="container">
    <div v-if="this.showNotification" class="notification is-primary">{{$t('customerCreated.label')}}</div>
    <form>
      <CustomerView :currentCustomer="this.currentCustomer">
        <input class="button is-black" value="Send" type="submit" v-on:click.prevent="onSubmit" />
      </CustomerView>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Customer } from '@/types/types.ts';
import CustomerView from '@/components/customer/CustomerView.vue';
import { Component, Prop } from 'vue-property-decorator';
import customers from '@/store/modules/customers';
import { setTimeout } from 'timers';

@Component({
  components: {
    CustomerView,
  },
})
export default class AddCustomer extends Vue {
  private currentCustomer: Customer = customers.service.getEmpty();
  private showNotification = false;

  public async onSubmit() {
    const response = await customers.service.create(this.currentCustomer);

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
    "customerCreated": {
      "label": "Kunde erstellt"
    }
  },
  "en": {
    "customerCreated": {
      "label": "Customer created"
    }
  }
}
</i18n>
