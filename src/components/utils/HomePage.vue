<template>
  <div class="tile is-ancestor">
    <!--
      The divs are aligned row by row. For this reason we make a div and assign is-vertical to parent div. This 
      enables us to align vertically. When two these parent is-vertical divs are used, it is combined horizontally
      providing us with the required layout.
      -->
    <div class="tile is-parent is-vertical">
      <article class="tile is-child box">
        <router-link :to="add.link">
          <p class="title">{{add.title}}</p>
          <p class="subtitle">{{add.subTitle}}</p>
          <div class="content">
            <i class="fas fa-plus fa-5x"></i>
          </div>
        </router-link>
      </article>
      <article class="tile is-child box">
        <router-link :to="stats.link">
          <p class="title">{{stats.title}}</p>
          <p class="subtitle">{{stats.subTitle}}</p>
          <div class="content">
            <i class="fas fa-chart-pie fa-5x"></i>
          </div>
        </router-link>
      </article>
    </div>
    <div class="tile is-parent is-vertical">
      <article class="tile is-child box">
        <router-link :to="all.link">
          <p class="title">{{all.title}}</p>
          <p class="subtitle">{{all.subTitle}}</p>
          <div class="content">
            <i class="fas fa-list fa-5x"></i>
          </div>
        </router-link>
      </article>
      <article class="tile is-child box">
        <router-link :to="search.link">
          <p class="title">{{search.title}}</p>
          <p class="subtitle">{{search.subTitle}}</p>
          <div class="content">
            <i class="fas fa-search fa-5x"></i>
          </div>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script lang='ts'>
import { HomePageBoxContent } from '@/types/types';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {},
})
export default class HomePage extends Vue {

  /**
   * We handle add / list / statistics / search operations as props, so that it can reused.
   * The HomePageBoxContent is defined as
   * type HomePageBoxContent = {link: String, title: String, subTitle: String
   */
  @Prop()
  public add!: HomePageBoxContent;
  @Prop()
  public all!: HomePageBoxContent;
  @Prop()
  public stats!: HomePageBoxContent;
  @Prop()
  public search!: HomePageBoxContent;
  public created() {}
}
</script>

<style lang='sass' scoped>

</style>
