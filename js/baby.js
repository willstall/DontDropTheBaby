(function() {
    function Baby(size)
    {
        this.Container_constructor();

        this.size = size;

        //var img = applicationData.getResult( img );	

        this.bitmap = new createjs.Bitmap( img.src );
        this.bitmap.regX = this.bitmap.regY = size* .5;        

       // this.addChild( this.bitmap );

        this.on("tick", this.OnUpdate, this);
    }

    var p = createjs.extend( Baby, createjs.Container );
        p.OnUpdate = function( event )
        {
            var component = this.GetComponent( VelocityComponent );
            var halfWidth = this.size * .5;
            
            if(this.y >= stage.height * .5 + this.size * 2 )
            {
                this.Destroy();
            }
            
            if(this.x <= stage.width * -.5 - halfWidth)
            {
                this.x = stage.width * .5 + halfWidth;
            }else if(this.x >= stage.width * .5 + halfWidth)
            {
                this.x = stage.width * -.5 - halfWidth;
            }
    
            component.velocity.y += this.gravity;         
        }
        p.Destroy = function()
        {
            this.SetComponentsUpdate( false );
            this.off("tick", this.OnUpdate, this);
            this.parent.removeChild( this );
        }
    window.Baby = createjs.promote( Baby, "Container" );
} () );