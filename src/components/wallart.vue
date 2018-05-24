<template>
  <div class="container" v-if="!view_guide">

  	<div class="row"> <!-- main image container -->
  		<div class="col">
  			<p>W A L L A R T</p>
  		</div>
  	</div>

  	<div class="row"> <!-- customization div -->
  		<div class="col">

  			<h4>Customize Your Wall Art</h4> 
			
			<!-- Medium Selector -->
			<div class="medium-select" v-show="display_medium">
  				<h5>Chose Your Medium</h5>
  				<button type="button" class="btn btn-outline-secondary mb-4" v-for="medium in wallart_data.mediums" v-on:click="get_medium_index(medium.name)">
  					{{ medium.text }}
  				</button>
  			</div>
			
			<!-- Size Selector -->
  			<div class="size-select" v-show="!display_medium">
  				<h6>Sizes available for {{ wallart_data.mediums[medium_index].text }} (in Inches)</h6>


  				<a href="#"><p v-on:click="view_guide=true">View Size Guide</p></a>


  				<button type="button" class="btn btn-outline-primary mb-4" v-for="size in wallart_data.mediums[medium_index].prices" v-on:click="get_size_index(size.size)">
  					{{ size.size }}
  				</button>
  			</div>

  		</div>

  	</div>

  	<div class="row"> <!-- medium/size and buy button -->
  		<div class="col-auto"> <!-- toggle button for medium/size -->
  			
  			<div class="btn-group mb-3" role="group" aria-label="Basic example">
			  <button type="button" class="btn btn-outline-secondary" v-on:click="show_medium">Medium</button>
			  <button type="button" class="btn btn-outline-primary" v-on:click="show_size">Size</button>
			</div>

  		</div>

  		<div class="col"> <!-- final price button -->
  			<button type="button" class="btn btn-success btn-lg btn-block mb-3">Total : {{ final_cost }} Rs | Buy Now</button>
  		</div>

  	</div>
  </div> <!-- end of root div -->

  <div v-else class="container"> <!-- view guide container -->
  	<p @click="view_guide=false">Close</p>
	<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
	  <div class="carousel-inner">
	    <div class="carousel-item active">
	      <img class="d-block w-100" v-bind:src="wallart_data.size_guide[0]" alt="First slide">
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" v-bind:src="wallart_data.size_guide[1]" alt="Second slide">
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" v-bind:src="wallart_data.size_guide[2]" alt="Third slide">
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" v-bind:src="wallart_data.size_guide[3]" alt="Fourth slide">
	    </div>
	  </div>
	  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
	    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
	    <span class="sr-only">Previous</span>
	  </a>
	  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
	    <span class="carousel-control-next-icon" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	  </a>
	</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			data : [],
			wallart_data : [],
			display_medium : true,
			medium_index : 0, // defaults to paper unframed
			size_index : 0, // defaults to first size
			final_cost : 0,
			view_guide : false

		}
	},
	created() {
		// retrieve initial app data from local storage
		this.data = JSON.parse(this.$localStorage.get('appdata'))
		this.wallart_data = this.data.items[0]
	},
	methods : {
		show_medium : function() {
			this.display_medium = true
		},
		show_size : function() {
			this.display_medium = false
		},
		get_medium_index : function(medium_name) {
			this.medium_index = this.wallart_data.mediums.findIndex(obj => obj.name==medium_name)
			this.size_index=0
			this.compute_final_cost()
		},
		get_size_index : function(size) {
			this.size_index = this.wallart_data.mediums[this.medium_index].prices.findIndex(obj => obj.size==size)
			this.compute_final_cost()
		},
		compute_final_cost : function() {
			var final_cost = this.wallart_data.mediums[this.medium_index].prices[this.size_index].price
			final_cost -= (final_cost*this.data.dis)/100
			final_cost += this.wallart_data.mediums[this.medium_index].prices[this.size_index].tax
			this.final_cost = Math.ceil(final_cost)
		}
	}
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
