console.log(changed);

if ( !window.requestAnimationFrame ) {
 
	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
			window.setTimeout( callback, 1000 / 60 );
 
		};

	})();
 
};

var circle = ( function(){	

	var data = {
		radiusOut:10,
		radiusIn : 3,
		woman:{
			colorOut: "rgba(211,18,70,0.3)",
			colorIn: "rgb(211,18,70)",
			positions: [
				{id:1, x:54, y:147, angle : 0, link :""},
				{id:2, x:67, y:220, angle : 0, link :""},
				{id:3, x:97, y:225, angle : 0, link :""},
				{id:4, x:64, y:328, angle : 0, link :""}
			]
		},	
		
		man:{
			colorOut : "rgba(106,109,222,0.3)",
			colorIn : "rgb(106,109,222)",
			positions: [
				{id:1, x:138, y:137, angle : 0, link :""},
				{id:2, x:152, y:210, angle : 0, link :""},
				{id:3, x:187, y:223, angle : 0, link :""},
				{id:4, x:147, y:327, angle : 0, link :""}
			]
		}
	};

	var itemsMan = data.man.positions.length,
		itemsWoman = data.woman.positions.length,
		mainCanvas = document.querySelector("#myCanvas"),//destiny
		mainContext = mainCanvas.getContext("2d");


	var Circle = function(){
		this.radiusIn = 4;
		this.radiusOut = 10;
		this.angle = 0;	
	}
	Circle.prototype.setAngle = function(){

		this.angle += Math.PI / 61;
	}

	Circle.prototype.drawCircle = function() {      

	    // draw the circle outside    	    
	   	posX = this.posX,
		posY = this.posY,
		radiusOut = this.radiusOut,
		radiusIn = this.radiusIn,
		colorOut = this.colorOut,
		colorIn = this.colorIn,
		angle= this.angle,
		id = this.id;
		   
	    this.setAngle();
	    var radius = radiusOut * 1.18  * Math.abs(Math.cos(this.angle));
	    
	   
		mainContext.clearRect(posX - radiusOut*1.18, posY - radiusOut*1.18, radiusOut*5, radiusOut*5);

	    mainContext.beginPath();

	    mainContext.arc(posX, posY, radius, 0, Math.PI * 3, false);
	    mainContext.closePath();
	     
	    // color in the circle
	    mainContext.fillStyle = colorOut;
	    mainContext.fill();

	    // draw the circle inside
	    mainContext.beginPath();

	    mainContext.arc(posX, posY, radiusIn, 0, Math.PI * 2, false);
	    mainContext.closePath();
	     
	    // color in the circle
	    mainContext.fillStyle = colorIn;
	    mainContext.fill();
	    
	    requestAnimationFrame(this.drawCircle.bind(this));

	};

	Circle.prototype.createButtons = function(id) {
		// body...
		var but = document.createButtons

	};

	return{

		init: function(){

			var fragment = document.createDocumentFragment();//fragment for buttons

			for( var i = 0; i< itemsWoman; i++){	
	
				var item = new Circle();

				item.id = i;
				item.posX = data.woman.positions[i]['x'];
				item.posY = data.woman.positions[i]['y'];
				item.colorIn = data.woman.colorIn;
				item.colorOut = data.woman.colorOut;
				
				item.drawCircle();

				var but = this.createButtons( data.woman.positions[i] )
				fragment.appendChild( but );

			};
			for( var i = 0; i< itemsMan; i++){	
	
				var item = new Circle();
				item.id = i;
				item.posX = data.man.positions[i]['x'];
				item.posY = data.man.positions[i]['y'];
				item.colorIn = data.man.colorIn;
				item.colorOut = data.man.colorOut;
				
				item.drawCircle();

				var but = this.createButtons( data.man.positions[i] )
				fragment.appendChild( but )

			};
			var parent = mainCanvas.parentNode, 
				child = mainCanvas.parentNode.firstChild ;

			parent.insertBefore( fragment, child );
			this.listeners();
		},

		createButtons : function(data){

			var but = document.createElement('button');			
			but.setAttribute( 'data-link', data['link']);
			but.style.left = data['x'] + "px";
			but.style.top = data['y'] + "px";
			return but;
		},

		listeners : function(){
			document.addEventListener('click', this.click, true) ;
		},

		click : function(e){

			var link = e.target.getAttribute('data-link');
			if(link){
				window.open(link);
			}
		
		}


	}
})();

 circle.init();


