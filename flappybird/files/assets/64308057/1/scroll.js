var Scroll = pc.createScript('scroll');

Scroll.attributes.add('startEvent', { type: 'string', default: 'start' });
Scroll.attributes.add('stopEvent', { type: 'string', default: 'stop' });
Scroll.attributes.add('resetEvent', { type: 'string', default: 'reset' });
Scroll.attributes.add('cycleEvent', { type: 'string', default: 'cycle' });
Scroll.attributes.add('startX', { type: 'number', default: 1 });
Scroll.attributes.add('endX', { type: 'number', default: -1 });
Scroll.attributes.add('speed', { type: 'number', default: 1 });
Scroll.attributes.add('frozen', { type: 'boolean', default: false });

// initialize code called once per entity
Scroll.prototype.initialize = function() {
    var app = this.app;

    this.paused = false;
    this.initialPos = this.entity.getPosition().clone();
    this.initialRot = this.entity.getRotation().clone();

    app.on(this.resetEvent, function () {
        this.entity.setPosition(this.initialPos);
        this.entity.setRotation(this.initialRot);
    }, this);
    app.on(this.startEvent, function () {
        this.frozen = false;
    }, this);
    app.on(this.stopEvent, function () {
        this.frozen = true;
    }, this);
    app.on('game:pause', function () {
        this.paused = true;
    }, this);
    app.on('game:unpause', function () {
        this.paused = false;
    }, this);
};

// update code called every frame
Scroll.prototype.update = function(dt) {
    var app = this.app;

    if (!this.frozen && !this.paused) {
        this.entity.translateLocal(this.speed * dt / (1/60), 0, 0);
        
        // Check to see if we've scrolled beyond the window...
        var pos = this.entity.getLocalPosition();
        if (pos.x < this.endX) {
            // Translate back to the start
            this.entity.translateLocal(this.startX - this.endX, 0, 0);
            app.fire(this.cycleEvent);
        }
    }
};
