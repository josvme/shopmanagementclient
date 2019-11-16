<template>
  <div class="container">
    <div class="tile is-ancestor">
      <!-- The ancestor of all tiles -->
      <div class="tile is-parent is-vertical">
        <!-- Parent of all 2 child classes. Inside classes are aligned vertically -->
        <article class="tile is-child box">
          <!-- child where we show our tile -->
          <!-- We need atleast 3 levels of hiearchy. ie. is-ancestor -> is-parent -> is-child -->
          <router-link to="/customers">
            <p class="title">Customers</p>
            <p class="subtitle">Customer Managment</p>
            <div class="content">
              <i class="fas fa-users fa-5x"></i>
            </div>
          </router-link>
        </article>
        <article class="tile is-child box">
          <router-link to="/products">
            <p class="title">Products</p>
            <p class="subtitle">Inventory Management</p>
            <div class="content">
              <i class="fas fa-warehouse fa-5x"></i>
            </div>
          </router-link>
        </article>
      </div>
      <div class="tile is-parent is-vertical">
        <!-- Parent of all 2 child classes. Inside classes are aligned vertically -->
        <article class="tile is-child box">
          <router-link to="/orders">
            <p class="title">Orders</p>
            <p class="subtitle">Order Management</p>
            <div class="content">
              <i class="fas fa-boxes fa-5x"></i>
            </div>
          </router-link>
        </article>
        <article class="tile is-child box">
          <router-link to="/deliveries">
            <p class="title">Delivery</p>
            <p class="subtitle">Delivery Management</p>
            <div class="content">
              <i class="fas fa-truck-moving fa-5x"></i>
            </div>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
