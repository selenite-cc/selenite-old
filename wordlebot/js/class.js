// class constants
const WORDLE = 'Wordle';
const WOODLE = 'Woodle';
const PEAKS = 'W-Peaks';
const ANTI = 'Antiwordle';
const XORDLE = 'Xordle';
const THIRDLE = 'Thirdle';
const FIBBLE = 'Fibble';
const HARDLE = 'Hardle';
const DORDLE = 'Dordle';
const QUORDLE = 'Quordle';
const OCTORDLE = 'Octordle';
const WARMLE = 'Warmle';


class Bot {
    constructor(type) {
        this.type = type;
    }

    isFor(type) {
        return this.type == type;
    }

    hasHardMode() {
        // return this.type == WORDLE || this.type == ANTI;
        return true;
    }

    hasMax() {
        return this.type != ANTI;
    }

    guessesAllowed() {
        if (this.type == ANTI) return INFINITY;
        return parseInt(document.getElementById('max-guesses').value);
    }

    setChangeEvents(row) {
        if (this.type == WOODLE) {
            woodleDropdown(row);
        } else {
            tilesChangeColor(row);
        }
    }

    getDifference(word1, word2) {
        if (this.type == WOODLE) {
            return differencesWithoutPositions(word1, word2);
        } 
        
        if (this.type == PEAKS) {
            return getAlphabeticDifferences(word1, word2);
        } 
        
        if (typeof word2 == 'object') {
            return getDoubleDifference(word1, word2);
        } 
        
        if (this.type == WARMLE) {
            return getWarmleDifferences(word1, word2);
        }

        return differencesWithPositions(word1, word2);
    }

    getRowColor(row_number) {
        if (this.type == WOODLE) {
            return rowDifferencesWithoutPositions(row_number);
        } else if (this.getCount() > 1) {
            return rowDifferencesWithPairs(row_number);
        } else {
            return rowDifferencesWithPositions(row_number);
        }
    }

    setRowColor(difference, row) {
        if (this.type == DORDLE && difference.length == word_length*2) {
            return setDordleDifferences(difference, row);
        } else if (this.type == WOODLE) {
            return setRowDifferencesWithoutPositions(difference, row);
        } else {
            return setRowDifferencesWithPositions(difference, row);
        }
    }

    getBestLetters(list) {
        if (this.type == PEAKS) {
            return lettersClosestToCenter(list);
        } 

        if (this.type == WARMLE) {
            return bestWarmleLetters(list);
        }

        return mostCommonLetters(list);
    }

    reducesListBest(answers, guesses, future_guess) {
        if (this.type == ANTI) {
            return reducesListLeast(answers, guesses);
        } else {
            return reducesListMost(answers, guesses, future_guess);
        }
    }

    getAllDifferences(difference, guess, reduced_filter) {
        if (reduced_filter) {
            return getAntiWordleDiffs(difference, guess);
        }
        
        if (this.type == XORDLE) {
            return getXordleDiffs(difference, 0, [difference]);
        } 
        
        if (this.type == FIBBLE) {
            return getFibbleDiffs(difference);
        }
        
        if (this.type == HARDLE) {
            return getHardleDiffs(difference);
        } 
        
        if (this.getCount() > 1) {
            return difference;
        }

        return [difference];
    }

    isBetter(a, b) {
        if (bot.isFor(ANTI)) {
            return isHigher(a, b);
        } else {
            return isLower(a, b);
        }
    }

    getCount() {
        if (bot.isFor(DORDLE)) return 2;
        if (bot.isFor(QUORDLE)) return 4;
        if (bot.isFor(OCTORDLE)) return 8;
        else return 1;
    }

    getAllPossibleAnswersFrom(list) {
        list = filterList(list, 0, 0, bot.getCount() > 1);
        
        if (bot.isFor(XORDLE)) {
            list = xordleFilter(uniqueWordsFrom(list));
        }

        return list;
    }

    getAnswerListLength(answers) {
        if (bot.getCount() > 1) {
            return lengthOfAllLists(answers);
        }   
        
        return answers.length;
    }

    isLikely(answer) {
        if (this.type == XORDLE && typeof answer == 'object') {
            return this.isLikely(answer.word1) && this.isLikely(answer.word2);
        }

        return common.includes(answer);
    }
}

function isHigher(a, b) {
    return a > b;
}

function isLower(a, b) {
    return a < b;
}

// Wordle Specific Functions
function tilesChangeColor(row) {
    let tiles = row.getElementsByClassName('tile');

    Array.from(tiles).forEach(function(t) {
      t.addEventListener('click', function() {
        changeTileColor(t);
      });
    });
}


function changeTileColor(tile) {
    let old_color = getTileColor(tile);
    let new_color = nextColor(old_color);
    tile.classList.replace(old_color, new_color);
}

function nextColor(color) {
    return color == CORRECT ? WRONG_SPOT : (color == WRONG_SPOT ? INCORRECT : CORRECT)
}

function getTileColor(tile) {
    return Array.from(tile.classList).filter(a => a == CORRECT || a == INCORRECT || a == WRONG_SPOT);
}

function differencesWithPositions(word1, word2) {
    if (pairings[word1]) {
        if (pairings[word1][word2]) return pairings[word1][word2];
    } else pairings[word1] = [];
    
    
    let temp1 = word1;
    let temp2 = word2;
    let diff = EMPTY.repeat(word_length);
    let pos = 0;

    for (let j = 0; j < temp1.length; j++) {        
        let word1_c = temp1.charAt(j);
        let word2_c = temp2.charAt(j);

        if (word1_c == word2_c) {
            temp1 = temp1.slice(0, j) + temp1.slice(j+1);
            temp2 = temp2.slice(0, j) + temp2.slice(j+1);
            diff = replaceAt(diff, CORRECT, pos);
            j--;
        }
        pos++;
    }

    pos = 0;
    for (let j = 0; j < temp1.length; j++) {
        if (diff.charAt(pos) != 'X') {
            j--;
            pos++;
            continue;
        }

        let word1_c = temp1.charAt(j);
        if (temp2.includes(word1_c)) {
            diff = replaceAt(diff, WRONG_SPOT, pos);

            let index = temp2.indexOf(word1_c);
            temp2 = temp2.slice(0, index) + temp2.slice(index+1);
        } else {
            diff = replaceAt(diff, INCORRECT, pos);
        }


        pos++;
    }

    pairings[word1][word2] = diff;
    return diff;
}

function getDoubleDifference(guess, answers) {
    let diff1 = bot.getDifference(guess, answers.word1);
    let diff2 = bot.getDifference(guess, answers.word2);

    let new_diff = "";
    for (let i = 0; i < word_length; i++) {
        if (diff1.charAt(i) != INCORRECT) {
            new_diff += diff1.charAt(i);
        } else if (diff2.charAt(i) != INCORRECT) {
            new_diff += diff2.charAt(i);
        } else {
            new_diff += INCORRECT;
        }
    }

    return new_diff;
}

function dordleDifference(guess, answers) {
    return [differencesWithPositions(guess, answers.word1), 
            differencesWithPositions(guess, answers.word2)];
}

function rowDifferencesWithPositions(row_number) {
    let row = document.getElementsByClassName("row")[row_number];
    let coloring = "";

    for (let i = 0; i < word_length; i++) {
        coloring += getTileColor(row.getElementsByClassName("tile")[i]);
    }

    return coloring;
}

function rowDifferencesWithPairs(row_number) {
    let colors = [];
    let grids = document.getElementsByClassName('grid');

    for (let i = 0; i < grids.length; i++) {
        let row = grids[i].getElementsByClassName('row')[row_number];
        let coloring = "";

        for (let j = 0; j < word_length; j++) {
            coloring += getTileColor(row.getElementsByClassName("tile")[j]);
        }

        colors.push(coloring);
    }
    
    return colors;
}

function getAlphabeticDifferences(word1, word2) {
    let diff = "";
    for (let i = 0; i < word_length; i++) {
        let a = word1.charAt(i), b = word2.charAt(i);

        if (a == b) {
            diff += CORRECT;
        } else if (a > b) {
            diff += INCORRECT;
        } else if (a < b) {
            diff += WRONG_SPOT;
        }
    }

    return diff;
}

function getWarmleDifferences(word1, word2) {
    let diff = "";
    let distance = document.getElementsByClassName('warmle-selector')[0].value;

    for (let i = 0; i < word_length; i++) {
        let a = word1.charAt(i).charCodeAt(0), b = word2.charAt(i).charCodeAt(0);

        if (a == b) {
            diff += CORRECT;
        } else if (Math.abs(a-b) <= distance ) {
            diff += WRONG_SPOT;
        } else {
            diff += INCORRECT;
        }
    }

    return diff;
}

function setDordleDifferences(colorings, row) {
    setRowDifferencesWithPositions(colorings[0], row);
    setRowDifferencesWithPositions(colorings[1], row.nextSibling);
}

function setRowDifferencesWithPositions(coloring, row) {
    let tiles = row.getElementsByClassName('tile');

    for (let i = 0; i < word_length; i++) {
        tiles[i].classList.replace(INCORRECT, coloring[i]);
    }
}

// Woodle Specific Functions
function woodleDropdown(row) {
    let selector = row.getElementsByClassName('woodle-count');
    for (let i = 0; i < selector.length; i++) {
        if (selector[i].getElementsByTagName('option').length) {
            continue;
        }

        let options = "";
        for (let j = 0; j <= word_length; j++) {
            options += "<option value='" + j + "'>" + j + "</option>"
        }

        selector[i].innerHTML = options;
    }
}

function rowDifferencesWithoutPositions(row) {
    let num_correct = document.getElementsByClassName('woodle-count ' + CORRECT)[row].value;
    let num_wrong_spots = document.getElementsByClassName('woodle-count ' + WRONG_SPOT)[row].value;
    let num_wrong = word_length - num_correct - num_wrong_spots;

    return CORRECT.repeat(num_correct) + WRONG_SPOT.repeat(num_wrong_spots) + INCORRECT.repeat(num_wrong);
}

function differencesWithoutPositions(word1, word2) {
    let temp1 = word1;
    let temp2 = word2;

    if (pairings[word1]) {
        if (pairings[word1][word2]) return pairings[word1][word2];
    } else pairings[word1] = [];

    let correct = "";
    let wrong_spots = "";
    let num_wrong = word_length;

    for (let j = 0; j < temp1.length; j++) {
        if (num_wrong == 0) break;
        
        let word1_c = temp1.charAt(j);
        let word2_c = temp2.charAt(j);

        if (word1_c == word2_c) {
            correct += CORRECT;
            num_wrong--;
            
            temp1 = temp1.slice(0, j) + temp1.slice(j+1);
            temp2 = temp2.slice(0, j) + temp2.slice(j+1);
            j--;
        }
    }

    for (let j = 0; j < temp1.length && num_wrong > 0; j++) {
        let word1_c = temp1.charAt(j);

        if (temp2.includes(word1_c)) {
            wrong_spots += WRONG_SPOT;
            num_wrong--;

            let index = temp2.indexOf(word1_c);
            temp2 = temp2.slice(0, index) + temp2.slice(index+1);
        }
    }

    let diff = correct + wrong_spots + INCORRECT.repeat(num_wrong);
    pairings[word1][word2] = diff;

    return diff;
}

function setRowDifferencesWithoutPositions(coloring, row) {
    let selectors = row.getElementsByClassName('tracker')[0];
    let num_correct = selectors.getElementsByClassName('woodle-count ' + CORRECT)[0];
    let num_wrong_spots = selectors.getElementsByClassName('woodle-count ' + WRONG_SPOT)[0];

    let correct = count(coloring, CORRECT);
    let wrong_spots = count(coloring, WRONG_SPOT);
    num_correct.innerHTML = "<option value='" + correct + "'>" + correct + "</option>";
    num_wrong_spots.innerHTML = "<option value='" + wrong_spots + "'>" + wrong_spots + "</option>";
}



// calculates which letters appear most often throughout the remaining answers
// used to rough sort the list if the entire list is too large to check
// info is also prited underneath 'Most Common Letters' section
function mostCommonLetters(list) {
    if (!list.length) return [];

    let letters = makeAlphabetArray(parseInt(word_length)+1);
    let checked;

    for (let i = 0; i < list.length; i++) {
        checked = [];
        for (let j = 0; j < word_length; j++) {
            c = list[i].charAt(j);

            letters[c][j]++;

            if (checked[c] != true) letters[c][word_length]++;  // only counts letters once per word
            checked[c] = true;
        }
    }
    return letters;
}

function lettersClosestToCenter() {
    let letters = [];

    for (let c = 65; c <= 90; c++) {
        let char = String.fromCharCode(c);
        let val = 1/Math.abs(c - (90+65)/2);
        letters[char] = [];

        for (let i = 0; i < word_length+1; i++) {
            letters[char].push(val);
        }
    }

    return letters;
}

function bestWarmleLetters(list) {
    let letters = makeAlphabetArray(parseInt(word_length)+1);

    list.forEach(function(word) {
        for (let i = 0; i < word_length; i++) {
            let c = word.charAt(i);
            letters[c][i]++;
            letters[c][word.length]++;
        }
    });

    let new_letters = makeAlphabetArray(parseInt(word_length)+1);

    for (let i = 65; i <= 90; i++) {
        let pos = intToChar(i);

        for (let j = 0; j < word_length; j++) {
            new_letters[pos][j] = letters[pos][j];

            let distance = document.getElementsByClassName('warmle-selector')[0].value;
            for (let k = 1; k <= distance; k++) {    
                let c = charToInt(pos)+k;

                if (c <= 90) {
                    c = intToChar(c);
                    new_letters[pos][j] += letters[c][j];
                }
                
                c = charToInt(pos)-k;
                if (c >= 65) {
                    c = intToChar(c);
                    new_letters[pos][j] += letters[c][j];
                }
            }

        }

        new_letters[pos][word_length] = letters[pos][word_length];
    }

    return new_letters;
}

function makeAlphabetArray(size) {
    let letters = [];
    
    for (let i = 65; i <= 90; i++) {
        let c = String.fromCharCode(i);

        letters[c] = [];
        for (let i = 0; i < size; i++) {
            letters[c].push(0);
        }
    }    

    return letters;
}

function reducesListMost(answers, guesses, future_guess) {
    let best_words = [];
    let min = answers.length;

    for (let i = 0; i < guesses.length; i++) {
        let data;

        if (bot.getCount() > 1 && typeof answers[0] == 'object') {
            let data_per_list = [];

            for (let j = 0; j < answers.length; j++) {
                
                min = answers[j].length;
                data_per_list.push(calculateAverageBucketSize(guesses[i], answers[j], min, future_guess));
            }
            
            data = averageBucketSizeFromAllLists(data_per_list);
        } else {
            data = calculateAverageBucketSize(guesses[i], answers, min, future_guess);
        }

        if (!data) continue;
  
        min = Math.min(min, data.adjusted);
        best_words.push({word: guesses[i], average: data.adjusted, differences: data.differences, wrong: 0});

        if (data.weighted < 1 && future_guess) break;
        if (min == 0 && best_words.length >= answers.length && future_guess) break;
    }

    best_words = sortListByAverage(best_words);
    return best_words;
}

function averageBucketSizeFromAllLists(data) {
    let differences = {};
    let average = 0;

    for (let i = 0; i < data.length; i++) {
        average += data[i].adjusted;
        let keys = [...new Set([...Object.keys(differences),...Object.keys(data[i].differences)])]
        let op = {};

        differences = keys.forEach(key=>{
            op[key] = {
                ...differences[key],
                ...data[i].differences[key]
            }
        });

        differences = op;
    }

    average /= bot.getCount();

    return {adjusted: average, differences: differences};
}

function reducesListLeast(answers, guesses) {
    let best_words = [];

    for (let i = 0; i < guesses.length; i++) {
        let data = calculateAverageBucketSize(guesses[i], answers, 0, 0);

        best_words.push({word: guesses[i], average: data.weighted, differences: data.differences});
    }

    best_words = sortListByAverage(best_words);
    return best_words;    
}

function calculateAverageBucketSize(guess, answers, min, future_guess) {
    let differences = [];
    let list_size = answers.length;
    let weighted = adjusted = 0;
    let threes = 1;

    for (let i = 0; i < list_size; i++) {
        let diff = bot.getDifference(guess, answers[i]); 

        if (differences[diff] == null) {
            differences[diff] = [];
        }

        if (diff != CORRECT.repeat(word_length) || bot.isFor(XORDLE)) {
            differences[diff].push(answers[i]);
        }

        let freq = differences[diff].length;
        
        if (freq > 0) {
            weighted += (freq/list_size)*freq - ((freq-1)/list_size)*(freq-1);
            if (freq > 1) {
                threes -= 1/list_size;
            }
        }

        adjusted = (1-threes)*weighted;
        if (!bot.isFor(ANTI) && (adjusted >= min && future_guess || adjusted > min*SIZE_FACTOR)) {
            return;
        }
    }
    let bucket_data = {word: guess, weighted: weighted, threes: threes, adjusted: adjusted, differences: differences};
    return bucket_data;
}

function getXordleDiffs(difference, index, diff_list) {
    if (index == difference.length) return [...new Set(diff_list)];

    if (difference.charAt(index) != INCORRECT) {
        let alt = replaceAt(difference, INCORRECT, index);

        diff_list.push(alt);
        getXordleDiffs(alt, index+1, diff_list);
    } 

    return getXordleDiffs(difference, index+1, diff_list);
}

function getFibbleDiffs(diff) {
    let differences = [];

    for (let i = 0; i < diff.length; i++) {
        if (diff.charAt(i) != INCORRECT) {
            let new_diff = replaceAt(diff, INCORRECT, i);
            differences.push(new_diff);
        }

        if (diff.charAt(i) != CORRECT) {
            let new_diff = replaceAt(diff, CORRECT, i);
            differences.push(new_diff);
        }

        if (diff.charAt(i) != WRONG_SPOT) {
            let new_diff = replaceAt(diff, WRONG_SPOT, i);
            differences.push(new_diff);
        }
    }

    return differences;
}

function getHardleDiffs(diff) {
    let differences = [diff];
    let new_diff = "";

    if (diff == WRONG_SPOT.repeat(word_length)) {
        return differences;
    }
    
    for (let i = 0; i < diff.length; i++) {
        if (diff.charAt(i) == CORRECT) {
            new_diff += WRONG_SPOT;
        } else if (diff.charAt(i) == WRONG_SPOT) {
            new_diff += CORRECT;
        } else new_diff += INCORRECT;
    }

    differences.push(new_diff);
    return differences;
}

function getAntiWordleDiffs(diff, guess) {
    let wrong_letters = findWrongSpotLetters(diff, guess);
    let differences = antiRecursion(guess, diff, wrong_letters, [], 0);
    
    includesAllWrongSpots(differences, wrong_letters, guess);

    return differences;
}

function includesAllWrongSpots(differences, wrong_letters, word) {
    if (!wrong_letters.length) return differences;

    outer:
    for (let i = 0; i < differences.length; i++) {
        let check_list = [];

        for (let j = 0; j < word_length; j++) {
            if (differences[i].charAt(j) != INCORRECT) {
                let c = word.charAt(j);

                if (!check_list.includes(c)) {
                    check_list.push(c);

                    if (check_list.length == wrong_letters.length) {
                        continue outer;
                    }
                }
            }
        }
        
        differences.splice(i, 1);
        i--;
    }
}

function antiRecursion(word, difference, wrong_letters, diff_list, i) {
    diff_list.push(difference);

    if (i == word_length) {
        return [...new Set(diff_list)];
    }
    
    if (wrong_letters.includes(word.charAt(i)) && difference.charAt(i) != CORRECT) {
        antiRecursion(word, replaceAt(difference, CORRECT, i), wrong_letters, diff_list, i+1);

        if (difference.charAt(i) != INCORRECT) {
            antiRecursion(word, replaceAt(difference, INCORRECT, i), wrong_letters, diff_list, i+1);
        }

        if (difference.charAt(i) != WRONG_SPOT) {
            antiRecursion(word, replaceAt(difference, WRONG_SPOT, i), wrong_letters, diff_list, i+1);
        }
    }

    return antiRecursion(word, difference, wrong_letters, diff_list, i+1);
}

function findWrongSpotLetters(diff, guess) {
    // find index of every Y character in the differences
    let wrong_spots = allInstancesOf(WRONG_SPOT, diff);
    let correct = allInstancesOf(CORRECT, diff);
    let indices = combineLists(wrong_spots, correct);
    let c = [];

    // indentify all letters marked as Y
    for (let i = 0; i < indices.length; i++) {
        c.push(guess.charAt(indices[i]));
    }

    c = [...new Set(c)];
    return c;
}

function lengthOfAllLists(lists) {
    if (lists.length && typeof lists[0] == 'string') {
        return lists.length;
    }

    let new_list = [];

    lists.forEach(function(a) {
        new_list = combineLists(new_list, a);
    });

    new_list = uniqueWordsFrom(new_list);
    return new_list.length;
}