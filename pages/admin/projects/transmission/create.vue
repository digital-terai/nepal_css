<template>
	<div id="pageDashboard">
	    <v-container grid-list-xl fluid>
	      	<v-layout row wrap>
	        	<v-flex lg12 sm12 xs12>
	          		<v-widget title="Create Projects" content-bg="white">
	 					<div slot="widget-content">
							<v-layout row wrap>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Project Name"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Longitude E1"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Longitude E2"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Latitude N1"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Latitude N2"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Installed Capacity"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-text-field
							            label="Project Cost (in Crores)"
							         ></v-text-field>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-select
							          :items="rivers"
							          label="River"
							        ></v-select>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-select
							          :items="category"
							          label="Category"
							        ></v-select>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-select
							          :items="stage"
							          label="Project Stage"
							        ></v-select>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-select
							          :items="scheme"
							          label="Project Scheme"
							        ></v-select>
							  	</v-flex>
							  	<v-flex lg6>
							  	   	<v-select
							          :items="connection"
							          label="Project Connection Type"
							        ></v-select>
							  	</v-flex>
							</v-layout>
							<v-layout row wrap>
							  	<v-flex lg1>
							    	<v-btn color="info">Save and Add Another</v-btn>
							  	</v-flex>
							  	<v-flex lg1 offset-lg8>
							    	<v-btn color="error" to="/admin/projects">Cancel</v-btn>
							  	</v-flex>
							  	<v-flex lg1>
							    	<v-btn color="info" to="/admin/projects/details">Add Project</v-btn>
							  	</v-flex>
							</v-layout>
	 					</div>
	 				</v-widget>
	 			</v-flex>
	 		</v-layout>
	 	</v-container>
	 </div>
</template>
<script>
  import VWidget from '@/components/VWidget';
  export default {
    layout: 'dashboard',
    components: {
      VWidget,
    },
    data: () => ({
    	rivers: ['Sunkoshi','River 1', 'River 2'],
    	category: ['Category 1','Category 2', 'Category 3'],
    	stage: ['Stage 1','Stage 2', 'Stage 3'],
    	scheme: ['Scheme 1','Scheme 2', 'Scheme 3'],
    	scheme: ['Connection 1','Connection 2', 'Connection 3']
    }),
    computed: {
    },

  };
</script>