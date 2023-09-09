var Score = pc.createScript('score');

Score.attributes.add('name', { type: 'string', default: 'score' });
Score.attributes.add('display', { type: 'entity', array: true });
Score.attributes.add('numbers', { type: 'asset', assetType: 'sprite', array: true });

// initialize code called once per entity
Score.prototype.initialize = function() {
    var app = this.app;

    // Convert an integer to a character array
    var numberToCharArray = function (number, result) {
        var numberStr = number.toString();

        result.length = 0;
        for (var i = 0, len = numberStr.length; i < len; i++) {
            result.push(+numberStr.charAt(i));
        }
    };

    var splitScore = [];
    app.on('ui:' + this.name, function (score) {
        numberToCharArray(score, splitScore);

        // Set -1 for score display digits that are blank
        while (splitScore.length < this.display.length) {
            splitScore.unshift(-1);
        }
        
        var numbers = this.numbers;

        this.display.forEach(function (digit, idx) {
            var spriteIdx = splitScore[idx];
            digit.enabled = spriteIdx !== -1;
            if (spriteIdx !== -1) {
                digit.sprite.sprite = numbers[spriteIdx].resource;
            }
        });
    }, this);
};
