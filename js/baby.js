(function() {
    function Baby(size)
    {
        this.Container_constructor();

        this.size = size;

        var headScale = new OscillateScaleComponent();
            headScale.amplitude = new createjs.Point( .05, .05);
            headScale.frequency = 20;

        var mouthScale = new OscillateScaleComponent();
            mouthScale.amplitude = new createjs.Point( .1, .1);
            mouthScale.frequency = 18;

        var eye1Scale = new OscillateScaleComponent();
            eye1Scale.amplitude = new createjs.Point( .1, .1);
            eye1Scale.frequency = 18;

        var eye2Scale = new OscillateScaleComponent();
            eye2Scale.amplitude = new createjs.Point( .1, .1);
            eye2Scale.frequency = 18;

        var hair1Scale = new OscillateScaleComponent();
            hair1Scale.amplitude = new createjs.Point( .2, .2);
            hair1Scale.frequency = 10;
            
        var hair2Scale = new OscillateScaleComponent();
            hair2Scale.amplitude = new createjs.Point( .1, .1);
            hair2Scale.frequency = 20;

        var hair1 = new createjs.Bitmap( applicationData.getResult( "part_7" ).src );
            hair1.regX = hair1.regY = 124;
            hair1.y = -100;
            hair1.rotation = 5;
            hair1.x = -16;
            hair1.AddComponent( hair1Scale );
            hair1.SetComponentsUpdate( true );               
        var hair2 = new createjs.Bitmap( applicationData.getResult( "part_7" ).src );
            hair2.regX = hair2.regY = 124;
            hair2.y =-100;
            hair2.x = -5;
            hair2.rotation = 13;
            hair2.scaleX = hair2.scaleY = .7;
            hair2.AddComponent( hair2Scale );
            hair2.SetComponentsUpdate( true );                 
        var head = new createjs.Bitmap( applicationData.getResult( "part_5" ).src );
            head.regX = head.regY = 124;
            head.AddComponent( headScale );
            head.SetComponentsUpdate( true );
        var eye1 = new createjs.Bitmap( applicationData.getResult( "part_4" ).src );
            eye1.regX = eye1.regY = 64;
            eye1.scaleX = eye1.scaleY = .35;
            eye1.y = -70;
            eye1.x = -28;
            eye1.rotation = -15;
            eye1.AddComponent( eye1Scale );
            eye1.SetComponentsUpdate( true );                           
        var eye2 = new createjs.Bitmap( applicationData.getResult( "part_4" ).src );    
            eye2.regX = eye2.regY = 64;
            eye2.scaleX = eye2.scaleY = .9;
            eye2.y = -84;
            eye2.x = 30;
            eye2.AddComponent( eye2Scale );
            eye2.SetComponentsUpdate( true );            
        var mouth = new createjs.Bitmap( applicationData.getResult( "part_3" ).src );
            mouth.regX = mouth.regY = 124;
            mouth.y = 12;
            mouth.AddComponent( mouthScale );
            mouth.SetComponentsUpdate( true );
            
            
            
        var hitarea = new createjs.Shape();
          hitarea.graphics.beginFill("#FF0000").drawCircle(0,0,config.hitareaSize);
         
         
         this.hitArea = hitarea; 

        // var body = new createjs.Bitmap( applicationData.getResult( "part_1" ).src );
        //     body.regX = body.regY = 64;    
        // var pants = new createjs.Bitmap( applicationData.getResult( "part_2" ).src );   
        //     pants.regX = pants.regY = 64;  
        //     pants.y = 23;  
        // var leg1 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src );
        //     leg1.regX = 64;
        //     leg1.regY = 49;
        //     leg1.rotation = 30;
        //     leg1.x = -10;
        //     leg1.y = 14;
        // var leg2 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src );    
        //     leg2.regX = 64;
        //     leg2.regY = 49;
        //     leg2.rotation = -30;
        //     leg2.x = 10;
        //     leg2.y = 14;        
        // var arm1 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src );
        //     arm1.regX = 64;
        //     arm1.regY = 49;        
        //     arm1.scaleX = arm1.scaleY = .7;
        //     arm1.rotation = 80;
        //     arm1.x = -24;
        //     arm1.y = -11;   
        // var arm2 = new createjs.Bitmap( applicationData.getResult( "part_6" ).src ); 
        //     arm2.regX = 64;
        //     arm2.regY = 49;           
        //     arm2.scaleX = arm2.scaleY = .7;
        //     arm2.rotation = -80;      
        //     arm2.x = 24;
        //     arm2.y = -11; 
        // var core = new createjs.Container();
        //     core.regY = -32;
        //     core.y = 100;
        //     core.addChild( arm1, arm2,leg1, leg2, body, pants,  );            
        var top = new createjs.Container();
            top.addChild( hair1, hair2, head, mouth, eye1, eye2 );

        this.addChild( top );
        
        // this.on("tick", this.OnUpdate, this);

        this.hair = hair1;
    }

    var p = createjs.extend( Baby, createjs.Container );
        
        p.OnUpdate = function( event )
        {
            // var component = this.GetComponent( VelocityComponent );
            // var halfWidth = this.size * .5;
            
            // if(this.y >= stage.height * .5 + this.size * 2 )
            // {
            //     this.Destroy();
            // }
            
            // if(this.x <= stage.width * -.5 - halfWidth)
            // {
            //     this.x = stage.width * .5 + halfWidth;
            // }else if(this.x >= stage.width * .5 + halfWidth)
            // {
            //     this.x = stage.width * -.5 - halfWidth;
            // }
    
            // component.velocity.y += this.gravity;         
        }
        p.Hit = function()
        {
          this.mouseEnabled = false;
          var tween = createjs.Tween.get(baby, {loop: false})
          	.to({scaleX: config.hitScale, scaleY: config.hitScale}, 150, createjs.Ease.bounceIn)
          	.to({scaleX: 1, scaleY: 1, mouseEnabled: true}, 150, createjs.Ease.bounceOut);
          	//.call({this.mouseEnabled = true;}, this);
        }
        p.Destroy = function()
        {
            this.SetComponentsUpdate( false );
            // this.off("tick", this.OnUpdate, this);
            this.parent.removeChild( this );
        }
    window.Baby = createjs.promote( Baby, "Container" );
} () );