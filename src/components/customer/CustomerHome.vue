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
export default class ProductHome extends Vue {

  private add: HomePageBoxContent = {
    link: '/customers/add',
    title: 'Add Customer',
    subTitle: 'Add Customer',
  };
  private all: HomePageBoxContent = {
    link: '/customers/all',
    title: 'View All Customers',
    subTitle: 'View All Customers',
  };
  private stats: HomePageBoxContent = {
    link: '/customers/stats',
    title: 'Customer Statistics',
    subTitle: 'Customer Statistics',
  };
  private search: HomePageBoxContent = {
    link: '/customers/search',
    title: 'Search Customer',
    subTitle: 'Search Customer',
  };
  public created() {}
}
</script>

<style lang='sass' scoped>

</style>
