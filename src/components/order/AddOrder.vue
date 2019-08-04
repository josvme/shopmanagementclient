<template>
  <div class="container">
    <div v-if="showNotification" class="notification is-primary">{{$t('orderCreated.label')}}</div>

    <div>
      <!--
        Here searchCustomers is a function which takes a string and returns a list of customer suggestions.
        optionSelected event is fired by Autocomplete, when an item from list is chosen.
      -->
      <AutoComplete
        :displayText="$t('searchCustomer.label')"
        :searchFn="searchCustomers"
        @OptionSelected="customerChosen"
      ></AutoComplete>
    </div>
    <!--
      Shows the currenly chosen customer
    -->
    <div>
      <CustomerView :currentCustomer="currentCustomer"></CustomerView>
    </div>

    <div v-if="customerDetailsComplete(this.currentCustomer)">
      <input
        class="button is-black"
        value="Continue to Orders"
        type="submit"
        v-on:click.prevent="moveToChooseOrderItems()"
      />
    </div>

    <div>
      <OrderView
        :currentOrder="this.currentOrder"
        @AmountIncremented="amountIncremented"
        @AmountDecremented="amountDecremented"
        @OrderItemRemoved="orderItemRemoved"
        :showAmountChanger="true"
      ></OrderView>
    </div>

    <div v-if="state == 'ChooseOrderItems'">
      <!--
        Here searchProducts is a function which takes a string and returns a list of product suggestions.
        optionSelected event is fired by Autocomplete, when an item from list is chosen.
      -->
      <AutoComplete
        :displayText="$t('searchItem.label')"
        :searchFn="searchProducts"
        @OptionSelected="productChosen"
      ></AutoComplete>
      <!--
        Shows the currently chosen product
      -->
      <div>
        <ProductView :currentProduct="currentProduct"></ProductView>
      </div>
    </div>

    <input class="button is-black" value="Send" type="submit" v-on:click.prevent="onSubmit" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Order, Product, Customer, getEmptyOrderItem, OrderItem } from '@/types/types.ts';
import OrderView from '@/components/order/OrderView.vue';
import { Component, Prop } from 'vue-property-decorator';
import orders from '@/store/modules/orders';
import products from '@/store/modules/products';
import AutoComplete from '../utils/AutoComplete.vue';
import customers from '@/store/modules/customers';
import CustomerView from '@/components/customer/CustomerView.vue';
import ProductView from '@/components/product/ProductView.vue';

// You can't define types inside the class
type OrderCreationStage = 'ChooseCustomer' | 'ChooseOrderItems' | 'OrderCreated'

@Component({
  components: {
    OrderView,
    AutoComplete,
    CustomerView,
    ProductView
  },
})
export default class AddOrder extends Vue {
  private currentOrder: Order = orders.service.getEmpty();
  private state: OrderCreationStage = "ChooseCustomer"
  private currentCustomer: Customer = customers.service.getEmpty();
  private currentProduct: Product = products.service.getEmpty();
  private showNotification = false;

  /**
   * Resets the form.
   * It is called after an order was successfully created.
   */
  public resetAddOrder() {
    this.currentOrder = orders.service.getEmpty();
    this.state = "ChooseCustomer";
    this.currentCustomer = customers.service.getEmpty();
    this.currentProduct = products.service.getEmpty();
  }

  /**
   * Contacts backend using customers service and get autocompletion suggestions
   */
  public searchCustomers(name: string) {
    return customers.service.search({ 'term': name });
  }

  /**
   * Contacts backend using products service and get autocompletion suggestions
   */
  public searchProducts(name: string) {
    return products.service.search({ 'term': name });
  }

  public amountIncremented(item: OrderItem) {
    item.amount = item.amount + 1;
  }

  public amountDecremented(item: OrderItem) {
    item.amount = item.amount - 1;
  }
  
  public orderItemRemoved(item: OrderItem) {
    this.currentOrder.order_items = this.currentOrder.order_items.filter(x => x.product_id !== item.product_id);
  }

  /**
   * Checks if a customer already exists, if it doesn't exist creates a new customer
   * and sets it as the currentCustomer.
   * When a all customer details are provided, we call this function.
   */
  public moveToChooseOrderItems() {
    if (this.currentCustomer.id === 0) {
      let response = customers.service.create(this.currentCustomer);
      let vueThis = this;
      response.then((v) => {
        vueThis.currentCustomer = v.data.data;
      })
    }
    this.state = "ChooseOrderItems";
  }

  /**
   * Checks if all required customer details are provided
   */
  public customerDetailsComplete(customer: Customer) {
    return customer.phone !== "" && customer.pincode !== "" && customer.name !== ""
  }

  public async onSubmit() {
    this.currentOrder.customer_id = this.currentCustomer.id;
    const response = await orders.service.create(this.currentOrder);

    // If status is 201, which stands for content created we show a notification
    if (response.status == 201) {
      this.resetAddOrder();
      this.showNotification = true;

      // Hide notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 3000)
    }
  }

  public customerChosen(item: Customer) {
    this.currentCustomer = item;
  }

  /**
   * Add the item to list of item in current order.
   * If item already exists in the order items, we skip the item.
   * When a product is chosen, we call this function
   */
  public productChosen(item: Product) {
    // We need to convert the Product to an OrderItem to add into order_items
    let orderItem = getEmptyOrderItem();
    orderItem.product_id = item.id;
    orderItem.amount = 1;

    // Checks if orderItem already exists with the order, if exists, we skip it again and return.
    let orderItemExists = this.currentOrder.order_items.filter((x) => x.product_id === item.id);
    if (orderItemExists.length !== 0) {
      return false;
    }

    // Update order with new order item
    this.currentOrder.order_items.push(orderItem);
    this.currentProduct = item;
  }

}
</script>

<i18n>
{
  "de": {
    "orderCreated": {
      "label": "Auftrag erstellt"
    },
    "searchCustomer": {
      "label": "Kunden suchen"
    },
    "searchItem": {
      "label": "Nach Artikeln suchen"
    }
  },
  "en": {
    "orderCreated": {
      "label": "Order created"
    },
    "searchCustomer": {
      "label": "Search for Customers"
    },
    "searchItem": {
      "label": "Search for items"
    }
  }
}
</i18n>
