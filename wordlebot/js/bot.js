var averages = [];
var newlist = [];

function reduceTestList(list) {
    for (let i = 0; i < list.length; i++) {
        if (vowelCount(list[i]) > 1) {
            list.splice(i, 1);
            i--;
        }
    }
    return list;
}

function vowelCount(word) {
    return count(word, 'A') + count(word, 'E') + count(word, 'I') + count(word, 'O') + count(word, 'U');
}

function getStartingWords(difficulty) {
    let guesses = getFirstGuesses(difficulty);
    let starting_words = guesses.map(a => a.word);

    console.log(starting_words);
    return starting_words;
}

function testStartingWords() {
    console.log("testing");
    
    difficulty = HARD;
    // difficulty = NORMAL;
    
    let check_list = getStartingWords(difficulty);

    const diff = INCORRECT.repeat(word_length);
    const hash_key = diff + "-" + wordbank + "-" + difficulty;

    let i = 0;
    let current = -1;

    let iv = setInterval(function() {
        if (averages.length > current) {
            current = averages.length;

            makeTables(check_list[i], 'testing');
            setupTest(check_list[i]);

            if (document.getElementById("summary")) {
                document.getElementById("summary").remove();
            }

            if (document.getElementById("test-settings")) {
                document.getElementById("test-settings").remove();
            }
            
            runBot(check_list[i], difficulty);
            i++;
        }
        
        if (i >= check_list.length-1) {
            clearInterval(iv);
        }
    }, 1);
}

function removeTest(animating) {
    if (animating) {
        clearInterval(animating);
        animating = false;
    }

    if (document.getElementById("results")) {
        document.getElementById("results").remove();
    } 

    clearGrids();
    document.getElementById("word-entered").disabled = false;
    document.getElementById("word-entered").disabled = false;
    document.getElementsByClassName("info")[0].disabled = false;
    document.getElementsByClassName("test")[0].disabled = false;
    document.getElementById('suggestions').classList.remove('testing');
}

function createBarGraphs(max_guesses) {
    if (document.getElementById("results")) {
        document.getElementById("results").remove();
    } 

    let average = createElement('div', '', 'average');
    let current = createElement('div', '', 'current');
    let test_center = createElement('div', '', 'testing', 'results');
    test_center.append(average);
    test_center.append(current);
    
    for (let i = 0; i < max_guesses; i++) {
        let bar = createElement('div', '', 'bar')
        let num_guesses = createElement('span', i+1, 'num-guesses');
        let count = createElement('span', '', 'count');

        bar.append(num_guesses);
        bar.append(count);
        test_center.append(bar);
    }

    if (!bot.isFor(ANTI)) test_center.innerHTML += "<div class = 'bar x'><span class = 'num-guesses'>X" + "</span><span class = 'count'></span></div>";
    test_center.innerHTML += "<button class = 'close'></button>";
    document.getElementById("suggestions").appendChild(test_center);    

    let count = document.getElementsByClassName("count");
    for (let i = 0; i < count.length; i++) {
        count[i].innerHTML = "0";
        document.getElementsByClassName("bar")[i].style.height = "1.125rem";
    }

    return test_center;
}

function removeNonBotElements() {
    document.getElementById("word-entered").disabled = true;
    document.getElementsByClassName("info")[0].disabled = true;
    document.getElementsByClassName("test")[0].disabled = true;
    clearGrids();

    document.getElementsByClassName("current")[0].appendChild(
        document.getElementById('hints')
    );

    clearHTML(document.getElementById('next-previous-buttons'));
}

function createBotMenu() {
    let menu = createElement('div', '', '', 'test-settings');

    let hard = "<div class = 'disclaimer'>If the bot starts out slow, don't worry. It will get increasingly faster as it plays more games.</div>";
    let submit_button = "<button class = 'bot'>Start WordleBot</button>";
    let input = "<input type = 'text' id = 'testword' placeholder='your starting word'"
                + "input onkeypress = 'return /[a-z]/i.test(event.key)' oninput= 'this.value = this.value.toUpperCase()'>"

    let info = "<div class = 'info'> The " + bot.type + "Bot will test " + input + " against " + TEST_SIZE + " randomly selected answers on hard mode.</div>";
    menu.innerHTML = info + hard + submit_button;

    return menu;
}

function resetGuessRows() {
    document.getElementById("guesses").appendChild(
        document.getElementById('hints')
    );    
    let rows = document.getElementById('hints')
    let buttons = document.getElementById("next-previous-buttons");
    swapDiv(buttons, rows);
    clearGrids();
}

function swapDiv(event, elem) {
    elem.parentNode.insertBefore(elem, event);
}

function setupTest(word) {
    if (bot.isFor(XORDLE) || bot.isFor(FIBBLE) || bot.getCount() > 2) {
        return;
    }

    TEST_SIZE = Math.min(500, common.length);
    // TEST_SIZE = common.length;

    let difficulty = HARD;
    // let difficulty = NORMAL;

    let num_guesses = bot.guessesAllowed();
    if (num_guesses == INFINITY) num_guesses = 6;
    let test_center = createBarGraphs(num_guesses);

    let menu = createBotMenu(word);
    test_center.appendChild(menu);

    let input = document.getElementById('testword');
    input.focus();
    input.select();

    removeNonBotElements(word);
    document.getElementById('suggestions').classList.add('testing');

    let num = document.getElementsByClassName('close').length-1;
    document.getElementsByClassName("close")[num].addEventListener('click', function() {            
        pairings = [];
        resetGuessRows();
        removeTest();
    });

    document.getElementsByClassName("bot")[0].addEventListener("click", function() {
        let word = document.getElementById('testword').value;
        if ((word.length >= 4 && word.length <= 11) || (word.length == 3 && bot.isFor(THIRDLE)))  {
            document.getElementById("word-length").value = word.length;
            setLength();
            setWordbank();

            if (words.includes(word) || (bot.isFor(THIRDLE) && word.length == 3)) {
                document.getElementById("test-settings").remove();
                update();
                runBot(word, difficulty);
            }
        }
    });
}

function placeTestRows(word) {
    makeTables(word, 'testing');
    clearHTML(document.getElementById('next-previous-buttons'));
}

function getTestAnswers(TEST_SIZE, random_answers) {
    if (TEST_SIZE >= common.length) return common.slice();
    if (TEST_SIZE == random_answers.length) return random_answers;

    random_answers.push(getRandomAnswer(random_answers));

    return getTestAnswers(TEST_SIZE, random_answers);
}

function getRandomAnswer(random_answers) {
    let index = Math.floor(Math.random()*(common.length-1));
    if (bot.getCount() > 1) {
        let indices = [index];

        for (let i = 0; i < bot.getCount()-1; i++) {
            let new_index = indices[0];
            
            while (indices.includes(new_index)) {
                new_index = Math.floor(Math.random()*(common.length-1));
            }

            indices.push(new_index);
        }

        let answers = [];

        for (let i = 0; i < bot.getCount(); i++) {
            answers.push(common[indices[i]]);
        }

        return answers;
    } else if (bot.isFor(XORDLE)) {
        let pair_index = Math.round(Math.random()*(common.length-1));
        if (bot.getDifference(common[index], common[pair_index]) == INCORRECT.repeat(word_length)) {
            return {word1: common[index], word2: common[pair_index]};
        }
    }

    return common[index];
}

function adjustBarHeight(points, scores, total_sum, games_played) {
    if (points >= document.getElementsByClassName('bar').length) extendBarGraphs(document.getElementsByClassName('bar').length, points);

    let max = Math.max(...scores);
    let bars = document.getElementsByClassName("bar");
    document.getElementsByClassName("count")[points].innerHTML = scores[points];
        
    for (let x = 0; x < bars.length; x++) {
        bars[x].style.height = "calc(1.125rem + " + ((scores[x]/max)*100)*.4 + "%)";
    }

    document.getElementsByClassName("average")[0].innerHTML = "Average: " + (total_sum/games_played).toFixed(3);
}

function extendBarGraphs(current_length, new_max) {
    let board = document.getElementById('results');
    
    for (let i = current_length; i <= new_max; i++) {
        board.innerHTML += "<div class = 'bar'><span class = 'num-guesses'>" + (i+1) + "</span><span class = 'count'></span></div>";
    }

    let count = document.getElementsByClassName("count");
    for (let i = current_length; i <= new_max; i++) {
        count[i].innerHTML = "0";
        document.getElementsByClassName("bar")[i].style.height = "1.125rem";
    }
}

function showResults(guess, correct, total_tested, average, words_missed) {
    resetGuessRows();

    clearHTML(document.getElementsByClassName('average')[0]);
    let summary = guess + " solved " + correct + "/" + total_tested 
    + " words with an average of " + average + " guesses per solve.";   

    if (words_missed.length) {
        summary += showMissedWords(words_missed);
    }

    document.getElementsByClassName("current")[0].innerHTML = "<div id = 'summary'>" + summary + "</div>";
}   

function showMissedWords(words_missed) {
    let missed = "<div id = 'wrongs'>Missed words: ";
        for (let i = 0; i < words_missed.length; i++) {
            missed += printAnswer(words_missed[i]);
            if (i < words_missed.length - 1) {
                missed += ", ";
            }
        }
    return missed + "</div>"
}

function runBot(guess, difficulty) {
    const start_time = performance.now();

    let sum = 0;
    let count = 0;
    let missed = [];

    let num_guesses = bot.guessesAllowed();
    if (num_guesses == INFINITY) num_guesses = 6;
    let scores = new Array(num_guesses).fill(0);

    let testing_sample = getTestAnswers(TEST_SIZE, []);
    let final_scores = []

    // let full_list = words.filter(a => a.length == word_length);

    let iv = setInterval(function() {
        clearGrids();

        // guess = randomElementOf(full_list);

        let points = wordleBot(guess,  testing_sample[count], difficulty);
        if (points > bot.guessesAllowed()) {
            missed.push(testing_sample[count]);
        }

        if (!final_scores[points]) final_scores[points] = [];
        final_scores[points].push(testing_sample[count]);

        pairings = [];

        sum += points;

        if (points > scores.length) scores = extendArray(scores, points, 0)
        scores[points-1] += 1;

        adjustBarHeight(points-1, scores, sum, count+1);
        count++;

        document.getElementsByClassName("close")[1].addEventListener('click', function() {
            resetGuessRows();
            removeTest(iv);
        });

        if (count >= TEST_SIZE) {
            let average = parseFloat(sum/count);
            let wrong = missed.length/common.length;
            
            showResults(guess, TEST_SIZE - missed.length, TEST_SIZE, average.toFixed(3), missed);
            updateWordData(guess, average, wrong, difficulty);
            printData(newlist, guess, average, (performance.now() - start_time)/1000);
            
            pairings = [];

            console.log(final_scores);
            clearInterval(iv);
        }
    }, 1);
}

function extendArray(array, new_max, value) {
    for (let i = 0; i < new_max; i++) {
        if (!array[i]) array[i] = value;
    }

    return array;
}

function updateWordData(guess, average, wrong, difficulty) {
    averages.push({word: guess, average: average, wrong: wrong});
    averages.sort((a, b) => a.average >= b.average ? 1 : -1);
    if (TEST_SIZE < common.length) return;

    if (!newlist.length) {
        if (isDifficulty(HARD) && bot.hasHardMode()) newlist = hard;
        else newlist = easy;
    }

    let index = newlist[bot.type].map(a => a.word).indexOf(guess);
    let data = {average: average, wrong: wrong};

    if (index == -1) {
        newlist[bot.type].push({word: guess});
        index = newlist[bot.type].length - 1;
    } 
            
    newlist[bot.type][index][wordbank] = data;
}

function printData(all_words, guess, average, time) {
    console.log(all_words);
    console.log(averages.map(a => a.word).indexOf(guess) + ": " + guess + " --> " + average + " --> " + time + " seconds");
    console.log(averages);
    console.log(seconds);
}

function wordleBot(guess, answer, difficulty) {
    let attempts = 1;
    let correct = 0;

    while (attempts <= bot.guessesAllowed()) {
        makeTables(guess, "testing");

        let diff;

        if (bot.getCount() > 1) {
            diff = getMultiDifference(guess, answer);
        } else {
            diff = [bot.getDifference(guess, answer)];
        }

        for (let i = 0; i < bot.getCount(); i++) {
            let grid = document.getElementsByClassName('grid')[i];
            bot.setRowColor(diff[i], grid.getElementsByClassName('row')[(attempts-1)]);
        }


        if (answerFound(guess, answer)) {
            if (bot.isFor(XORDLE)) {
                makeTables(otherAnswer(guess, answer), "testing");
                bot.setRowColor(CORRECT.repeat(word_length), document.getElementsByClassName('row')[attempts])
            }
            
            correct++;

            if (correct == bot.getCount()) {
                break;
            }
        } 
        attempts++;

        let lists = getPotentialGuessesAndAnswers(difficulty);
        // if (attempts < bot.guessesAllowed()) {
        //     guess = randomElementOf(lists.all);
        // } else {
        //     guess = randomElementOf(lists.answers);
        // }

        final_guesses = getBestGuesses(lists.answers, lists.guesses, difficulty, lists.unique);
        guess = final_guesses[0].word;  
    }


    return attempts;
}

function getMultiDifference(guess, answers) {
    let diffs = [];

    for (let i = 0; i < answers.length; i++) {
        let color = bot.getDifference(guess, answers[i]);
        diffs.push(color);
    }

    return diffs;
}

function otherAnswer(answer, answers) {
    if (answer == answers.word1) return answers.word2;
    return answers.word1;
}

function answerFound(guess, answer) {
    if (guess == answer) return true;

    if (bot.isFor(XORDLE)) {
        if (guess == answer.word1 || guess == answer.word2) return true;
    }

    if (bot.getCount() > 1) {
        if (answer.includes(guess)) return true;
    }

    return false;
}