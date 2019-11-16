<template>
  <HomePage :add="add" :stats="stats" :all="all" :search="search" />
</template>

<script lang='ts'>
import { HomePageBoxContent } from '@/types/types';
import { Component, Prop } from 'vue-property-decorator';
import HomePage from '@/components/utils/HomePage.vue';
import Vue from 'vue';

@Component({
  components: {
    HomePage,
  },
})
export default class OrderHome extends Vue {

  private add: HomePageBoxContent = {
    link: '/orders/add',
    title: 'Add Order',
    subTitle: 'Add Order',
  };
  private all: HomePageBoxContent = {
    link: '/orders/all',
    title: 'View All Orders',
    subTitle: 'View All Orders',
  };
  private stats: HomePageBoxContent = {
    link: '/orders/stats',
    title: 'Order Statistics',
    subTitle: 'Order Statistics',
  };
  private search: HomePageBoxContent = {
    link: '/orders/search',
    title: 'Search Order',
    subTitle: 'Search Order',
  };
  public created() {}
}
</script>

<style lang='sass' scoped>

</style>
