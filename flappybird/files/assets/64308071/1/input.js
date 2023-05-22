var Input = pc.createScript('input');

// initialize code called once per entity
Input.prototype.initialize = function() {
    var app = this.app;

    var press = function (x, y) {
        var obj = {
            processed: false
        };
        app.fire('ui:press', x, y, obj);
        
        // If the UI didn't handle the mousedown/touch, sent it on to the game
        if (!obj.processed) {
            app.fire('game:press', x, y);
        }
    };
    var mouseDown = function (e) {
        e.preventDefault();

        press(e.clientX, e.clientY);
    };
    var touchStart = function (e) {
        e.preventDefault();

        var touch = e.changedTouches[0];
        press(touch.clientX, touch.clientY);
    };
    var release = function (e) {
        app.fire('ui:release');
    };

    window.addEventListener('mousedown', mouseDown, { passive: false });
    window.addEventListener('mouseup', release, { passive: false });
    window.addEventListener('touchstart', touchStart, { passive: false });
    window.addEventListener('touchend', release, { passive: false });
};
