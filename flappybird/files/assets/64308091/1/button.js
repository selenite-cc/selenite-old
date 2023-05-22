var Button = pc.createScript('button');

Button.attributes.add('diplacement', { type: 'number', default: 0.00390625 });
Button.attributes.add('event', { type: 'string' });

// initialize code called once per entity
Button.prototype.initialize = function() {
    var app = this.app;

    this.pressed = false;
    this.min = new pc.Vec3();
    this.max = new pc.Vec3();

    app.on('ui:press', function (x, y, obj) {
        if (!obj.processed) {
            this.press(x, y, obj);
        }
    }, this);
    app.on('ui:release', function (x, y) {
        this.release();
    }, this);

    this.on('enable', function () {
        app.on('ui:press', function (x, y, obj) {
            if (!obj.processed) {
                this.press(x, y, obj);
            }
        }, this);
        app.on('ui:release', function (x, y) {
            this.release();
        }, this);
    });
    this.on('disable', function () {
        app.off('ui:press');
        app.off('ui:release');

        this.pressed = false;
    });
};

Button.prototype.checkForClick = function (x, y) {
    var app = this.app;
    var cameraEntity = app.root.findByName('Camera');
    var aabb = this.entity.sprite._meshInstance.aabb;
    cameraEntity.camera.worldToScreen(aabb.getMin(), this.min);
    cameraEntity.camera.worldToScreen(aabb.getMax(), this.max);
    if ((x >= this.min.x) && (x <= this.max.x) &&
        (y >= this.max.y) && (y <= this.min.y)) {
        return true;
    }
    return false;
};

Button.prototype.press = function (x, y, obj) {
    if (this.checkForClick(x, y)) {
        this.pressed = true;
        this.entity.translate(0, -this.diplacement, 0);

        // This event has been intercepted by a button - don't send it on to the game
        obj.processed = true;
    }
};

Button.prototype.release = function () {
    var app = this.app;

    if (this.pressed) {
        this.pressed = false;
        this.entity.translate(0, this.diplacement, 0);
        app.fire(this.event);
        app.fire('game:audio', 'Swoosh');
    }
};
