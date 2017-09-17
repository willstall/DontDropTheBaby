var baby;
var babyBody;
var gameTitle;
var textOutput;
var explosions;
var config = {
	startingVelocity: new createjs.Point(0,5),
	babySize: 90,
	hitForce: 50,
	babyFriction: .99,
	touchIndicatorSize: 30,
	gravity: 0,
	rotationEase: .01,
	bodyRotationEase: .01,
	resetTime: 1500
};
var manifest = [
		// {src:"audio/yuck.wav", id: "screaming"},
		{src:"img/particle.png", id: "particle"},
		{src:"img/toy_1.png", id: "toy_1"},
		{src:"img/toy_2.png", id: "toy_2"},
		{src:"img/toy_3.png", id: "toy_3"},
		{src:"img/part_1.png", id: "part_1"},
		{src:"img/part_2.png", id: "part_2"},
		{src:"img/part_3.png", id: "part_3"},
		{src:"img/part_4.png", id: "part_4"},
		{src:"img/part_5.png", id: "part_5"},
		{src:"img/part_6.png", id: "part_6"},
		{src:"img/part_7.png", id: "part_7"}
];

var applicationData;
var isGameOver = true;
var canReset = true;
var hits = 0;
var gameOverTimer = 0;

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
	//var screaming = createjs.Sound.play("screaming");
	//document.onkeydown = keyPressed;
	
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
		
//	var titleScale = new OscillateScaleComponent();
		//titleScale.amplitude = new createjs.Point( .01,.01);
		//titleScale.frequency = 20;

	// var testBaby = new Baby();
	
	var backgroundScale = new OscillateScaleComponent();
		backgroundScale.amplitude = new createjs.Point( .01,.01);
		backgroundScale.frequency = 5;

		gameTitle = new createjs.Text("", "80px Dosis");
		gameTitle.color = "#2e99c0";
		//gameTitle.outline = 10;
		gameTitle.textAlign = "center";
		gameTitle.textBaseline = "middle";
		gameTitle.scaleX = gameTitle.scaleY = 2;

		updateTitle();

		explosions = new createjs.Container();

	var titleContainer = new createjs.Container();
		titleContainer.addChild( gameTitle );
		//titleContainer.AddComponent( titleScale );
		titleContainer.SetComponentsUpdate( true );

	var backgroundImg = applicationData.getResult("toy_1");
	var background = new createjs.Shape();
		background.graphics.beginBitmapFill(backgroundImg).drawRect(0, 0, stage.width + backgroundImg.width, stage.height + backgroundImg.height);
		background.tileW = backgroundImg.width;
		background.tileH = backgroundImg.height;
		background.AddComponent( backgroundScale );
		background.SetComponentsUpdate( true );

	var hitRadius = config.babySize;
	var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("green").drawCircle(0,0,hitRadius).
			moveTo(0,0).beginFill("red").drawRect(-hitRadius,-hitRadius*.25,hitRadius*2,hitRadius*.5);
		
		textOutput = new createjs.Text("","20pt Arial", "#000000");
		textOutput.x = textOutput.y = 10;

		baby = new Baby();
		baby.AddComponent( spinBaby );
		baby.AddComponent( velocityBaby );
		baby.AddComponent( babyScale );
		baby.SetComponentsUpdate( true );
		baby.on("mousedown", babyHit, this);
		baby.y = 1000;

	var offset = new SpringComponent();
		offset.target = baby;

	var bodySping = new SpinComponent();		
		bodySping.ease = config.bodyRotationEase;
		bodySping.targetRotation = Math.random() * 360;

		babyBody = new BabyBody();
		babyBody.AddComponent( bodySping );
// 	babyBody.AddComponent( offset );		
		babyBody.SetComponentsUpdate( true );
	
	container.addChild( titleContainer, explosions, babyBody, baby );
	// container.addChild( testBaby );

	stage.addChild( background );
	stage.on("tick", update, this);
	stage.setChildIndex( container, stage.numChildren-1);	// put game on top

	//testing
	// explodeBaby();
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

	component = babyBody.GetComponent( SpinComponent );
	component.targetRotation += angle + 3600;

	hits++;
	updateTitle();
	fireParticles( mp.x, mp.y );
}

function updateTitle()
{
	var scaleAmount;
	
	if(( canReset == true) && (hits <= 0))
	{
		gameTitle.text = "DON'T DROP THE BABY!";
		scaleAmount = 1.1;
	}else{
		gameTitle.text = hits.toString();
		scaleAmount = 4;
	}

	var tween = createjs.Tween.get(gameTitle, {loop: false})
	.to({scaleX: scaleAmount, scaleY: scaleAmount}, 150, createjs.Ease.bounceIn)
	.to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.bounceOut);
}
function mouseMove( event )
{
	var component = baby.GetComponent( VelocityComponent );
		component.velocity.y += -2;
}

function mouseDown( event )
{	
	resetGame();
			
	var mp = container.globalToLocal( stage.mouseX , stage.mouseY ) ;
	var size = config.touchIndicatorSize;
	var fade = new FadeComponent();
		fade.autoDestroy = true;
		fade.ease = .33;
	var touch = new createjs.Shape();
		touch.graphics.beginFill("#053648").drawCircle(0,0,size);
		touch.AddComponent( fade );
		touch.AddComponent( new OscillateScaleComponent() );
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

function fireParticles( x, y )
{
	var amount = 30;
	for(var i = 0; i < amount; i++)
	{
		var particle = new Particle();
			particle.x = x;
			particle.y = y;
	
		explosions.addChild( particle );		
	}
}

function explodeBaby()
{
	var partsData = [
		{img: "part_1", size: 128, scale: 1},
		{img: "part_2", size: 128, scale: 1},
		{img: "part_3", size: 256, scale: 1},
		{img: "part_4", size: 128, scale: .5},
		{img: "part_4", size: 128, scale: 1},
		{img: "part_5", size: 256, scale: 1},
		{img: "part_6", size: 128, scale: 1},
		{img: "part_6", size: 128, scale: 1},
		{img: "part_6", size: 128, scale: .6},
		{img: "part_6", size: 128, scale: .6},
		{img: "part_7", size: 256, scale: 1},
		{img: "part_7", size: 256, scale: .6},
		{img: "toy_1", size: 128, scale: 1},
		{img: "toy_1", size: 128, scale: 1},
		{img: "toy_1", size: 128, scale: 1},
		{img: "toy_1", size: 128, scale: 1},
		{img: "toy_2", size: 128, scale: 1},
		{img: "toy_2", size: 128, scale: 1},
		{img: "toy_2", size: 128, scale: 1},
		{img: "toy_2", size: 128, scale: 1},
		{img: "toy_3", size: 128, scale: 1},
		{img: "toy_3", size: 128, scale: 1},
		{img: "toy_3", size: 128, scale: 1},
		{img: "toy_3", size: 128, scale: 1},
		{img: "particle", size: 128, scale: 1},
		{img: "particle", size: 128, scale: .9},
		{img: "particle", size: 128, scale: .7},
		{img: "particle", size: 128, scale: .5},
		{img: "particle", size: 128, scale: .3}				
	];
	for(var i = 0; i < partsData.length; i++)
	{
		var partData = partsData[i];
		var part = new Part(partData.img, partData.size, partData.scale);
			part.x = baby.x;
			part.y = stage.height * .5 + partData.size;
	
		explosions.addChild( part );		
	}
}

function gameOverUpdate( event )
{
	isGameOver = true;
	gameOverTimer += 1000 / 60;

	if(gameOverTimer >= config.resetTime)
		gameOver();
}

function gameOver()
{
	canReset = true;
	hits = 0;
	gameOverTimer = 0;
	updateTitle();
}

function resetGame()
{
	if( canReset == false)
		return;

	baby.y = stage.height * -.5 - config.babySize * .5;

	var component = baby.GetComponent( VelocityComponent );
		component.velocity.y = config.startingVelocity.y;
		component = baby.GetComponent( SpinComponent );
		component.targetRotation = 900 + Math.random() * 3000;

	canReset = false;
	isGameOver = false;
	
	updateTitle();
}

function update( event )
{
	var component = baby.GetComponent( VelocityComponent );
	var halfWidth = config.babySize * .5;
	
	if(baby.y >= stage.height * .5 + config.babySize * 2 )
	{	
		if(isGameOver == false)
		{
			explodeBaby();
			isGameOver = true;				
		}else{
			gameOverUpdate( event );
		}
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

	babyBody.x = baby.x;
	babyBody.y = baby.y;
}
