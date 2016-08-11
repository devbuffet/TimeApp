// popup functions
$(document).ready(function() {
	$('#btn_go').bind('click', clickHandler);
});

// return date in mm/dd/yyyy format
function returnSplitDate(date)
{
	var date_split = date.split('-');

	return date_split[1] + '/' + date_split[2] + '/' + date_split[0];
}

function clickHandler()
{
	// set days of week array
	var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

	// set params
	var _job_id = $('#_job_id').val();
	var _employee_id = $('#_employee_id').val();
	var _start_date = returnSplitDate($('#_start_date').val());
	var _end_date = returnSplitDate($('#_end_date').val());
	var is_weekend = $('#is_weekend').is(':checked');

  	// get dates
  	var dates = [];

  	var curr_date = _start_date;

  	var day_count = 0;

  	var date_match = (_start_date.toString() == _end_date.toString() ? true : false);
 	
  	for(;;)
  	{ 		
  		if(curr_date.toString() == _end_date.toString() && !date_match)
  		{
  			break;
  		}

  		curr_date = returnFormatDate(addDay(_start_date,day_count));

  		// get day of week
	  	var day = weekday[new Date(curr_date).getDay()];

	  	// skip weekend?
	  	switch(day)
	  	{
	  		case "Sunday":
	  		case "Saturday":
	  		(is_weekend ? dates.push(curr_date) : '');
	  			break;
	  		default:
			  	dates.push(curr_date);
	  	}
	  	
	  	day_count++;

	  	if(date_match)
	  	{
	  		break;
	  	}
  	}

 	// launch the tabs
  	for(var i = 0; i<dates.length; i++)
  	{
  		chrome.tabs.create({ url: 'https://eosts.energy-options.com/sts/EditTicket.aspx?date=' + (dates[i]) + '&script_based=true&Id=' + _job_id + '&Emp=' + _employee_id }, function(tab){
  		});
  	}


}

// adds day count to date
function addDay(date,day_count)
{
	var result = new Date(date);

	result.setDate(new Date(date).getDate() + day_count);

	return result;
}

// variant on date format mm/dd/yyyy
function returnFormatDate(date)
{
	var date = new Date(date);

	var month = (date.getMonth() + 1);
	var day = (date.getDate());
	var year = (date.getFullYear());

	// pad month and day
	month = (month < 10 ? '0'+month : month);
	day = (day < 10 ? '0'+day : day);

	return ((month) + '/' + day + '/' +  year);
}
