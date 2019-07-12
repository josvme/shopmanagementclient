<template>
  <div>
    <div class="field">
      <div class="control">
        <label class="label" for="customerName">{{ $t('customerName.label') }}</label>
        <!-- We bind currentCustomer.name to this input field -->
        <input class="input" id="customerName" type="text" v-model="currentCustomer.name" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label for="customerPincode" class="label">{{ $t('customerPincode.label') }}</label>
        <input class="input" id="customerPincode" type="text" v-model="currentCustomer.pincode" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label" for="customerPhone">{{ $t('customerPhone.label') }}</label>
        <input class="input" id="customerPhone" type="text" v-model="currentCustomer.phone" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Customer } from '@/types/types.ts';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {},
})
export default class CustomerView extends Vue {
  // Prop are data values that are passed from parent component to child component.
  @Prop()
  public currentCustomer!: Customer;
}
</script>

<style lang='sass' scoped>
</style>

<i18n>
{
  "de": {
      "customerName": {
        "label": "Kunde Name"
      },
      "customerPincode": {
        "label": "Kunde postleitzahl"
      },
      "customerPhone": {
        "label": "Kunde Stock"
      }
  },
  "en": {
      "customerName": {
        "label": "Customer Name"
      },
      "customerPincode": {
        "label": "Customer Pincode"
      },
      "customerPhone": {
        "label": "Customer Phone"
      }
  }
}
</i18n>