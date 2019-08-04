<template>
  <!--
    We want to avoid all default event propagations on the input form. So we use @click.stop
    @keyup event will be triggered when user has finished entering a character.
    -->
  <div @click.stop>
    <input
      type="text"
      v-model="autoCompleteInput"
      class="input"
      :placeholder="displayText"
      @focus="active=true"
      @keyup="updateList"
    />
    <!-- 
      We loop through all suggestions using v-for and put them inside a unordered list (ul)
      The loop will be rendered as
      <ul>
        <li> Option 1</li>
        <li> Option 2</li>
      </ul>
      -->
    <ul name="autocomplete" v-if="active">
      <li
        :value="l.name"
        v-for="l in autoCompleteSuggestions"
        v-bind:key="l.id"
        @click.prevent="selectionChanged(l)"
        class="button is-fullwidth"
        style="border-radius: 0px"
      >{{l.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Customer } from '@/types/types.ts';
import { Component, Prop } from 'vue-property-decorator';
import { AxiosPromise } from 'axios';

@Component({
  components: {
  },
})

export default class AutoComplete<T extends { name: string }> extends Vue {
  /**
   * searchFn takes a string and return an AxiosPromise. With this function signature
   * we can easy pass currentInput and get possible autocompletions from backend easily.
   */
  @Prop()
  public searchFn!: (s: string) => AxiosPromise<{ 'data': T[] }>;

  /**
   * This is our html placeholder, which writes something like enter a customer name/ product name
   */
  @Prop()
  public displayText!: string

  /** 
   * Our input variable which is bound to html input form. 
   * As you can see, we use v-model from vue, which binds autoCompleteInput to html input.
   * v-model provides 2-way data binding such that change in one will be automatically 
   * propagated to other.
   */ 
  private autoCompleteInput: string = '';

  /**
   * Autocomplete suggestions list will only be shown when active is set to true.
   * When the html input box is focused, we set it to true using the @focus event from browser. 
   * And when a value is chosen, we set it to false.
   */
  private active: boolean = false;

  /**
   * List holding our auto complete suggestions, we got from the server.
   * Actually the type T is pretty useless here, as vue internally instantiates the component.
   */
  private autoCompleteSuggestions: T[] = [];

  public async mounted() {
    /* Inside function(), we will have a new this, which points to the function itself.
     * So we store current this to vueThis and access vue instance using vueThis.
     */
    let vueThis = this
    document.addEventListener('click', function () {
      vueThis.active = false
    })
    this.autoCompleteSuggestions = [];
  }

  /**
   * Function which connects to backend and asks for autocompletions based on current html input
   * and updates the html list
   */
  public updateList(event: KeyboardEvent): void {
    let request = this.searchFn(this.autoCompleteInput);
    let vueThis = this;
    request.then(result => vueThis.autoCompleteSuggestions = result.data.data)
  }

  /**
   * Emits event to parent component when an option is chosen from suggestion list.
   */
  public selectionChanged(l: T) {
    // user @Emit
    this.$emit('OptionSelected', l)
    // To give visual feedback to user, we also set html input to chosen item.
    this.autoCompleteInput = l.name
    this.active = false
  }
}
</script>
