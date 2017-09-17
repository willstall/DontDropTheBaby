var baby;
var textOutput;

function main()
{
	// Setup
	setup();
	
	document.onkeydown = keyPressed;
		
	var rotateBaby = new RotateComponent();
	//var translateBaby = new TranslateComponent();
	var velocityBaby = new VelocityComponent();

		textOutput = new createjs.Text("","Arial 20px", "#000000");
		textOutput.x = textOutput.y = 10;
			
		baby = new createjs.Shape();
		baby.graphics.beginFill("red").rect(-30,-25,60,50);
		baby.AddComponent( rotateBaby );
		baby.AddComponent( velocityBaby );
		baby.SetComponentsUpdate( true );
		
	container.addChild( baby );
	
	stage.addChild( textOutput );
	stage.on("tick", update, this);
/*
	// Keyboard


	// Components
	var testComponent = new OscillateScaleComponent();
	var spinComponent = new SpinComponent();
		spinComponent.targetRotation = 3600;
		spinComponent.ease = 0.01;
	var positionComponent = new OscillatePositionComponent();
		positionComponent.amplitude.y = 50;
	var lookAtComponent = new LookAtComponent();
	var rotateComponent = new RotateComponent();
		rotateComponent.increment = 0.5
		
	// Debug Output
		textOutput = new createjs.Text("","Arial 20px", "#000000");
		textOutput.x = textOutput.y = 10;
		
	// Display 
	var test1 = new createjs.Shape();
		test1.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);
		test1.rotation = 45;
		test1.x = 60;
		test1.AddComponent( testComponent );
		test1.AddComponent( spinComponent );
		test1.SetComponentsUpdate( true );
	
	var test2 = new createjs.Shape();
		test2.graphics.beginFill("Red").drawCircle(0, 0, 10);
		test2.AddComponent( positionComponent );
		test2.SetComponentsUpdate( true );

	var test3 = new createjs.Shape();
		test3.x = -60;
		test3.graphics.beginFill("Green").rect(-30, -25, 60,50);
		test3.AddComponent( lookAtComponent );
		test3.SetComponentsUpdate( true );
		
		lookAtComponent.target = test2;
		//test2.on("tick", update);

	// Accelorometer
	window.ondevicemotion = onDeviceMotion;
	
	// Extension
  	var extend_test = new ExtendedContainer();
		extend_test.output();

	container.addChild(test1,test2,test3);
	container.AddComponent( rotateComponent );
	container.SetComponentsUpdate( true );
	
	// Don't drop the baby

	stage.addChild( textOutput );
	*/
}

function onDeviceMotion( event )
{
	var x = event.accelerationIncludingGravity.x;  
	var y = event.accelerationIncludingGravity.y;  
	var z = event.accelerationIncludingGravity.z; 
	
	textOutput.Debug(x,y,z);
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{			
		var component = baby.GetComponent( VelocityComponent );
			component.velocity.y += -20;
			
		console.log("space bar pressed");
	}
}

function update( event )
{
	if(baby.y >= stage.height * .5)
	{
		baby.y = 0;
	}
	
	var component = baby.GetComponent( VelocityComponent );
	
	textOutput.Debug( component.velocity.y );
	
	//textOutput.Debug( baby.y );
}
