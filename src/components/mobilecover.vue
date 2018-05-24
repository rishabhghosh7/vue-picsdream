<template>
  <div class="container">

  	<div class="row"> <!-- main image container -->
  		<div class="col">
  			<p>Image</p>
  		</div>
  	</div>

  	<div class="row"> <!-- model/material selectors -->
  		<div class="col">
  			
  			<h4>Customize Your Mobile Cover</h4>

  			<div v-show="display_model"> <!-- model selector -->
  				<p>Select your Phone Model</p>
  				<div class="dropdown mb-3">
				  	<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    	{{cover_data.mediums[model_index].text}}
				  	</button>
				  	<div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
				    	<a class="dropdown-item" href="#" v-for="medium in cover_data.mediums" @click="get_model_index(medium.text)">
				    		{{ medium.text }}
				    	</a>
				  	</div>
				</div>
  			</div>

  			<div v-show="!display_model"> <!-- material selector -->
  				<p>Chose A Material for {{ cover_data.mediums[model_index].text }}</p>
  				<button type="button" class="btn btn-outline-secondary mb-4" v-for="size in cover_data.mediums[model_index].prices" v-on:click="get_material_index(size.size)">
	  				{{ size.size }}
	  			</button>
  			</div>

  		</div>
  	</div>

  	<div class="row"> <!-- toggle button for model/material -->
  		<div class="col">
  			<div class="btn-group mb-3" role="group" aria-label="Basic example">
			  	<button type="button" class="btn btn-outline-primary" v-on:click="show_model">Medium</button>
			  	<button type="button" class="btn btn-outline-secondary" v-on:click="show_material">Size</button>
			</div>
  		</div>
  	</div>

  	<div class="row"> <!-- buy button -->
  		<div class="col">
  			<button type="button" class="btn btn-success btn-lg btn-block mb-3">Total : {{ final_cost }} Rs | Buy Now</button>
  		</div>
  	</div>
  	
  </div>
</template>

<script>

export default {
	created() {
		// retrieve initial app data from local storage
		this.data = JSON.parse(this.$localStorage.get('appdata'))
		this.cover_data = this.data.items[3]
	},
	data () {
		return {
			data : [],
			cover_data : [],
			display_model : true,
			model_index : 0,
			material_index : 0,
			final_cost : 0

		}
	},
	methods : {
		show_model : function() {
			this.display_model = true
		},
		show_material : function() {
			this.display_model = false
		},
		get_model_index : function(model) {
			this.model_index = this.cover_data.mediums.findIndex(obj => obj.text==model)
			this.material_index = 0
			this.compute_final_cost()
		},
		get_material_index : function(material) {
			this.material_index = this.cover_data.mediums[this.model_index].prices.findIndex(obj => obj.size==material)
			this.compute_final_cost()
		},
		compute_final_cost : function() {
			var fc = this.cover_data.mediums[this.model_index].prices[this.material_index].price
			this.final_cost=fc
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollable-menu {
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
}

</style>
