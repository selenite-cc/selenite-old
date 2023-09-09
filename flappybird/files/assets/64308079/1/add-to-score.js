var AddToScore = pc.createScript('addToScore');

AddToScore.attributes.add('bird', { type: 'entity' });

// initialize code called once per entity
AddToScore.prototype.initialize = function() {
    this.lastX = this.entity.getPosition().x;
};

// update code called every frame
AddToScore.prototype.update = function(dt) {
    var app = this.app;

    var birdX = this.bird.getPosition().x;
    var pipeX = this.entity.getPosition().x;

    if ((pipeX <= birdX) && (this.lastX > birdX)) {
        app.fire('game:addscore');
    }

    this.lastX = pipeX;
};
