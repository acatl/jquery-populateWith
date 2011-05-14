$(function(){
	
	
	
	/* populateWith plugin */
	module("jquery populateWith plugin", {
		setup : function(){
			this.dataSourceSimple = [
				"option 1",
				"option 2",
				"option 3",
				"option 4"
			];
			
			this.dataSourceComplex = [
				{id:2345, label:"option 1"},
				{id:1234, label:"option 2"},
				{id:3456, label:"option 3"},
				{id:7456, label:"option 4"}
			];
			this.select = $("<select></select>");
		},
		teardown : function(){
		}
	});
	
	
    
	test("should accept simple data source", function(){
		this.select.populateWith(this.dataSourceSimple);	
		console.log(this.select);
		equals(this.select.children().length, 4, "options created");
	});

	test("should accept complex data source", function(){
		this.select.populateWith(this.dataSourceComplex);	
		console.log(this.select);
		equals(this.select.children().length, 4, "options created");
	});

	test("should empty children elements before adding new", function(){
		this.select.populateWith([], {empty:true});	
		console.log(this.select);
		equals(this.select.children().length, 0, "options removed");
	});
	
	test("should not empty children elements before adding new when empty=false", function(){
		this.select.populateWith(this.dataSourceSimple);	
		this.select.populateWith([], {empty:false});	
		console.log(this.select);
		equals(this.select.children().length, 4, "options where appended");
	});
	
	test("value should be calculated by index by default", function(){
		this.select.populateWith(this.dataSourceSimple);	
		console.log(this.select);
		equals(this.select.children().first().attr("value"), 0, "options have default index");
	});

	test("value should be calculated by valueField when provided", function(){
		this.select.populateWith(this.dataSourceComplex, {valueField:"id"});	
		console.log(this.select);
		equals(this.select.children().first().attr("value"), "2345", "options have custom value calculated by valueField");
	});
	
	test("value should be calculated by valueFunction when provided", function(){
		this.select.populateWith(this.dataSourceComplex, {valueFunction:function(element, index){
			return index + "_" + element.id;
		}});	
		console.log(this.select);
		equals(this.select.children().first().attr("value"), "0_2345", "options have custom value calculated by valueFunction");
	});
	
	test("text should be set by element by default", function(){
		this.select.populateWith(this.dataSourceSimple);	
		console.log(this.select);
		equals(this.select.children().first().text(), "option 1", "options have default text");
	});

	test("text should be calculated by textField when provided", function(){
		this.select.populateWith(this.dataSourceComplex, {textField:"label"});	
		console.log(this.select);
		equals(this.select.children().first().text(), "option 1", "options have custom text calculated by textField");
	});
	
	test("text should be calculated by textFunction when provided", function(){
		this.select.populateWith(this.dataSourceComplex, {textFunction:function(element, index){
			return index + "_" + element.label;
		}});	
		console.log(this.select);
		equals(this.select.children().first().text(), "0_option 1", "options have custom text calculated by textFunction");
	});
	
});