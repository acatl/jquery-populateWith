/*
 * populateWith jquery plugin
 *
 * Copyright 2011, Acatl Pacheco
 * Licensed under the MIT License.
 *
 */

(function($){
	
  $.fn.populateWith = function(data, options){
		var defaultOptions = {
			empty: true, 
			valueField: null, 
			valueFunction: null,
			textField:null,
			textFunction:null, 
			tag:"option",
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
			
			if ( optionsSelected.textFunction!= null) {
				text = optionsSelected.textFunction(element, index);
			} else if (	optionsSelected.textField!= null) {
				text = element[optionsSelected.textField];
			} else if(element.label != null) {
				text = element.label;
			} else if(typeof element == 'string' || typeof element == 'number') {
				text = element;
			}
			
			optionsOutput+='<'+optionsSelected.tag+' value="'+value+'">'+text+'</'+optionsSelected.tag+'>';
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
