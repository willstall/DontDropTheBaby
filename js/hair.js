(function() {
    function Hair(size)
    {
        this.Container_constructor();

        this.size = size;

        // var headScale = new OscillateScaleComponent();
        //     headScale.amplitude = new createjs.Point( .05, .05);
        //     headScale.frequency = 20;

        // var mouthScale = new OscillateScaleComponent();
        //     mouthScale.amplitude = new createjs.Point( .1, .1);
        //     mouthScale.frequency = 18;

        var hair1 = new createjs.Bitmap( applicationData.getResult( "part_7" ).src );
            hair1.regX = hair1.regY = 124;
            hair1.y = -100;
            hair1.rotation = 5;
            hair1.x = -16;
        var hair2 = new createjs.Bitmap( applicationData.getResult( "part_7" ).src );
            hair2.regX = hair2.regY = 124;
            hair2.y =-100;
            hair2.x = -5;
            hair2.rotation = 13;
            hair2.scaleX = hair2.scaleY = .7;  

        var top = new createjs.Container();
            top.addChild( hair1, hair2 );

        this.addChild( top );
        
        // this.on("tick", this.OnUpdate, this);
        
        this.hair = hair1;
    }

    var p = createjs.extend( Hair, createjs.Container );
        
        p.OnUpdate = function( event )
        {
      
        }
        p.Destroy = function()
        {
            this.SetComponentsUpdate( false );
            // this.off("tick", this.OnUpdate, this);
            this.parent.removeChild( this );
        }
    window.Hair = createjs.promote( Hair, "Container" );
} () );