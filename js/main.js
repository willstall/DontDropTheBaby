var baby;
var babyBody;
var hair;
var gameTitle;
var textOutput;
var explosions;
// var trail1;
/*
var config = {
	startingVelocity: new createjs.Point(0,5),
	babySize: 90,
	hitareaSize: 120,	
	hitForce: 50,
	babyFriction: .99,
	touchIndicatorSize: 30,
	gravity: 0.5,
	rotationEase: .01,
	bodyRotationEase: .01,
	hairRotationEase: .03,
	resetTime: 1500,
	hitScale: 3,
	numberScalePop: 8,
	softServeGravity: 0
};
*/

var config = {
	startingVelocity: new createjs.Point(0,5),
	babySize: 90,
	hitareaSize: 160,
	hitForce: 40,
	babyFriction: .99,
	touchIndicatorSize: 30,
	gravity: 0.4,
	rotationEase: .01,
	bodyRotationEase: .01,
	hairRotationEase: .03,
	resetTime: 1500,
	hitScale: 3,
	numberScalePop: 8,
	softServeGravity: 0.1
};

var manifest = [
		// {src:"audio/background.mp3", id: "background"},
		// {src:"audio/woosh.mp3", id: "woosh", data: 1},
		// {src:"audio/explosion.mp3", id: "explosion"},
		// {src:"audio/explosion_hit.mp3", id: "explosionHit"},
		// {src:"audio/firework.mp3", id: "firework"},
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
var softServed = false;
var currentGravity = 0;
var hits = 0;
var gameOverTimer = 0;
var clickSound;

function main()
{
	// Setup
	setup();
	
	// Load Data
	applicationData = new createjs.LoadQueue( false );
	// applicationData.installPlugin(createjs.Sound);
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
	// var screaming = createjs.Sound.play("background", {loop:-1, volume: .3});		
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
		// baby.AddComponent( babyScale );
		baby.SetComponentsUpdate( true );
		baby.on("mousedown", babyHit, this);
		baby.y = 1000;

	var offset = new SpringComponent();
		offset.target = baby;

	var bodySpin = new SpinComponent();		
		bodySpin.ease = config.bodyRotationEase;
		bodySpin.targetRotation = Math.random() * 360;

		babyBody = new BabyBody();
		babyBody.AddComponent( bodySpin );
// 	babyBody.AddComponent( offset );		
		babyBody.SetComponentsUpdate( true );

		var hairSpin = new SpinComponent();		
			hairSpin.ease = config.hairRotationEase;
			hairSpin.targetRotation = Math.random() * 900;

		// hair = new Hair();
		// hair.AddComponent( hairSpin );
		// hair.SetComponentsUpdate( true );



	// trail1 = new Trail();
	// trail1.targetX = trail1.targetY = 0;
	// trail1.accel = .5;
	// trail1.width = 8;
	// trail1.setColor
	// ({
	// 	r : 5,
	// 	g : 55,
	// 	b: 72,
	// 	a: 1
	// });
	// trail1.setColors([
	// {
	// 	r : 5,
	// 	g : 55,
	// 	b: 72,
	// 	a: 1
	// }]);

	container.addChild( titleContainer, explosions, babyBody, baby ); //,hair
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

	// component = hair.GetComponent( SpinComponent );
	// component.targetRotation += angle + 900;
	
	hits++;

	var flashComp = new FadeComponent();
		flashComp.autoDestroy = true;

	var flash = new createjs.Shape();
		flash.graphics.beginFill("white").drawRect( 0,0,stage.width,stage.height);
		flash.AddComponent( flashComp );
		flash.SetComponentsUpdate( true );
		flash.mouseEnabled = false;

	stage.addChild( flash );

	fireParticles( mp.x, mp.y, 30 );

	//var explosionSound = createjs.Sound.play("firework", {loop:0, volume: 1 ,interrupt: createjs.Sound.INTERRUPT_NONE});


	// HIT SOUND
		
	updateTitle();
	baby.Hit();
	
	// check soft serve ice cream
	if( softServed == false)
	{
		softServed == true;
		currentGravity = config.gravity;
	}
}

function getRandomColor()
{
	var colors = ["#fb5167","#eccd62","#2f99c2"];
	var color = colors[Math.floor(Math.random()*colors.length)];
	return color;	
}

function updateTitle()
{
	var color = getRandomColor();
	var scaleAmount;
	
	gameTitle.color = color;

	if(( canReset == true) && (hits <= 0))
	{
		gameTitle.text = "DON'T DROP THE BABY!";
		scaleAmount = 1.1;
	}else{
		gameTitle.text = hits.toString();
		
		scaleAmount = config.numberScalePop;
	}

	// var woosh = createjs.Sound.play("woosh", {loop:0, volume: .15});	
	var tween = createjs.Tween.get(gameTitle, {loop: false})
	.to({scaleX: scaleAmount, scaleY: scaleAmount}, 200, createjs.Ease.bounceIn)
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

	var color = getRandomColor();			
	var mp = container.globalToLocal( stage.mouseX , stage.mouseY ) ;
	var size = config.touchIndicatorSize;
	var fade = new FadeComponent();
		fade.autoDestroy = true;
		fade.ease = .8;
	var touch = new createjs.Shape();
		touch.graphics.beginFill(color).drawCircle(0,0,size);
		touch.AddComponent( fade );
		touch.AddComponent( new OscillateScaleComponent() );
		touch.SetComponentsUpdate( true );
		touch.x = mp.x;
		touch.y = mp.y;
	container.addChild( touch );

	// clickSound = createjs.Sound.play("explosionHit", {loop:0, volume: .2,interrupt: createjs.Sound.INTERRUPT_ANY});
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

function fireParticles( x, y , amount)
{
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
		{img: "toy_3", size: 128, scale: 1}			
	];
	for(var i = 0; i < partsData.length; i++)
	{
		var partData = partsData[i];
		var part = new Part(partData.img, partData.size, partData.scale);
			part.x = baby.x;
			part.y = stage.height * .5 + partData.size;
	
		explosions.addChild( part );		
	}

	fireParticles( baby.x, stage.height * .5, 10);
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
	baby.x = 0;
	
	var component = baby.GetComponent( VelocityComponent );
		component.velocity.y = config.startingVelocity.y;
		component.velocity.x = 0;
		component = baby.GetComponent( SpinComponent );
		component.targetRotation = 900 + Math.random() * 3000;

	canReset = false;
	isGameOver = false;
	softServed = false;
	currentGravity = config.softServeGravity;
	
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

	component.velocity.y += currentGravity;
	textOutput.Debug( component.velocity.y );
	
	//textOutput.Debug( baby.y );

	babyBody.x = baby.x;//hair.x = 
	babyBody.y =  baby.y;//hair.y =
}
