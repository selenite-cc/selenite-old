var word_length = 5;
var wordbank = 'restricted';
var pairings = [];
var seconds = {};

// word length constants
const SMALLEST_WORD = 3, LARGEST_WORD = 11, DEFAULT_LENGTH = 5;
// class constants to assign colors to tiles
const CORRECT = "G", INCORRECT = "B", WRONG_SPOT = "Y", EMPTY = "X"; 
// difficulty constants
const NORMAL = 0, HARD = 1;
// list size constants
const CHECK_SIZE = 50, TOP_TEN_LENGTH = 10, MAX_TIME = 1000;
// misc constants
const NOT_YET_TESTED = .999, SIZE_FACTOR = 5, INFINITY = 9999999;

function setBotMode(type) {
    bot = new Bot(type);
    setMaxGuesses();

    pairings = [];
}

function setMaxGuesses() {
    if (!localStorage.getItem('guesses' + bot.type)) {
        if (bot.isFor(DORDLE)) {
            localStorage.setItem('guesses' + bot.type, 7);
        } else if (bot.isFor(WOODLE) || bot.isFor(HARDLE)) {
            localStorage.setItem('guesses' + bot.type, 8);
        } else if (bot.isFor(XORDLE) || bot.isFor(FIBBLE) || bot.isFor(QUORDLE)) {
            localStorage.setItem('guesses' + bot.type, 9);
        } else if (bot.isFor(OCTORDLE)) {
            localStorage.setItem('guesses' + bot.type, 13);
        }
    }
}

function setLength() {
    word_length = document.getElementById("word-length").value;

    document.getElementById('word-entered').setAttribute('maxlength', word_length); 
    document.getElementById('word-entered').value = "";
    clearHTML(document.getElementById('next-previous-buttons'));
    
    words = big_list.filter((a) =>  a.length == word_length);
    // words = official_guesses.slice(); // uncomment to use original wordle guess list
    
    clearGrids();
    setWordbank();
}

function setWordbank() {
    let banks = document.getElementsByClassName('wordbank');

    for (let i = 0; i < banks.length; i++) {
        if (banks[i].checked == true) {
            wordbank = banks[i].id;
            break;
        }

        if (i == banks.length - 1) {
            banks[0].checked = true;
        }
    }

    if (wordbank == 'restricted') {
        common = common_words.slice();
    } else {
        common = all_common_words.slice();
    }

    common = common.filter(a => a.length == word_length).sort();
    common = [...new Set(common)];
    // common = officical_answers.slice(); // uncomment to use original wordle answer list 
}

function getBestOf(list) {
    let best_list;
    
    if (list[bot.type]) {
        best_list = list[bot.type];
        best_list = best_list.filter(a => a[wordbank] != null);
        best_list = best_list.map(a => Object.assign({}, {word: a.word, average: a[wordbank].average, wrong: a[wordbank].wrong}));
        return best_list;
    }

    list[bot.type] = [];
    return list[bot.type];
}

// gets all possible likely and unlikely answers left
// sorts the answer & potential guess list based on the most common letters
// gets the best guesses for normal and hard mode
// passes the data to update the list of suggestions and letters in the HTML
function update() {
    let difficulty = getDifficulty();
    let lists = getPotentialGuessesAndAnswers(difficulty);
    let best_guesses = [];

    if (!timeToShowFinalOptions(lists.unique)) {
        best_guesses = getBestGuesses(lists.answers, lists.guesses, difficulty, lists.unique);
        best_guesses = removeUsedGuesses(best_guesses);
    }

    updateLists(lists.answers, lists.unlikely, best_guesses);
}

function removeUsedGuesses(list) {
    for (let i = 0; i < guessesMadeSoFar(); i++) {
        list = list.filter(function(a) { return a.word !== getWord(i); });
    }

    return list;
}

function uniqueWordsFrom(list) {
    if (!list.length) return [];

    if (typeof list[0] == 'object') {
        let unique = [];
        for (let i = 0; i  < list.length; i++) {
            unique = combineLists(unique, Object.values(list[i]));
        }

        return [... new Set(unique)];
    } else return [... new Set(list)];
}

function dontNeedToCheck(answers, unique_answers) {
    return (answers.length <=2 && !bot.isFor(ANTI) && bot.getCount() == 1)
            || (unique_answers.length <= 2 && !bot.isFor(ANTI))
            || numberOfGuessesMadeIs(0)
}

function separateListByLikelihood(list) {
    let likely = [];
    let unlikely = [];
    
    for (let i = 0; i < list.length; i++) {
        if (Array.isArray(list[i])) {
            let new_lists = separateListByLikelihood(list[i]);
            likely.push(new_lists.likely);
            unlikely.push(new_lists.unlikely)
        } 
        
        else if (bot.isLikely(list[i])) {
            likely.push(list[i]);
        } 
        
        else {
            unlikely.push(list[i]);
        }
    }

    return {likely: likely, unlikely: unlikely};
}

function getPotentialGuessesAndAnswers() {
    let all_possible_answers = bot.getAllPossibleAnswersFrom(words.slice());
    let separated_lists = separateListByLikelihood(all_possible_answers);
    let answer_list = separated_lists.likely;
    let unlikely_answers = separated_lists.unlikely;
    let unique_answers= uniqueWordsFrom(answer_list);
    
    if (dontNeedToCheck(answer_list, unique_answers)) {
        return {
                guesses: unique_answers, 
                answers: answer_list, 
                unique: unique_answers,
                all: all_possible_answers, 
                unlikely: unlikely_answers, 
            };
    }

    let alphabet = bot.getBestLetters(unique_answers);
    let sorted_answer_list = sortList(unique_answers, alphabet);
    let sorted_guess_list = initialGuesses(answer_list, sorted_answer_list, unique_answers, all_possible_answers, alphabet);

    return {
            guesses: sorted_guess_list, 
            answers: answer_list,
            unique: sorted_answer_list,
            all: all_possible_answers, 
            unlikely: unlikely_answers, 
        };
}

function initialGuesses(answer_list, sorted_answer_list, unique_answers, all_possible_words, alphabet) {
    let sorted_guess_list = words.slice();

    if (bot.isFor(THIRDLE)) sorted_guess_list = allCombinations("", []);
    
    if (twoAnswersLeft(answer_list) && !bot.isFor(ANTI)) {
        // sorted_guess_list = unique_answers;
        sorted_guess_list = sorted_answer_list;
    } else if (isDifficulty(HARD)){
        sorted_guess_list = uniqueWordsFrom(all_possible_words.slice());
        // sorted_guess_list = unique_answers.slice();
    } else if (bot.isFor(ANTI)) {
        sorted_guess_list = filterList(sorted_guess_list, 0, true);
    }

    sorted_guess_list = sortList(sorted_guess_list, alphabet);
    
    if (!bot.isFor(ANTI)) {
        sorted_guess_list = combineLists(sorted_answer_list, sorted_guess_list);
    }
    
    sorted_guess_list = reduceListSize(sorted_guess_list, sorted_answer_list, bot.getAnswerListLength(answer_list));
    // new_lists = reduceListSize(sorted_guess_list, sorted_answer_list, bot.getAnswerListLength(answer_list));
    // sorted_guess_list = new_lists.guesses;    

    return sorted_guess_list;
}

function twoAnswersLeft(answers) {
    if (bot.getCount() == 1) {
        return answers.length <= 2;
    }

    return uniqueWordsFrom(answers).length <= 2;
}

function getUnfoundAnswers(answer_lists) {
    unfound_answers = [];
    
    for (let i = 0; i < answer_lists.length; i++) {
        if (answer_lists[i].length == 1) {
            unfound_answers.push(answer_lists[i][0]);
        }
    }

    
    for (let i = 0; i < guessesMadeSoFar(); i++) {
        let colors = bot.getRowColor(i);

        if (colors.includes(CORRECT.repeat(word_length))) {
            let pos = unfound_answers.indexOf(getWord(i));

            if (pos != -1) {
                unfound_answers.splice(pos, 1);
            }
        }
    }
    

    return unfound_answers;
}

function allCombinations(string, list) {
    if (string.length == word_length) {
        list.push(string);
    } else {
        for (let c = 65; c <= 90; c++) {
            allCombinations(string + String.fromCharCode(c), list);
        }
    }

    return list;
}

// creates the suggetsions for both normal and hard mode
// updates the headers to reflect how many words are left
// adds those suggestions to the respective slides
// creates a dropdown list showing all possible words
function updateLists(likely_answers, unlikely_answers, best_guesses) {
    let guess_list = writeBestGuessList(best_guesses);

    updateHeaders(bot.getAnswerListLength(likely_answers), bot.getAnswerListLength(unlikely_answers));
    addToSlides("Your best possible guesses are:", guess_list);
    createAnswerDropdown(likely_answers, unlikely_answers);
    
    if (isEmpty(likely_answers) && isEmpty(unlikely_answers)) {
        return addToSlides("", noWordsLeftMessage());
    }

    if (timeToShowFinalOptions(likely_answers)) {
        // will only show the final two options as suggestions
        // ie: 'its either 'THIS' or 'THAT'
        return showFinalOptions(likely_answers, unlikely_answers);
    } 

    let unfound_answers = getUnfoundAnswers(likely_answers);
    if (unfound_answers.length) {
        addToSlides("", unfoundAnswersMessage(unfound_answers));
    }
}

function timeToShowFinalOptions(answers) {
    return bot.getAnswerListLength(answers) <= 2 && !bot.isFor(ANTI)
}

// creates and returns the top 10 list of suggestions
// suggestions will then be added to the HTLM of either the suggestions
// for hard mode or normal mode
function writeBestGuessList(guesses) {
    let data = "not fully tested";
    let list = [];
    let list_length = Math.min(guesses.length, TOP_TEN_LENGTH);

    for (let i = 0; i < list_length; i++) {
        let num_guesses = (guesses[i].average - guessesMadeSoFar()).toFixed(3);
        let percent_wrong = decimalToPercent(1-guesses[i].wrong);

        if (!notFullyTested(guesses[i])) {
            data = getDataFor(guesses[i], percent_wrong, num_guesses);
        }     

        let list_item = createListItem(guesses[i].word, data, i+1);
        list.push(list_item);
    }

    return list;
}

function getDataFor(guess, percent_wrong, num_guesses) {
    if (guess.wrong > 0) {
        return percent_wrong + " solve rate";
    }

    if (!guessesMadeSoFar(0)) {
        return num_guesses + " guesses";
    }

    return num_guesses + " guesses left";
}

function notFullyTested(guess) {
    return guess.wrong == NOT_YET_TESTED || bot.getCount() > 1;
}

function createListItem(word, data, rank) {
    let suggestion = createElement('span', word, 'click');
    let word_with_ranking = createElement('div', rank + ". " + suggestion.outerHTML, 'suggestion');
    let score = createElement('div', data, 'score');
    
    let list_item = createElement('li', word_with_ranking.outerHTML + score.outerHTML);
    return list_item;
}

// function updateHeaders(likely_answers, unlikely_answers) {
function updateHeaders(likely_length, unlikely_length) {
    let heading = document.getElementsByClassName("possibilities total")[0];
    let subheading = document.getElementsByClassName("possibilities separated")[0];
    let total_length = unlikely_length + likely_length;
    let class_name = numberOfGuessesMadeIs(0) ? '' : 'showlist';
    
    let likely_html = likely_length + " probable answer" + pluralOrSingle(likely_length, "", "s");
    let unlikely_html = unlikely_length + " unlikley possibilit" + pluralOrSingle(unlikely_length, "y", "ies");    
    let likely_span = createElement('span', likely_html, class_name);
    let unlikely_span = createElement('span', unlikely_html, class_name);

    if (guessesMadeSoFar() > 0) {
        likely_span.prepend(createElement('div', '', ''));
        unlikely_span.prepend(createElement('div', '', ''));
    }

    heading.innerHTML = total_length + " possibilit" + pluralOrSingle(total_length, "y", "ies");
    subheading.innerHTML = likely_span.outerHTML + ", " + unlikely_span.outerHTML + ".";
}

// creates a dropdown of all possible words left
// dropdown is viewable if you click on the section that lists 
// how many likely/unlikely answers are remaining
function createAnswerDropdown(likely_answers, unlikely_answers) {
    if (numberOfGuessesMadeIs(0)) return;
    
    let word_lists = document.getElementsByClassName("showlist");
    let potential_answers = word_lists[0].getElementsByTagName("div")[0];
    let technically_words = word_lists[1].getElementsByTagName("div")[0];

    for (let i = 0; i < likely_answers.length; i++) {
        addWordsToDiv(likely_answers[i], potential_answers, bot.getCount() > 1 ? COLORS[i] : "black");
    }

    for (let i = 0; i < unlikely_answers.length; i++) {
        addWordsToDiv(unlikely_answers[i], technically_words, bot.getCount() > 1 ? COLORS[i] : "black");
    }

    if (bot.getAnswerListLength(likely_answers) < 1) {
        setHTML(potential_answers, "goose egg");
    }

    if (bot.getAnswerListLength(unlikely_answers) < 1) {
        setHTML(technically_words, "goose egg")
    }
}

const COLORS = [
    "black", "green", "blue", "red", "purple", "orange", "brown", "gray"
];

function addWordsToDiv(words, div, color) {
    if (Array.isArray(words)) {
        for (let i = 0; i < words.length; i++) {
            addWordsToDiv(words[i], div, color);
        }
    } else {
        let answer = createElement('p', printAnswer(words), color);
        div.append(answer);
    }

}

const NO_WORDS_LEFT_MESSAGE = "it doesn't look like we have this word. double check to make sure you all the clues you entered are correct.";
function noWordsLeftMessage() {
    let message = createElement('div', NO_WORDS_LEFT_MESSAGE, '', 'nowords')
    return [message];
}

function unfoundAnswersMessage(unfound_answers) {
    let text = unfound_answers.length + " of the answers " + pluralOrSingle(unfound_answers.length, "is ", "are ");
                                                        
    for (let i = 0; i < unfound_answers.length; i++) {
        let answer = createElement('span', printAnswer(unfound_answers[i]), 'final');
        text += answer.outerHTML;

        if (i == unfound_answers.length-1) {
            text += "."
        }

        else if (i == unfound_answers.length-2) {
            text += ", and ";
        } else {
            text += ", ";
        }
    }                                                        

    let message = createElement('div', text, 'multi-answer');
    return [message];
}

// only called if there are less than two likely answers left
// shows: almost certainly 'THIS' or 'THAT'
// unlikely but it could be: 'SOMETHING', 'ELSE'
function showFinalOptions(sorted, less_likely) {
    let all_suggestions = [];

    if (bot.getCount() > 1) {
        sorted = uniqueWordsFrom(sorted);
        less_likely = uniqueWordsFrom(less_likely);
    }
    
    if (bot.getAnswerListLength(sorted)) {
        let final_words = createElement('li', '', 'likely');
        let first_answer = createElement('span', printAnswer(sorted[0]), 'final');
        final_words.innerHTML = "The word is almost certainly " + first_answer.outerHTML;

        if (sorted.length == 2) {
            let second_answer = createElement('span', printAnswer(sorted[1]), 'final');
            final_words.innerHTML += " or " + second_answer.outerHTML;
        } 

        final_words.innerHTML += ".";
        all_suggestions.push(final_words);
    }

    if (bot.getAnswerListLength(less_likely)) {
        let unlikely = createElement('li', "Unlikely, but it might be ", 'others');

        for (let i = 0; i < less_likely.length; i++) {
            let unlikely_answer = createElement('span', printAnswer(less_likely[i]), 'final');
            unlikely.innerHTML += unlikely_answer.outerHTML;

            (i < less_likely.length - 1) ? unlikely.innerHTML += ", " : unlikely.innerHTML += ".";
        } 

        all_suggestions.push(unlikely);
    }

    addToSlides("", all_suggestions);
}

function printAnswer(answer) {
    if (typeof answer == 'string') {
        return createElement('span', answer, 'click').outerHTML;
    }

    if (Array.isArray(answer) && answer.length) {
        return printAnswer(answer[0]);
    }

    if (typeof answer == 'object' && bot.isFor(XORDLE)) {
        return printAnswer(answer.word1) + "/" + printAnswer(answer.word2);
    }
}

// adds the heading, normal suggestsions, and hard suggestions
// to the respective HTML element
function addToSlides(heading_html, suggestions) {
    let header = document.getElementsByClassName("mini-title")[0];
    let list = document.getElementsByClassName('best-guesses')[0].getElementsByTagName('ul')[0];

    setHTML(header, heading_html);
    clearHTML(list);

    suggestions.forEach(function(a) {
        list.append(a);
    });
}

// returns the number of guesses made to far
function guessesMadeSoFar() {
    return document.getElementsByClassName("row").length/bot.getCount();
}

// checks if the number of guesses so far equals number
function numberOfGuessesMadeIs(number) {
    return guessesMadeSoFar() == number;
}

// checks if we're playing on hard mode or normal mode
function isDifficulty(difficulty) {
    return getDifficulty() == difficulty;
}

function getDifficulty() {
    if (botIsOn()) return true;
    return Number(document.getElementById("mode")?.checked);
}

function botIsOn() {
    return document.getElementById('results');
}

/* 
    TABLE FUNCTIONS
    creates the rows of guesses & buttons
    modifies the tiles/buttons when clicked
    accesses information about the guesses/current state
*/
function makeTables(val, c) {
    if (c == null) c = "normal";
    let grids = document.getElementsByClassName('grid');

    if (val) {
        for (let i = 0; i < bot.getCount(); i++) {
            let row = createRow(val, c);
            grids[i].append(row);
            bot.setChangeEvents(row);
        }
    }

    if (numberOfGuessesMadeIs(1) && c == 'normal') {
        addButtons();
        let full_grid = document.getElementById("hints");
        full_grid.classList.remove('empty');
    }

    document.getElementById("word-entered").value = "";
    clearValue(document.getElementById('word-entered'));
}

function createRow(word, mode) {
    let row = createElement('div', '', 'row ' + mode + ' ' + bot.type);

    for (let i = 0; i < word.length; i++) {
        let button = createElement('button', word.charAt(i), 'B tile ' + bot.type);
        row.append(button);
    }

    if (bot.isFor(WOODLE)) {
        row.append(makeWoodleDropdowns())
    }

    return row;
}

function makeWoodleDropdowns() {
    let container = createElement('div', '', 'tracker');
    let correct_count = createElement('select', '', 'woodle-count ' + CORRECT);
    let wrong_spot_count = createElement('select', '', 'woodle-count ' + WRONG_SPOT);

    container.append(correct_count);
    container.append(wrong_spot_count);

    return container;
}

function addButtons() {
    let undo = createElement('button', 'remove last guess', 'undo');
    let filter = createElement('button', 'calculate next guess', 'filter');
    let button_container = document.getElementById('next-previous-buttons');

    button_container.append(undo);
    button_container.append(filter);

    filter.addEventListener('click', function() {
        let difficulty = NORMAL;
        if (bot.hasHardMode()) {
            difficulty = getDifficulty();
        }
        update(difficulty);
    });

    undo.addEventListener('click', function() {
        let grids = document.getElementsByClassName('grid');

        for (let i = 0; i < grids.length; i++) {
            let rows = grids[i].getElementsByClassName('row');
            rows[rows.length-1].remove();
            
            if (!rows.length) {
                clearHTML(document.getElementById('next-previous-buttons'));
                let full_grid = document.getElementById('hints');
                full_grid.classList.add('empty');
            }
        }

        let difficulty = NORMAL;
        if (bot.hasHardMode()) {
            difficulty = getDifficulty();
        }
        update(difficulty);
    });
}

function getWord(number) {
    let row = document.getElementsByClassName("row")[number];
    let tiles = row.getElementsByClassName("tile");

    let guess = "";

    for (let i = 0; i < word_length; i++) {
        guess += tiles[i].innerHTML;
    }

    return guess;
}


/* 
    GUESS FUNCTIONS
    calculates the best guess at any given turn
    accesses guesses that are predetermined
    sets new guesses to memory
    finds the color difference between two words
*/

function guessesArePrecomputed(difficulty) {
    let diff = "";
    let word = "";
    for (let i = 0; i < guessesMadeSoFar(); i++) {
        diff += bot.getRowColor(i);
        word += getWord(i);
    }

    let hash = makeHash(bot.type, wordbank, difficulty, 
                        bot.guessesAllowed(), document.getElementsByClassName('warmle-selector')[0]?.value, diff);

    if (seconds[word] != null) {
        if (seconds[word][hash] != null) {
            return JSON.parse(seconds[word][hash]);
        }
    } else seconds[word] = {};

    return 0;
}

function makeHash(game, list_type, difficulty, guesses, extras, string) {
    return game + "/" + list_type + "/" + difficulty + "/" + guesses + "/" + extras + "/" + string;
}

function setBestGuesses(best_guesses, difficulty) {
    let diff = "";
    let word = "";
    for (let i = 0; i < guessesMadeSoFar(); i++) {
        diff += bot.getRowColor(i);
        word += getWord(i);
    }

    let hash = makeHash(bot.type, wordbank, difficulty, bot.guessesAllowed(), 
    document.getElementsByClassName('warmle-selector')[0]?.value, diff);

    seconds[word][hash] = JSON.stringify(best_guesses.slice(0, TOP_TEN_LENGTH));
}

function getBestGuesses(answer_list, guess_list, difficulty, unique_answers) {
    let best_guesses = guessesArePrecomputed(difficulty);
    
    if (best_guesses) { 
        return sortByWrongThenAverage(best_guesses);
    }

    if (numberOfGuessesMadeIs(0)) {
        return getFirstGuesses(difficulty);
    }
    
    if (answer_list.length > 1000) {
        return getTempList(guess_list, answer_list);
    }

    if (guessesMadeSoFar() == bot.guessesAllowed()-1) {
        guess_list = unique_answers;
    }

    let initial_guesses = bot.reducesListBest(answer_list, guess_list);
    
    if (bot.getCount() > 1) {
        best_guesses = initial_guesses;
    } else {
        best_guesses = calculateGuessList(unique_answers, guess_list, initial_guesses, difficulty);
    }    

    setBestGuesses(best_guesses, difficulty);
    return best_guesses;
}

// reduces list of possibilities when list is too large to check efficiently
function reduceListSize(guesses, answers, answers_size) {
    // if you have <10 words left, removeUselessGuesses will actually remove some ideal guesses
    if (answers.length > 10 && !bot.isFor(ANTI)) { 
        guesses = removeUselessGuesses(guesses, answers);
    }

    const MAXIMUM = 100000;
    // let reduced = false;
    if (answers_size * guesses.length * bot.getCount() > MAXIMUM) {
        // if (!bot.isFor(ANTI)) {
        //     guesses = combineLists(answers, guesses);
        // }
        
        let current = answers_size * guesses.length * bot.getCount();
        let ratio = current/MAXIMUM;
        
        guesses = guesses.slice(0, guesses.length/ratio);
        // reduced = true;
    }

    for (let guess = 0; guess < guessesMadeSoFar(); guess++) {
        guesses = guesses.filter(a => a != getWord(guess));
    }
    
    // return {guesses: guesses, answers: answers, reduced: reduced};
    return guesses;
}

// remove words that have letters already grayed out
// remove words that have yellow letters in the wrong spot
function removeUselessGuesses(list, possibilities) {
    let alphabet = bot.getBestLetters(possibilities);

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < word_length; j++) {
            let c = list[i].charAt(j);

            if (alphabet[c][word_length] == 0 || // if letter isn't in any of the words 
                (alphabet[c][j] == 0 && alphabet[c][word_length] == possibilities.length)) { // if letter isn't in that spot in any word
                list.splice(i, 1);
                i--;
                break;
            } 
        }
    }

    return list;    
}

function getFirstGuesses(difficulty) {
    let first_guesses = isDifficulty(HARD) ? hard : easy;
    first_guesses = getBestOf(first_guesses).filter(a => a.word.length == word_length);

    if (!first_guesses.length) {
        first_guesses = getTempList(words.slice(), common.slice());
    }

    return sortByWrongThenAverage(first_guesses);
}

function getTempList(guesses, answers) {
    let letters = bot.getBestLetters(uniqueWordsFrom(answers.slice()));
    guesses = sortList(guesses.slice(), letters);
    
    guesses = bot.reducesListBest(answers.slice(), guesses.slice(0, 100));
    guesses = guesses.map(a => Object.assign ({}, {word: a.word, average: a.adjusted, wrong: NOT_YET_TESTED}));
    return guesses;
}

function calculateGuessList(answers, guesses, best_words, difficulty) {
    const start_time = performance.now();
    let can_finish = false;

    for (let i = 0; i < best_words.length; i++) { 
        let remaining = best_words[i].differences;
        
        let num_guesses = bot.guessesAllowed();
        if (num_guesses == INFINITY) num_guesses = 6;

        let results = Array.apply(null, Array(num_guesses));
        
        results.forEach(function(a, index) { results[index] = []});
        results['w'] = [];
        best_words[i].results = results;
        
        Object.keys(remaining).forEach(function(key) {
            countResults(best_words[i], remaining[key], guesses, results, guessesMadeSoFar(), difficulty, key);
        });

        best_words[i].wrong = best_words[i].results['w'].length/answers.length;
        // if (bot.isFor(ANTI)) best_words[i].wrong = 1 - best_words[i].results.length/100; //uncomment to for longest path antiwordle

        if (best_words[i].wrong == 0) {
            can_finish = true;
        }

        // if (performance.now() - start_time > MAX_TIME || (can_finish && i >= CHECK_SIZE)) {
        if (shouldStopTesting(start_time, performance.now(), can_finish, i)) {
            console.log("only calculated " + (i+1) + " words in " + ((performance.now()-start_time)/1000).toFixed(3) + " seconds");
            best_words = best_words.slice(0, i+1);
            break;
        }
    }

    sortByWrongThenAverage(best_words);
    return best_words.map(a => Object.assign({}, {word: a.word, average: a.average, wrong: a.wrong})).slice(0, TOP_TEN_LENGTH);
}

function shouldStopTesting(start_time, end_time, can_finish, i) {
    return end_time - start_time > MAX_TIME || (can_finish && i >= CHECK_SIZE);
}

function getNextGuesses(new_guesses, answers, best, differences, difficulty) {
    let list;

    if (isDifficulty(HARD, difficulty)) {
        list = filterList(new_guesses, {word: best.word, colors: differences});
    } else if (!bot.isFor(ANTI)) {
        list = reduceListSize(new_guesses, uniqueWordsFrom(answers), answers.length);
    } else {
        list = filterList(new_guesses, {word: best.word, colors: differences}, true);
    }    

    if (!bot.isFor(ANTI) && !isDifficulty(HARD)) {
        list = combineLists(uniqueWordsFrom(answers), new_guesses);
    }

    return list;
}

function countResults(best, answers, guesses, results, attempt, difficulty, differences) {
    let new_guesses = combineLists(uniqueWordsFrom(answers), guesses);
    new_guesses = getNextGuesses(new_guesses, answers, best, differences, difficulty);
    
    if (answers.length <= 2 && (!bot.isFor(ANTI) || new_guesses.length == answers.length || !answers.length)) {
        addToResults(results, answers, attempt, best.word, bot.guessesAllowed()); 

    } else if (attempt < bot.guessesAllowed()-1) {
        if (attempt == bot.guessesAllowed()-2) {
            new_guesses = uniqueWordsFrom(answers.slice());
        }

        
        let best_words = bot.reducesListBest(answers, new_guesses, true);
        if (!best_words[0]) return;
        let remaining = best_words[0].differences;

        Object.keys(remaining).forEach(function(key) {
            countResults(best_words[0], remaining[key], new_guesses, results, attempt+1, difficulty, key);
        });
    }

    if (attempt >= bot.guessesAllowed()-1) {
            results['w'] = combineLists(results['w'], answers);
    }
    
    calculateAverageGuesses(best, results);
}

function addToResults(results, answers, attempt, current_answer, max_guesses) {
    // if (answers.length == 0) {
    if (isEmpty(answers)) {
        addToSpot(results, current_answer, attempt);

    } else if (attempt < max_guesses) {
        addToSpot(results, answers.pop(), attempt+1);
    }
        
    if (answers.length && attempt < max_guesses-1) {
        addToSpot(results, answers.pop(), attempt+2);
    }
}

function addToSpot(results, answer, index) {
    if (index >= results.length) {
        if (bot.isFor(ANTI)) {
            for (let i = results.length; i <= index; i++) {
                results[i] = [];
            }
        } else {
            index = 'w';
        }
    }

    results[index].push(answer);
}

function calculateAverageGuesses(current_word, results) {
    let avg = 0;
    let sum = 0;

    for (let i = 0; i < results.length; i++) {
        let count = results[i].length;
        sum += count;
        avg += count*(i+1);
    }

    current_word.results = results;
    
    avg = avg/sum;
    current_word.average = avg;
}

/* FILTER FUNCTIONS */ 
function filterList(list, letters, reduced_filter, split) {
    if (numberOfGuessesMadeIs(0)) return list;

    if (letters) {
        return createFilteredList(list, letters.word, letters.colors, reduced_filter, split);
    }

    for (let guess = 0; guess < guessesMadeSoFar(); guess++) {
        list = createFilteredList(list, getWord(guess), bot.getRowColor(guess), reduced_filter, split);
    }

    return list;
}

function createFilteredList(old_list, guess, difference, reduced_filter, split) {
    let temp_list = uniqueWordsFrom(old_list);
    let new_list = new Array(bot.getCount());
    for (let i = 0; i < new_list.length; i++) {
        new_list[i] = [];
    }

    difference = bot.getAllDifferences(difference, guess, reduced_filter);

    for (let i = 0; i < temp_list.length; i++) {
        let list_index = differencesMatch(guess, temp_list[i], difference);
        if (list_index.length) {
            if (bot.getCount() > 1) {
                addToList(old_list, list_index, temp_list[i], new_list);

            } else {
                new_list[0].push(temp_list[i]);
            }
        }
    }

    if (!split) new_list = uniqueWordsFrom(new_list);
    return new_list;
}

function addToList(all_lists, indices, new_word, new_lists) {
    for (let i = 0; i < indices.length; i++) {
        let pos = indices[i]

        if (typeof all_lists[0] == 'string' || all_lists[pos].includes(new_word)) {
            new_lists[pos].push(new_word);
        }
    }
}

function differencesMatch(guess, answer, all_diffs) {
    let correct_diff = bot.getDifference(guess, answer);
    let indices = [];

    for (let i = 0; i < all_diffs.length; i++) {
        if (correct_diff == all_diffs[i]) {
            indices.push(i);
        }
    }

    return indices;
}

function xordleFilter(list) {
    if (list.length > 1000) return list;
    if (numberOfGuessesMadeIs(0)) return list;

    let doubles = [];
    for (let i = 0; i < list.length; i++) {
        let rest = list.slice(i+1, -1).filter(a => bot.getDifference(list[i], a) == INCORRECT.repeat(word_length));

        for (let j = 0; j < rest.length; j++) {
            let guess = {word1: list[i], word2: rest[j]};

            if (couldBeAnswer(guess)) {
                doubles.push(guess);
            }
        }
    }    

    return doubles;
}

function couldBeAnswer(guess) {
    for (let i = 0; i < guessesMadeSoFar(); i++) {
        if (bot.getDifference(getWord(i), guess) != bot.getRowColor(i)) {
            return false;
        }
    }

    return true;
}

/* SORT FUNCTIONS */

// sorts the list based on which words have the most common letters
// used when the list is too large to check against all possibilities
function sortList(list, alphabet) {
    if (!list.length) return [];
    if (!alphabet) alphabet = bot.getBestLetters(list);

    let newranks = [];

    list.forEach(function(w) {
        newranks.push({word: w, average: 0});
    });

    checked = [];

    for (let i = 0; i < newranks.length; i++) {
        for (let j = 0; j < word_length; j++) {
            if (checked[i + " " + newranks[i].word.charAt(j)] == true) continue;  //no extra credit to letters with doubles
            // if (alphabet[newranks[i].word.charAt(j)][word_length] == alphabet[newranks[i].word.charAt(j)][j]) continue;

            newranks[i].average += alphabet[newranks[i].word.charAt(j)][word_length];
            newranks[i].average += alphabet[newranks[i].word.charAt(j)][j];
            checked[i + " " + newranks[i].word.charAt(j)] = true;
        }
        newranks[i].average = 1/newranks[i].average;
    }
        
    newranks = sortListByAverage(newranks);
    return newranks.map(a => a.word);
}

function sortListByAverage(list) {
    if (bot.isFor(ANTI)) 
        return list.sort((a, b) => (a.average <= b.average) ? 1 : -1);

    return list.sort((a, b) => (a.average >= b.average) ? 1 : -1);
}

function sortByWrongThenAverage(guesses) {
    guesses.sort(function(a,b) {
        if(a.wrong > b.wrong) {return  1;}
        if(a.wrong < b.wrong) {return -1;}
        if(bot.isBetter(a.average, b.average)) {return  -1;}
        if(!bot.isBetter(a.average, b.average)) {return 1;}
        return 0;
    });

    return guesses;
}