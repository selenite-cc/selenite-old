var Bird = pc.createScript('bird');

Bird.attributes.add('flapVelocity', { type: 'number', default: 1 });
Bird.attributes.add('gravity', { type: 'number', default: 5 });
Bird.attributes.add('lowestHeight', { type: 'number', default: -0.25 });
Bird.attributes.add('radius', { type: 'number', default: 0.068 });

// initialize code called once per entity
Bird.prototype.initialize = function() {
    var app = this.app;
    
    this.velocity = 0;
    this.state = 'getready';
    this.paused = false;

    // Collision primitive for bird and pipe
    this.circle = { x: 0, y: 0, r: 0 };
    this.rect = { x: 0, y: 0, w: 0, h: 0 };

    this.initialPos = this.entity.getPosition().clone();
    this.initialRot = this.entity.getRotation().clone();

    this.pipes = app.root.findByTag('pipe');

    app.on('game:pause', function () {
        this.paused = true;
        this.entity.sprite.speed = 0;
    }, this);
    app.on('game:unpause', function () {
        this.paused = false;
        this.entity.sprite.speed = 1;
    }, this);
    app.on('game:press', function (x, y) {
        this.flap();
    }, this);
    
    this.on('enable', function () {
        app.on('game:press', function (x, y) {
            this.flap();
        }, this);
        this.reset();
    });
    this.on('disable', function () {
        app.off('game:press');
    });
    
    this.reset();
};

Bird.prototype.reset = function () {
    var app = this.app;

    this.velocity = 0;
    this.state = 'getready';
    this.entity.setPosition(this.initialPos);
    this.entity.setRotation(this.initialRot);
    this.entity.sprite.speed = 1;
};

Bird.prototype.flap = function () {
    var app = this.app;

    if (this.paused) return;
    
    if (this.state === 'getready') {
        app.fire('game:play');
        this.state = 'play';
        this.entity.sprite.speed = 2;
    }

    if (this.state === 'play') {
        app.fire('game:audio', 'Flap');
        this.velocity = this.flapVelocity;
    }
};

Bird.prototype.die = function (hitPipe) {
    var app = this.app;

    this.state = 'dead';
    this.entity.sprite.speed = 0;
    app.fire('game:audio', 'Hit');
    app.fire('flash:white');
    app.fire('game:gameover');
    if (hitPipe) {
        setTimeout(function () {
            app.fire('game:audio', 'Die');
        }, 500);
    }
};

Bird.prototype.circleRectangleIntersect = function  (circle, rect) {
    var cx = circle.x;
    var cy = circle.y;
    var cr = circle.r;
    var rx = rect.x;
    var ry = rect.y;
    var rw = rect.w;
    var rh = rect.h;

    var distX = Math.abs(cx - rx - rw / 2);
    var distY = Math.abs(cy - ry - rh / 2);

    if (distX > (rw / 2 + cr)) {
        return false;
    }
    if (distY > (rh / 2 + cr)) {
        return false;
    }

    if (distX <= (rw / 2)) {
        return true;
    }
    if (distY <= (rh / 2)) {
        return true;
    }

    var dx = distX - rw / 2;
    var dy = distY - rh / 2;
    return (dx * dx + dy * dy <= (cr * cr));
};

// update code called every frame
Bird.prototype.update = function(dt) {
    var app = this.app;
    
    if (this.paused) return;
    
    var playing = (this.state === 'play');
    var dead = (this.state === 'dead');

    if (playing) {
        if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
            this.flap();
        }
    }

    var pos = this.entity.getPosition();
    var posy = pos.y;

    if (playing || dead) {
        if (pos.y >= this.lowestHeight) {
            this.velocity -= this.gravity * dt;
            posy += this.velocity * dt;
            if (posy < this.lowestHeight) {
                posy = this.lowestHeight;
            }
            this.entity.setPosition(pos.x, posy, 0);

            // Map range -0.75 to -2 to 22.5 to -90
            var zrot = pc.math.clamp(this.velocity, -2, -0.75);
            zrot += 1;
            this.entity.setLocalEulerAngles(0, 0, zrot * 90);
        }
    }

    if (playing) {
        // Check for collision with ground
        if (posy <= this.lowestHeight) {
            this.die(false);
        }

        // Check for collision with pipes
        var rect = this.rect;
        var circle = this.circle;
        circle.x = pos.x;
        circle.y = pos.y;
        circle.r = this.radius;

        for (var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            var aabb = pipe.sprite._meshInstance.aabb; // TODO: Don't use sprite component internals!
            var min = aabb.getMin();
            var max = aabb.getMax();
            rect.x = min.x;
            rect.y = min.y;
            rect.w = max.x - min.x;
            rect.h = (pipe.name === 'Pipe Top') ? 1000 : max.y - min.y;

            if (this.circleRectangleIntersect(circle, rect)) {
                this.die(true);
            }
        }
    }
};
