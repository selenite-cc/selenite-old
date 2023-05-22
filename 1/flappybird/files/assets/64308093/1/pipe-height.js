var PipeHeight = pc.createScript('pipeHeight');

// initialize code called once per entity
PipeHeight.prototype.initialize = function() {
    var app = this.app;

    this.pipe1 = app.root.findByName('Pipe 1');
    this.pipe2 = app.root.findByName('Pipe 2');
    this.pipe3 = app.root.findByName('Pipe 3');

    this.heights = [];
    this.heights.push((Math.random() - 0.5) * 0.8 + 0.1);
    this.heights.push((Math.random() - 0.5) * 0.8 + 0.1);
    this.heights.push((Math.random() - 0.5) * 0.8 + 0.1);
    this.setPipeHeights();

    app.on('pipes:cycle', function () {
        this.heights.shift();
        this.heights.push((Math.random() - 0.5) * 0.75);
        this.setPipeHeights();
    }, this);
};

PipeHeight.prototype.setPipeHeights = function () {
    var pos;
    pos = this.pipe1.getLocalPosition();
    this.pipe1.setLocalPosition(pos.x, this.heights[0], pos.z);
    pos = this.pipe2.getLocalPosition();
    this.pipe2.setLocalPosition(pos.x, this.heights[1], pos.z);
    pos = this.pipe3.getLocalPosition();
    this.pipe3.setLocalPosition(pos.x, this.heights[2], pos.z);
};
