var Sparkle = pc.createScript('sparkle');

Sparkle.attributes.add('radius', { type: 'number', default: 1 });

// initialize code called once per entity
Sparkle.prototype.initialize = function() {
    this.initialPos = this.entity.getLocalPosition().clone();

    // On every new loop of the sprite animation, restart it in a different, random
    // position within the bounds of the medal
    this.entity.sprite.on('loop', function () {
        // Calculate a random point within a circle
        var angle = Math.random() * Math.PI * 2;
        var radius = Math.random() * this.radius;
        var x = Math.cos(angle) * radius;
        var y = Math.sin(angle) * radius;

        this.entity.setLocalPosition(this.initialPos.x + x, this.initialPos.y + y, this.initialPos.z);
    }, this);
};
