(function() {
    function BabyBody(size)
    {
        this.Container_constructor();

        this.size = size;

        var body = new createjs.Bitmap( applicationData.getResult( "part_1" ).src );
            body.regX = body.regY = 64;    
        var pants = new createjs.Bitmap( applicationData.getResult( "part_2" ).src );   
            pants.regX = pants.regY = 64;  
            pants.y = 23;  
        var leg1 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src );
            leg1.regX = 64;
            leg1.regY = 49;
            leg1.rotation = 30;
            leg1.x = -10;
            leg1.y = 14;
        var leg2 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src );    
            leg2.regX = 64;
            leg2.regY = 49;
            leg2.rotation = -30;
            leg2.x = 10;
            leg2.y = 14;        
        var arm1 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src );
            arm1.regX = 64;
            arm1.regY = 49;        
            arm1.scaleX = arm1.scaleY = .7;
            arm1.rotation = 80;
            arm1.x = -24;
            arm1.y = -11;   
        var arm2 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src ); 
            arm2.regX = 64;
            arm2.regY = 49;           
            arm2.scaleX = arm2.scaleY = .7;
            arm2.rotation = -80;      
            arm2.x = 24;
            arm2.y = -11; 
        var core = new createjs.Container();
            core.regY = -32;
            core.y = 90;
            core.addChild( arm1, arm2,leg1, leg2, body, pants  );            


        var coreScale = new OscillateScaleComponent();
            coreScale.amplitude = new createjs.Point( .1, .1);
            coreScale.frequency = 18;

            core.AddComponent( coreScale );
            core.SetComponentsUpdate( true );  

        this.addChild( core );
       //this.addChild( arm1, arm2,leg1, leg2, body, pants );            

        // this.on("tick", this.OnUpdate, this);
    }

    var p = createjs.extend( BabyBody, createjs.Container );
        
        p.OnUpdate = function( event )
        {       
        }
        p.Destroy = function()
        {
            this.SetComponentsUpdate( false );
            // this.off("tick", this.OnUpdate, this);
            this.parent.removeChild( this );
        }
    window.BabyBody = createjs.promote( BabyBody, "Container" );
} () );