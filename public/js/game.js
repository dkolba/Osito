window.onload = (function() {
    var WIDTH = 640,
    	HEIGHT = 800,
        SYMBOL_WIDTH = 100 ,
		SYMBOL_HEIGHT = 100;
    Crafty.init(WIDTH, HEIGHT);

    // "Number" component, kann eigentlich noch gar nix
    Crafty.c("Number", {
        init: function() {
            this.addComponent("2D, Canvas, Color");

            this.w = SYMBOL_WIDTH;    // width
            this.h = SYMBOL_HEIGHT;    // height
        },
                
        makeBox: function(x, y, color, z) {
            this.attr({x: x, y: y}).color(color);
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
    	
    	// Vordefinierte "Symbole" hier einfach Farben
    	COLORS: ["#F00", "#0F0", "#FF0", "#F0F", "#0FF"],
    	
        init: function() {
            this.addComponent("2D, Canvas, Color");
            this.symbols = this._shuffle(this.COLORS); // Farben-Array wird gemischt
            this._setupGame(SYMBOL_WIDTH, SYMBOL_HEIGHT);
        },
                
        _setupGame: function() {
            this._game = [];
            for (var r = 0; r < this.COLORS.length; r++) { // Fuer Anzahl der Farben im Array
            	
                var that = this;
                var newSymbol = Crafty.e("Symbol").makeSymbol(100 + r * SYMBOL_WIDTH
                                    , 250
                                    , this.symbols[r]
					                , function () {
					                    that._clickHandler.apply(that, arguments);	// bind to 'this' context!
					                }	
                                    );
                
                this._game[r] = newSymbol;
            }
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
            console.log(obj.x, obj.y ); // Log Koordinaten
            var aPos = this._translateToArrayPos(obj.x);
            console.log(aPos);			// Log Array Position
        },
       
        // Uebersetzt Klickpostition in ArrayPosition
        _translateToArrayPos: function(x) {
            return {
                x: Math.floor((x - 100) / SYMBOL_WIDTH)
            };
        }
    });
    
    // Number component wird benutzt
    Crafty.e("Number").makeBox(300, 100, "#F00");
    console.log("Number");

    // Game component wird benutzt
    Crafty.e("Game");
    console.log("Game");
});
