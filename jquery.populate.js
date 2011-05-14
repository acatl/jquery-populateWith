/*
 * populate jquery plugin
 *
 * Copyright 2011, Acatl Pacheco
 * Licensed under the MIT License.
 *
 */

(function($){
	
  $.fn.populate = function(data, options){
		var defaultOptions = {
			empty: true, 
			valueField: null, 
			valueFunction: null,
			textField:null,
			textFunction:null
		};
		
		var optionsSelected = $.extend({}, defaultOptions, options);
		
		var optionsOutput = "";
		for(var index in data) {
			var element = data[index];
			
			var value = index;
			if ( optionsSelected.valueFunction!= null) {
				value = optionsSelected.valueFunction(element, index);
			} else if (	optionsSelected.valueField!= null) {
				value = element[optionsSelected.valueField];
			}
			
			var text = element.toString();
			if ( optionsSelected.textFunction!= null) {
				text = optionsSelected.textFunction(element, index);
			} else if (	optionsSelected.textField!= null) {
				text = element[optionsSelected.textField];
			}
			
			optionsOutput+='<option value="' + value + '">' + text + '</option>';
		}
	
    return this.each(function(){
			if (optionsSelected.empty) {
				$(this).children().remove();
				$(this).html(optionsOutput);
			} else {
				$(this).append(optionsOutput);
			}
      
    });
    
  };
})(jQuery);
