var CameraAspect = pc.createScript('cameraAspect');

// initialize code called once per entity
CameraAspect.prototype.initialize = function() {
    this.currentOrthoHeight = this.entity.camera.orthoHeight;
};

CameraAspect.prototype.update = function(t) {
    var canvas = this.app.graphicsDevice.canvas;
    var aspectRatio = canvas.width / canvas.height;
    var orthoHeight = pc.math.clamp(0.72 / aspectRatio, 1, 2);
    if (orthoHeight !== this.currentOrthoHeight) {
        this.entity.camera.orthoHeight = orthoHeight;
        this.currentOrthoHeight = orthoHeight;
    }
};
