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
    link: '/products/add',
    title: 'Add Product',
    subTitle: 'Add Product',
  };
  private all: HomePageBoxContent = {
    link: '/products/all',
    title: 'View All Products',
    subTitle: 'View All Products',
  };
  private stats: HomePageBoxContent = {
    link: '/products/stats',
    title: 'Product Statistics',
    subTitle: 'Product Statistics',
  };
  private search: HomePageBoxContent = {
    link: '/products/search',
    title: 'Search Product',
    subTitle: 'Search Product',
  };
  public created() {}
}
</script>

<style lang='sass' scoped>

</style>
