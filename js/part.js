(function() {
    function Part( img )
    {
    	this.Container_constructor();
        
    }

    var p = createjs.extend( Part, createjs.Container );
	    p.output = function()
	    {
	    	console.log("Console Output Test.");
	    };

    window.Part = createjs.promote( Part, "Container" );
} () );