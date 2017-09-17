(function() {

    // want to add colors to trail
    function Trail()
    {
    	this.Shape_constructor();

        this.targetX = 0;
        this.targetY = 0;

        this.lastTargetX = 0;
        this.lastTargetY = 0;

        this.deletionThreshold = 0.01;
        this.accel = .97;

        this.width = 1;
        this.colorIndex = 0;


        this.colorLengthTally = 0;
        this.colorLengthWidth = 30;

        this.setColor(
            {
                r : 255,
                g : 0,
                b: 0,
                a: 1
            }
        );

        this.clearPoints();
        // this.on("tick", update).bind(this);
    }

    var p = createjs.extend( Trail, createjs.Shape );

        p.update = function()
        {
            this.createPoint();
            this.updatePoints();
            this.drawPoints();
        //   console.log(this.points.length);
        }

        p.setColors = function ( c )
        {
            this.colors = [];
            this.colors = c;
        }

        p.setColor = function ( c )
        {
            this.colors = [];
            this.colors[0] = c;
        }

        p.getCurrentColor = function()
        {
            var c = this.colors[ this.colorIndex ];
            return c;
        }

        p.getNextColor = function()
        {
            var c = this.colors[ this.colorIndex ];
            
            this.colorIndex = (this.colorIndex + 1 ) % this.colors.length;


            // c =
            // {
            //     r : c.r,
            //     g : c.g,
            //     b : c.b,
            //     a : c.a
            // }

            c = Object.assign({}, c);

            // console.log( this.colorIndex );

            return c;
        }

        p.updatePoints = function()
        {
            this.points.forEach( point => point.color.a *= this.accel );
            this.points = this.points.filter( point => point.color.a > this.deletionThreshold );
        }

        p.clearPoints = function()
        {
            this.points = [];
        }

        p.drawDetection = function()
        {
            this.graphics.clear();
            this.graphics.setStrokeStyle(this.width,"round", "miter", "5");

            if( this.points < 1)
                return;

            this.graphics.beginStroke( "#FFF" );
            this.graphics.moveTo( this.points[0].x, this.points[0].y );
            this.points.forEach( point => this.graphics.lineTo( point.x, point.y ) );
            this.graphics.endStroke();
        }

        p.drawPoints = function()
        {
            //var currentColor = this.getNextColor();

            this.graphics.clear();
            this.graphics.setStrokeStyle(this.width,"round");
             this.graphics.beginStroke( this.getCurrentColor() );

            if( this.points < 1)
                return;


            // this.graphics.moveTo( this.points[0].x,this.points[0].y);

            for( var i = 1; i < this.points.length-1; i++)
            {
                var lastPt = this.points[i-1];
                var pt = this.points[i];
                var nextPt = this.points[i+1];

                var xc = (pt.x + nextPt.x) * .5;// >> 1;
                var yc = (pt.y + nextPt.y) * .5;// >> 1;

                var xc2 = (pt.x + lastPt.x) * .5;// >> 1;
                var yc2 = (pt.y + lastPt.y) * .5;// >> 1;

                var localColor = pt.color;

                this.graphics.beginStroke(
                    "rgba(" +
                            localColor.r + "," +
                            localColor.g + "," +
                            localColor.b + "," +
                            localColor.a +
                            ")" );

                this.graphics.moveTo( xc, yc );
                //this.graphics.lineTo( pt.x,pt.y);
                this.graphics.curveTo( pt.x, pt.y, xc2 , yc2 );

            //    if( i + 1 == this.points.length - 1 )
            //        this.graphics.lineTo( nextPt.x, nextPt.y );

                this.graphics.endStroke();
            }


            // need to add last point
        }
/*

app.midPt = new createjs.Point(app.oldPt.x + app.stage.mouseX - app.stage.canvas.width/2>>1, app.oldPt.y+app.stage.mouseY - app.stage.canvas.height/2>>1);

    // move to the first point
   ctx.moveTo(points[0].x, points[0].y);


   for (i = 1; i < points.length - 2; i ++)
   {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
   }
 // curve through the last two points
 ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
 */

        p.createPoint = function()
        {
            if( this.targetX != this.lastTargetX || this.targetY != this.lastTargetY)
            {
                if( !this.currentColor )
                    this.currentColor = this.getNextColor();

                var pt = {
                    x : this.targetX,
                    y : this.targetY,
                    color : this.currentColor
                }

                this.points.push( pt );

                var dY = (this.targetY - this.lastTargetY);
                var dX = (this.targetX - this.lastTargetX);
                var dist = Math.sqrt( dY * dY + dX * dX );
                this.colorLengthTally += dist;
                if( this.colorLengthTally >= this.colorLengthWidth )
                {
                    this.colorLengthTally = 0;
                    this.currentColor = this.getNextColor();
                }
            }


            this.lastTargetX = this.targetX;
            this.lastTargetY = this.targetY;
        }

    window.Trail = createjs.promote( Trail, "Shape" );
} () );
