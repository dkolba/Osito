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
 
            this.bind("Click", function(e) {
                this.tween({alpha: 0.0}, 50);
            });
        },
        
        /**
         * function Erstellt das Symbol, bis jetzt nur ein farbiges Quadrat
         */
        makeBox: function(x, y, color) {
            this.attr({x: x, y: y}).color(color);
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
                var newSymbol = Crafty.e("Symbol").makeBox(100 + r * SYMBOL_WIDTH
                                    , 250
                                    , this.symbols[r]
                                    );
                this._game[r] = newSymbol;
            }
        },
        
        /**
         * Mischfunktion fuer das Farben-Array (Misch-Algorithmus nach Fisher-Yates)
         */
        _shuffle: function(COLORS) {
            for (var n = 0; n < COLORS.length - 1; n++) {
                var k = n + Math.floor(Math.random() * (COLORS.length - n));
                var temp = COLORS[k];
                COLORS[k] = COLORS[n];
                COLORS[n] = temp;
            }
            
            console.log(COLORS); // noch nicht rausgefunden, wo ma diese Logs einsehen kann
            return COLORS; //Rueckgabe des gemischten Arrays
        }
        
    });
    
    // Number component wird benutzt
    Crafty.e("Number").makeBox(300, 100, "#F00");

    // Game component wird benutzt
    Crafty.e("Game");
});
