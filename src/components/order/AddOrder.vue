<template>
  <div class="container">
    <div v-if="this.showNotification" class="notification is-primary">{{$t('orderCreated.label')}}</div>
    <form>
      <OrderView :currentOrder="this.currentOrder">
        <input class="button is-black" value="Send" type="submit" v-on:click.prevent="onSubmit" />
      </OrderView>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Order } from '@/types/types.ts';
import OrderView from '@/components/order/OrderView.vue';
import { Component, Prop } from 'vue-property-decorator';
import orders from '@/store/modules/orders';
import { setTimeout } from 'timers';

@Component({
  components: {
    OrderView,
  },
})
export default class AddOrder extends Vue {
  private currentOrder: Order = orders.service.getEmpty();
  private showNotification = false;

  public async onSubmit() {
    const response = await orders.service.create(this.currentOrder);

    // If status is 201, which stands for content created we show a notification
    if (response.status == 201) {
      this.showNotification = true;
      console.log(response.data.data);
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
    "orderCreated": {
      "label": "Auftrag erstellt"
    }
  },
  "en": {
    "orderCreated": {
      "label": "Order created"
    }
  }
}
</i18n>
