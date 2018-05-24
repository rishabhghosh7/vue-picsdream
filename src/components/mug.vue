<template>
  <div class="container">
	
	<div class="row mb-4"> <!-- Image and View Buttons -->
		<div class="col-auto">
			
			<div class="btn-group-vertical" role="group" aria-label="Basic example">
			  <button type="button" class="btn btn-secondary">Left View</button>
			  <button type="button" class="btn btn-secondary">Top View</button>
			  <button type="button" class="btn btn-secondary">Right View</button>
			</div>

		</div>
		<div class="col">
			<p>mug image</p>
		</div>
	</div>

	<h4>Customize Your Mug</h4>

	<div class="row mb-4"> <!-- color and size views rendered here -->

		<div class="col" v-show="color_show"> <!-- color panel -->
			<h5>Pick a Color</h5>
			<button type="button" class="btn btn-secondary btn-sm" v-for="color in mug_data.mediums">
				<img v-bind:src="color.img" v-on:click="get_color_index(color.name)">
			</button>
		</div>

		<div class="col" v-show="!color_show"> <!-- material panel -->
			<h5>Choose Your Size</h5>
			<button type="button" class="btn btn-success" v-for="size in mug_data.mediums[color_index].prices" v-on:click="get_size_index(size.size)">
				{{ size.size }}
			</button>
		</div>

	</div>

	<div class="row mb-4"> <!-- color->size switch -->
		<div class="col">
			<div class="btn-group" role="group" aria-label="Basic example">
			  <button type="button" class="btn btn-secondary" v-on:click="color_on">Color</button>
			  <button type="button" class="btn btn-secondary" v-on:click="size_on">Size</button>
			</div>
		</div>
	</div>

	<div class="row mb-4"> <!-- Purchase button -->
		<div class="col">
			<button type="button" class="btn btn-primary btn-lg btn-block">Total : {{final_cost}} Rs | Buy Now</button>
		</div>
	</div>
  	
  </div>
</template>

<script>
export default{
	data() {
		return {
			data : [],
			mug_data : [],
			color_show : true,
			color_index : 0, // default value set to white
			size_index : 0,
			final_cost : 0
		}
	},
	created() {
		// get initial app data from local storage
		this.data = JSON.parse(this.$localStorage.get('appdata'))
		this.mug_data = this.data.items[1]
	},
	methods : {
		color_on : function() {
			// toggles the view between color and size options

			this.color_show = true
		},
		size_on : function() {
			// toggles the view between color and size options

			this.color_show = false
		},
		get_color_index : function (color_choice) {
			// stores the index of the color chosen

			this.color_index = this.mug_data.mediums.findIndex(obj => obj.name==color_choice)
			this.compute_final_cost()
		},
		get_size_index : function (size_choice) {
			// stores the index of the size chosen

			this.size_index = this.mug_data.mediums[this.color_index].prices.findIndex(obj => obj.size==size_choice)
			this.compute_final_cost()
		},
		compute_final_cost : function () {
			// computes the total cost based on color and size choices

			var final_cost = this.mug_data.mediums[this.color_index].prices[this.size_index].price
			final_cost -= final_cost*(this.data.dis/100)
			final_cost += this.mug_data.mediums[this.color_index].prices[this.size_index].tax
			this.final_cost = Math.ceil(final_cost)

		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
