	// listen to tab update
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.status == 'complete')
		{
			var script_based = getParameterByName("script_based",JSON.stringify(tab.url));
			var date = getParameterByName("date",JSON.stringify(tab.url));

			if(script_based)
			{
				chrome.tabs.executeScript(tab.id, {code: "$(document).ready(function() { console.log('" + date + "'); $('#ctl00_ContentPlaceHolder1_txtDescription').val('EdgeConnex Internationalization'); $('#ctl00_ContentPlaceHolder1_ddlTicketStatus').val(4); $('#ctl00_ContentPlaceHolder1_txtdateLabor').val('" + date + "'); $('#ctl00_ContentPlaceHolder1_txtHoursWorked').val(8); $('#ctl00_ContentPlaceHolder1_ddlLaborCode').val(404); $('#ctl00_ContentPlaceHolder1_btnUpdate').trigger('click'); });"}, function(
					){
					// wait a few seconds
					setTimeout(function(){
						chrome.tabs.remove(tab.id, function() {});
					},4000);
				});
			}			
		}
	});


	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ""));
	}