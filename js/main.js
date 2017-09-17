var baby;
var textOutput;
var config = {
	startingVelocity: new createjs.Point(0,5),
	babySize: 90,
	hitForce: 50,
	babyFriction: .99,
	touchIndicatorSize: 30,
	gravity: .5,
	rotationEase: .01
};
var manifest = [
		{src:"img/baby_small.png", id: "face"}
];

var applicationData;

function main()
{
	// Setup
	setup();
	
	// Load Data
	applicationData = new createjs.LoadQueue( false );
	applicationData.on("complete", applicationReady, this);
	applicationData.on("error", applicationError, this);
	applicationData.loadManifest( manifest );
}


function applicationError( event )
{
	console.log( event.data );
}

function applicationReady( event )
{
	document.onkeydown = keyPressed;
	
	document.ontouchstart = ( mouseDown ).bind( this );
//	document.ontouchend = ( mouseUp ).bind( this );
//	document.ontouchmove = ( mouseMove ).bind( this );
	document.onmousedown = ( mouseDown ).bind( this );
//	document.onmouseup = ( mouseUp ).bind( this );
//	document.onmousemove = ( mouseMove ).bind( this );

	var spinBaby = new SpinComponent();
		spinBaby.ease = config.rotationEase;
		spinBaby.targetRotation = Math.random() * 360;
	//var translateBaby = new TranslateComponent();
	var velocityBaby = new VelocityComponent();
		velocityBaby.friction = config.babyFriction;
	
	var babyScale = new OscillateScaleComponent();
		babyScale.amplitude = new createjs.Point( .1,.1);
		
	var titleScale = new OscillateScaleComponent();
		titleScale.amplitude = new createjs.Point( .03,.03);
		titleScale.frequency = 10;

	var gameTitle = new createjs.Text("DON'T DROP THE BABY!", "80 Comfortaa");
		gameTitle.color = "#2e99c0";
		gameTitle.outline = 10;
		gameTitle.textAlign = "center";
		gameTitle.textBaseline = "middle";
		gameTitle.AddComponent( titleScale );
		gameTitle.SetComponentsUpdate( true );

	var img = applicationData.getResult("face");	
	var babyFace = new createjs.Bitmap( img.src );
		babyFace.regX = babyFace.regY = 256;

	var hitRadius = config.babySize;
	var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("green").drawCircle(0,0,hitRadius).
			moveTo(0,0).beginFill("red").drawRect(-hitRadius,-hitRadius*.25,hitRadius*2,hitRadius*.5);
		
		textOutput = new createjs.Text("","20 Arial", "#000000");
		textOutput.x = textOutput.y = 10;
			
		baby = new createjs.Container();
//		baby.graphics.beginFill("red").rect(-30,-25,60,50);
		
		//baby.hitArea = hitArea;
		baby.AddComponent( spinBaby );
		baby.AddComponent( velocityBaby );
		baby.AddComponent( babyScale );
		baby.SetComponentsUpdate( true );
		baby.on("mousedown", babyHit, this);
//		baby.on("onmousedown", babyHit, this );
//		baby.mouseEnabled = true;
	
	baby.addChild( hitArea, babyFace);
	container.addChild( gameTitle, baby );
	
	
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
function babyHit( event )
{
	var force = config.hitForce;
	var mp = container.globalToLocal( stage.mouseX , stage.mouseY );
	var subtract = mp.subtract(baby.GetPosition());
		subtract = subtract.normalized();
		
	var angle = mp.degreesTo( baby.GetPosition() );
	//var dist = createjs.Point.distance(dist, baby.GetPosition());
	//console.log( dist );

//	var angle = new createjs.Point(mp.x,mp.y).degreesTo( baby.GetPosition() );	  
	var component = baby.GetComponent( VelocityComponent );
//		component.velocity.y += Math.sin( angle ) * force;
//		component.velocity.x += Math.cos( angle ) * force
	component.velocity.x -= subtract.x * force; 
	component.velocity.y -= subtract.y * force;
	
	component = baby.GetComponent( SpinComponent );
	component.targetRotation += angle + 360;
}

function mouseMove( event )
{
	var component = baby.GetComponent( VelocityComponent );
		component.velocity.y += -2;
}

function mouseDown( event )
{			
	var mp = container.globalToLocal( stage.mouseX , stage.mouseY ) ;
	var size = config.touchIndicatorSize;
	var touch = new createjs.Shape();
		touch.graphics.beginFill("Grey").drawCircle(0,0,size);
		touch.AddComponent( new FadeComponent() );
		//touch.AddComponent( new OscillateScaleComponent() );
		touch.SetComponentsUpdate( true );
		touch.x = mp.x;
		touch.y = mp.y;
	container.addChild( touch );
}

function mouseUp( event )
{

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
//		var component = baby.GetComponent( VelocityComponent );
//			component.velocity.y += -20;
			
		console.log("space bar pressed");
	}
}

function update( event )
{
	var component = baby.GetComponent( VelocityComponent );
	var halfWidth = config.babySize * .5;
	
	if(baby.y >= stage.height * .5 + halfWidth)
	{
		baby.y = stage.height * -.5 - halfWidth;
		component.velocity.y = config.startingVelocity.y;
	}
	
	if(baby.x <= stage.width * -.5 - halfWidth)
	{
		baby.x = stage.width * .5 + halfWidth;
	}else if(baby.x >= stage.width * .5 + halfWidth)
	{
		baby.x = stage.width * -.5 - halfWidth;
	}

	component.velocity.y += config.gravity;
	textOutput.Debug( component.velocity.y );
	
	//textOutput.Debug( baby.y );
}
