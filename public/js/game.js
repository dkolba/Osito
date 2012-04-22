window.onload = (function() {
    var WIDTH = 800,
        HEIGHT = 640;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
    
    /*
     * Create an entity with Crafty.e(..) that
     *  - can be drawn (2D) on a HTML canvas (Canvas)
     *  - has a background color (Color)
     *  - can be moved with WASD or arrow keys (Fourway)
     */
    var pl = Crafty.e("2D, Canvas, Color, Fourway")
                .attr({x: 160, y: 96, w: 32, h: 32}) // for Component 2D
                .color("#eeeeee") // for Component Color
                .fourway(10); // for Component Fourway

    // log the created entity to the JS console
    console.log(pl);
});
