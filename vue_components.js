Vue.component('vue-component-datalist_input', {
   props: {
      items: Array,
      item: String,
      value: String,
   },
   data() {
      return {
         id: null,
         item: null,
         value: 0,
      }
   },
   methods: {
      isNumber(evt) {
         evt = (evt) ? evt : window.event;
         let charCode = (evt.which) ? evt.which : evt.keyCode;
         if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) evt.preventDefault();
         else return true;
      },
      setValue() {
         if (!this.item || this.item === '' || !this.value) this.value = 0
         if (this.value > 100) this.value = 100
         this.$emit('input', {[this.item]: this.value})
      }
   },
   mounted() {
      this.id = this._uid

   },
   watch: {
      item() {
         this.setValue();
      }
   },
   template: `
         <div style="display: inline-flex; gap: 10px; align-items: center">
         <input v-on:mouseover="document.getElementById(id).focus();"
                v-on:input="setValue"
                v-model="item"
                style="width: calc(80% - 10px)"
                placeholder="Search"
                :list="id">
         <datalist :id="id">
            <option v-for="item in items" v-bind:value="item.value">{{ item.name }}</option>
         </datalist>
         <template v-if="item">
            <div style="display: inline-flex; gap: 3px; align-items: center; width: 20%">
               <input v-on:input="setValue"
                      v-model="value"
                      @keypress="isNumber($event)"
                      style="width: 100%; text-align: right"
                      placeholder="Rebate">
               %
            </div>
         </template>
         </div>`
})


Vue.component('vue-component-table', {
   props: {
      headers: Array,
      rows: Array,
   },
   methods: {
      isNumber(evt) {
         evt = (evt) ? evt : window.event;
         let charCode = (evt.which) ? evt.which : evt.keyCode;
         if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) evt.preventDefault();
         else return true;
      },
      searchInput (column, event) {
         this.$emit("search", {column: column, value: event.target.value})
      },
      sortBy(column, event){
         this.$emit("sort", {column: column, event: event})
      },
   },
   template: `
      <template>
         <table class="vue-component-table__table">
            <thead>
            <tr class="vue-component-table__header">
               <template v-for="header in headers">
                  <th>
                     <div style="font-size: 12px">{{header.title}}</div>
                     <div v-if="header.column" class="vue-component-table__search">
                        <input :placeholder="header.placeholder ? header.placeholder : 'Search'" v-on:input="searchInput(header.column, $event)">
                        <button v-on:click="sortBy(header.column, $event)">
                           <i class="material-icons md-18" style="font-size: 14px">arrow_downward</i>
                        </button>
                     </div>
                  </th>
               </template>
            </tr>
            </thead>
            <tbody>
            <tr class="vue-component-table__columns" v-for="row in rows" :key="row.id">
               <template v-for="header in headers">
                  <td v-if="header.vhtml" v-html="row[header.column]"/>
                  <td v-else-if="header.input">
                     <input :placeholder="row[header.input]" :id="row.id" @keypress="isNumber($event)">
                  </td>
                  <td v-else-if="header.btns">
                     <template v-for="btn in header.btns">
                        <button v-on:click="btn.click(row)" class="table_row_button" style="padding: 10px; margin: 0">
                           <i class="tiny material-icons" style="font-size:14px;">{{btn.name}}</i>
                        </button>
                     </template>
                  </td>
                  <td v-else>{{row[header.column]}}</td>
               </template>
            </tr>
            </tbody>
         </table>
      </template>`
})
