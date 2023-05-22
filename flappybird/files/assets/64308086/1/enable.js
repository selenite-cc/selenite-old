var Enable = pc.createScript('enable');

Enable.attributes.add('enableEvent', { type: 'string' });
Enable.attributes.add('disableEvent', { type: 'string' });

// initialize code called once per entity
Enable.prototype.initialize = function() {
    this.app.on(this.enableEvent, function () {
        this.entity.enabled = true;
    }, this);

    this.app.on(this.disableEvent, function () {
        this.entity.enabled = false;
    }, this);
};
