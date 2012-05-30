window.onload = (function() {
    var WIDTH = 640,
    	HEIGHT = 800,
        SYMBOL_WIDTH = 100 ,
		SYMBOL_HEIGHT = 100,
		COLORS = ["#F00", "#0F0", "#FF0", "#F0F", "#0FF", "#CCF", "#F93", "#606", "#C90", "#03C"];
    Crafty.init(WIDTH, HEIGHT);

    // "Number" component, kann eigentlich noch gar nix
    Crafty.c("Number", {
        init: function() {
            this.addComponent("2D, Canvas, Color");
            this.w = SYMBOL_WIDTH;    // width
            this.h = SYMBOL_HEIGHT;    // height
        },
                
        makeNumber: function(x, y) {
        	var color = COLORS[Math.floor(Math.random()*9)]; //zufaellige Zahl zwischen 0-9 -> ARRAY COLORS
            this.attr({x: x, y: y}).color(color);
            return this;
        }
        
    });

    // "Symbol" component
    Crafty.c("Symbol", {
        init: function() {
            this.addComponent("2D, Canvas, Color, Mouse, Tween");
            this.w = SYMBOL_WIDTH;    // width
            this.h = SYMBOL_HEIGHT;    // height
            
            this.bind("EnterFrame", function(e) {
                if (this._alpha < 0.1) {
                    this.destroy();
                }
            });
            
            // Click
            this.bind("Click", function(obj) {
                this.tween({alpha: 0.0}, 50);
                if (this._onClickCallback) this._onClickCallback({
                    x: obj.realX,     
                    y: obj.realY,
                    color: this._color
                });
            });
        },
        
        /**
         * function Erstellt das Symbol, bis jetzt nur ein farbiges Quadrat
         */
        makeSymbol: function(x, y, color, onClickCallback) {
            this.attr({x: x, y: y}).color(color);
            this._onClickCallback = onClickCallback;
            return this;
        }
    });

    // "Game" component
    Crafty.c("Game", {
        init: function() {
            this.addComponent("2D, Canvas, Color");
            this.symbols = this._shuffle(COLORS); // Farben-Array wird gemischt
            this._setupGame(SYMBOL_WIDTH, SYMBOL_HEIGHT);
        	this.number = Crafty.e("Number").makeNumber(300, 100); // Number component wird benutzt
        },
                
        _setupGame: function() {
            this._game = [];
            
            var s = 0;
            for (var c = 0; c <= 1; c++) {		// Zwei Reihen
	            for (var r = 0; r < 5; r++) { 	// Anzahl pro Reihe 
	                var that = this;
	                var newSymbol = Crafty.e("Symbol").makeSymbol(100 + r * SYMBOL_WIDTH
	                                    , 250 + (SYMBOL_HEIGHT * 2 - (c + 1) * SYMBOL_HEIGHT) 
	                                    , this.symbols[s]
						                , function () {
						                    that._clickHandler.apply(that, arguments);	// bind to 'this' context!
						                }	
	                                    );
	                
	                this._game[r] = newSymbol;
	                s++;
	            }
	        }
        },
        
        _setupNumber: function() {
        	return Crafty.e("Number").makeNumber(300, 100); // Number component wird benutzt
        },
        
        /**
         * Mischfunktion fuer das Farben-Array (Misch-Algorithmus nach Fisher-Yates)
         * Everyday i'm shuffling
         */
        _shuffle: function(COLORS) {
            for (var n = 0; n < COLORS.length - 1; n++) {
                var k = n + Math.floor(Math.random() * (COLORS.length - n));
                var temp = COLORS[k];
                COLORS[k] = COLORS[n];
                COLORS[n] = temp;
            }
            
            console.log(COLORS); // Reihenfolge in die Logs geschrieben
            return COLORS; //Rueckgabe des gemischten Arrays
        },
        
        // Clickhandler
        _clickHandler: function(obj) {
            console.log(obj.color );
            if (obj.color === this.number._color ) {
                console.log('Farbe ist richtig');
            } else {
            	console.log('Farbe ist NICHT richtig');
            }
        }
       
    });
    
    // Game component wird benutzt
    Crafty.e("Game");
});
