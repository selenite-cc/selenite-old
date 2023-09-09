var Scoreboard = pc.createScript('scoreboard');

// initialize code called once per entity
Scoreboard.prototype.initialize = function() {
    var app = this.app;
    var assetRegistry = app.assets;

    this.score = {};
    this.score.current = 0;
    this.score.best = 0;

    app.on('ui:showscoreboard', function (current, best) {
        // Hide the OK and Share buttons until the scoreboard animations have completed
        app.root.findByName('OK Button').enabled = false;
        app.root.findByName('Share Button').enabled = false;

        // Cache the current and best scores
        this.score.current = 0;
        this.score.best = best;

        // Set the scores on the scoreboard
        app.fire('ui:current', 0);
        app.fire('ui:best', best);

        var medal = this.entity.findByName('Medal');
        medal.enabled = false;
        var newScore = this.entity.findByName('New');
        newScore.enabled = false;

        // Linearly tween the current score from 0 upwards over 500ms
        var tween = new TWEEN.Tween(this.score)
            .to({ current: current }, 500 )
            .onUpdate(function (obj) {
                var score = Math.round(obj.current);
                app.fire('ui:current', score);
                if (score > best) {
                    app.fire('ui:best', score);
                }
            })
            .onComplete(function () {
                // Display the appropriate medal based on the score...
                if (current >= 40) {
                    medal.sprite.sprite = assetRegistry.find('Medal Platinum', 'sprite').resource;
                } else if (current >= 30) {
                    medal.sprite.sprite = assetRegistry.find('Medal Gold', 'sprite').resource;
                } else if (current >= 20) {
                    medal.sprite.sprite = assetRegistry.find('Medal Silver', 'sprite').resource;
                } else if (current >= 10) {
                    medal.sprite.sprite = assetRegistry.find('Medal Bronze', 'sprite').resource;
                }
                // ...but only if the user scored over 10 points
                medal.enabled = current >= 10;

                // Point out whether it's a new high score
                if (current > best) {
                    newScore.enabled = true;
                }
            
                // Allow player to progress...
                app.root.findByName('OK Button').enabled = true;
                app.root.findByName('Share Button').enabled = true;
            })
            .delay(1750)
            .start();
    }, this);
};
