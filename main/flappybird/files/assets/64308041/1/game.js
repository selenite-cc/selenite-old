// The correct way to verify the availability of the local storage API taken from:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API    
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

var Game = pc.createScript('game');

// initialize code called once per entity
Game.prototype.initialize = function() {
    var app = this.app;

    this.score = 0;
    this.bestScore = 0;
    if (storageAvailable('localStorage')) {
        this.bestScore = localStorage.getItem('Flappy Bird Best Score');
        if (this.bestScore === null) {
            this.bestScore = 0;
        }
    }

    app.on('game:menu', function () {
        app.fire('flash:black');

        setTimeout(function () {
            app.root.findByName('Game Over Screen').enabled = false;
            app.root.findByName('Menu Screen').enabled = true;

            app.root.findByName('Game').findByName('Bird').enabled = false;
            app.fire('pipes:reset');
            app.fire('ground:start');
        }, 250);
    }, this);

    app.on('game:getready', function () {
        app.fire('flash:black');

        setTimeout(function () {
            app.root.findByName('Menu Screen').enabled = false;
            app.root.findByName('Game Screen').enabled = true;

            this.score = 0;
            app.fire('ui:score', this.score);

            app.root.findByName('Get Ready').sprite.enabled = true;
            app.root.findByName('Tap').sprite.enabled = true;

            app.root.findByName('Game').findByName('Bird').enabled = true;
        }.bind(this), 250);
    }, this);

    app.on('game:play', function () {
        app.fire('pipes:start');
        app.fire('ui:fadegetready');
    }, this);

    app.on('game:pause', function () {
        app.root.findByName('Pause Button').enabled = false;
        app.root.findByName('Play Button').enabled = true;
    }, this);

    app.on('game:unpause', function () {
        app.root.findByName('Play Button').enabled = false;
        app.root.findByName('Pause Button').enabled = true;
    }, this);

    app.on('game:gameover', function () {
        app.root.findByName('Game Screen').enabled = false;
        app.root.findByName('Game Over Screen').enabled = true;

        app.fire('pipes:stop');
        app.fire('ground:stop');
        app.fire('ui:fadeingameover');
        app.fire('ui:showscoreboard', this.score, this.bestScore);

        // Check if we have a new high score and write it to local storage
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            if (storageAvailable('localStorage')) {
                localStorage.setItem('Flappy Bird Best Score', this.score.toString());
            }
        }

        setTimeout(function () {
            app.fire('game:audio', 'Swoosh');
        }, 500);
    }, this);

    app.on('game:addscore', function () {
        this.score++;
        app.fire('ui:score', this.score);
        app.fire('game:audio', 'Point');
    }, this);

    app.on('game:share', function () {
        var left = (screen.width / 2) - (640 / 2);
        var top = (screen.height / 2) - (380 / 2);

        var shareText = encodeURIComponent("I scored " + this.score + " in Flappy Bird! Beat that! http://flappybird.playcanvas.com/ Powered by @playcanvas #webgl #html5");
        var shareUrl = "https://twitter.com/intent/tweet?text=" + shareText;

        var popup = window.open(shareUrl, 'name', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + 640 + ', height=' + 380 +', top=' + top + ', left=' + left);
        if (window.focus && popup) {
            popup.focus();
        }
    }, this);

    app.on('game:audio', function (slot) {
        this.entity.sound.play(slot);
    }, this);
};
