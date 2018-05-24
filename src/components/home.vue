<template>
  <div class="container">
      <h5>Print your photo on creative media </h5>
      <p>Delivered in 3-5 Days.</p>
        
      <div v-for="product in productlist" class="card mb-2">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Starting Rs. {{ product.price }}/-</h6>
          <router-link v-bind:to="product.link">Browse</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      productlist : [
        {
          name : 'Mug Print',
          price : 399,
          link : '/mug'
        },
        {
          name : 'Mobile Cover',
          price : 549,
          link : '/mobilecover'
        },
        {
          name : 'Wall Art',
          price : 149,
          link : '/wallart'
        },
        {
          name : 'Table Top',
          price : 349,
          link : '/tabletop'
        }
      ],
      errors : [],
      post : []
    }
  },
  created () {
    // Get initial app data
    
    axios.get('https://www.picsdream.com/api/v1/moments?app_id=1506681087777777777&promo=AZ9B3B&zeroes=0')
    .then(response => {
      this.post=response.data
      this.$localStorage.set('appdata', JSON.stringify(this.post))
    }).catch(e=>{
      this.errors.push(e)
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
