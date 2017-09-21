(function() {
    function Hiscore()
    {
        this.Container_constructor();
        this.score = 0;
        		        
        this.title = new createjs.Text("HISCORE","20px Dosis");
        this.title.color = "#053648"
        this.title.textAlign = "right";
        this.title.textBaseline = "top";
        
        this.display = new createjs.Text(this.score, "20px Dosis");
        this.display.textAlign = "right";
        this.display.color = "#053648"        
        this.display.y = 20;
        this.textBaseline = "top";        
        
        this.addChild( this.title, this.display );
    }

    var p = createjs.extend( Hiscore, createjs.Container );
        p.UpdateScore = function( newScore )
        {
            if( newScore > this.score )
            {
              this.score = newScore;
              this.display.text = this.score;
              // animate score
              // assign value to display              
            }                 
        }        
        
    window.Hiscore = createjs.promote( Hiscore, "Container" );
} () );