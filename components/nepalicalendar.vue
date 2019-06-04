<<template>
    <div>
		    <v-flex lg4 sm12>
                                    <v-text-field
                                      label="License Number"
                                      name="license"
                                      v-model="date" id="nepaliDate3"
                                    ></v-text-field>
                                  </v-flex>
		<h3>Datepicker with button</h3>
		<input type="text"  class="nepali-calendar" value=""/>
	
    </div>
</template>

<script>

export default {
	data()
	{
		return{
			date:''
		}
	},
   mounted()
   {
  
		$('#nepaliDate3').nepaliDatePicker({
			onFocus: false,
			npdMonth: true,
			npdYear: true,
			ndpTriggerButton: true,
			ndpTriggerButtonText: 'Choose Date',
			ndpTriggerButtonClass: 'btn btn-primary btn-lg'
		});

   } 
}

</script>