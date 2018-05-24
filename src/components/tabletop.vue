<template>
	<div class="container">

		<div class="row"> <!-- image container -->
			<div class="col">
				<p>Image</p>
			</div>
		</div>

		<div class="row"> <!-- medium and size selectors -->
			<div class="col">
				
				<h4>Customize Your Table Top</h4>

				<div v-show="display_medium"> <!-- medium selector -->
					<p>Choose a Medium</p>
					<button type="button" class="btn btn-outline-secondary mb-4" v-for="medium in tabletop_data.mediums" v-on:click="get_medium_index(medium.name)">
  						{{ medium.text }}
  					</button>
				</div>

				<div v-show="!display_medium"> <!-- size selector -->
					<p>Pick a Size for {{ tabletop_data.mediums[medium_index].text }}</p>

					<button type="button" class="btn btn-outline-primary mb-4" v-for="size in tabletop_data.mediums[medium_index].prices" v-on:click="get_size_index(size.size)">
	  					{{ size.size }}
	  				</button>
				</div>

			</div>
		</div>

		<div class="row">
			<div class="col">
				<div class="btn-group mb-3" role="group" aria-label="Basic example">
				  <button type="button" class="btn btn-outline-secondary" v-on:click="show_medium">Medium</button>
				  <button type="button" class="btn btn-outline-primary" v-on:click="show_size">Size</button>
				</div>
			</div>
		</div>

		<div class="row">
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
		this.tabletop_data = this.data.items[2]
	},
	data() {
		return {
			data : [],
			tabletop_data : [],
			display_medium : true,
			medium_index : 0,
			size_index : 0,
			final_cost : 0
		}
	},
	methods : {
		show_medium : function() {
			this.display_medium = true
		},
		show_size : function() {
			this.display_medium = false
		},
		get_medium_index : function(medium) {
			this.medium_index = this.tabletop_data.mediums.findIndex(obj => obj.name==medium)
			this.size_index=0
			this.compute_final_cost()
		},
		get_size_index : function(size) {
			this.size_index = this.tabletop_data.mediums[this.medium_index].prices.findIndex(obj => obj.size==size)
			this.compute_final_cost()
		},
		compute_final_cost : function() {
			var final_cost = this.tabletop_data.mediums[this.medium_index].prices[this.size_index].price
			final_cost -= (final_cost*this.data.dis)/100
			final_cost += this.tabletop_data.mediums[this.medium_index].prices[this.size_index].tax
			this.final_cost = Math.ceil(final_cost)
		}
	}
}

	
</script>

<style>
	
</style>