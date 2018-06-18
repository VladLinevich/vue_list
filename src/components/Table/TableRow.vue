<template>
    <div class="t__row">
        <div class="c__item c__number">{{ data.id }}</div>
        <div class="c__item c__name">
            <p>{{ data.name }}</p>
        </div>
        <div class="c__item">
            <p>{{ addSeparator(data.weight) }} т</p>
            <p class="text-small">{{ addSeparator(data.mount) }} т - отгружено</p>
        </div>
        <div class="c__item c__price">{{ addSeparator(data.price) }} руб</div>
        <div class="c__item">{{ data.date.pay }} / {{ data.date.loading }}</div>
        <div class="c__item">{{ data.station.start }}</div>
        <div class="c__item">{{ data.station.end }}</div>
    </div>          
</template>

<script>

    import addSeparator from '../../helpsFunctions/separator'
    
    export default {
        name: 'TableRow',
        props: {
            data: Object
        },

        created: function(){
           console.log(this.data)
        },

       methods: {
            addSeparator
        }


    }    


      

    
</script>
    