<template>
    <div class="table">
          <table-header></table-header>

          <div class="t__body">

            <table-row 
              v-for="item in data" 
              :key="item.id"
              :data="item">
            </table-row>

          </div>
        </div>
</template>


<script>

    import data from '../../data/dataTable'  

    import TableHeader from './TableHeader'
    import TableRow from './TableRow'

    export default {
      name: 'TableWrap',
      
      components: {
        TableHeader,
        TableRow
      },

      data: function(){
        return {
          data,
          title: 'i title'
        }
      },

      created: function(){
        
      }
    }
</script>