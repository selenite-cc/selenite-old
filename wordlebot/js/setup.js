$(document).ready(function() {
    getPreferences();
    createPage();

    $("#bot-type").change(function() {
        let val = $(this).val();
        localStorage.setItem('bot_type', val);
        setBotMode(val);
        createPage();
    });

    $(document).on('input', '.warmle-selector', function() {
        let val = $(this).val();
        localStorage.setItem('warmle_dist', val);
        update();
    });

    $("#word-length").on('input', function() {
        localStorage.setItem('word_length' + bot.type, $(this).val());
        createPage();
    });

    $("#max-guesses").on('input', function() {
        localStorage.setItem('guesses' + bot.type, $(this).val());
        createPage();
    });

    $(".wordbank").on('input', function() {
        if (!$(this).is(':checked')) {
            $(this).prop('checked', true);
            return;
        }

        localStorage.setItem('wordbank', $(this).attr('id'));
        $("#" + otherWordbank($(this).attr('id'))).prop('checked', false);
        setWordbank();
        update();
    });

    
    $("#word-entered").on('input', function(e) {
        let val = $("#word-entered").val();
        if (val.length == word_length) {
            $("#word-entered").blur();
            
            makeTables(val);
            
            if (word_length == 11) {
                $(".tile").css('font-size', '1rem');
            }
        } 
    });

    $(document).on('click', '.click', function() {
        makeTables($(this).html());
    })

    $(document).on('click', '.showlist', function() {
        if ($(this).children().hasClass("visible")) {
            ($(this).children().removeClass("visible"));
        } else {
            $(this).children().addClass("visible");
        }
    });
});

function createPage() {
    drawPage();
    setLength();
    setWordbank();
    update();
}

function resetPage() {
    clearGrids();
    clearHTML(document.getElementById('next-previous-buttons'));
    update();
}

function clearGrids() {
    let grids = document.getElementsByClassName('grid');

    for (let i = 0; i < grids.length; i++) {
        clearHTML(grids[i]);
    }

    let full_grid = document.getElementById('hints');
    full_grid.classList.add('empty');
}

function getPreferences() {
    if (localStorage.getItem('bot_type')) {
        let bot_type = localStorage.getItem('bot_type');
        setBotMode(bot_type);
        document.getElementById('bot-type').value = bot_type;
    } else {
        setBotMode(WORDLE);
    }

    if (localStorage.getItem('wordbank')) {
        let bank = localStorage.getItem('wordbank');
        document.getElementById(bank).checked = true;
        document.getElementById(otherWordbank(bank)).checked = false;
        setWordbank()
    }

    // if (bot.isFor(WARMLE) && localStorage.getItem('warmle_dist')) {
    //     let dist = localStorage.getItem('warmle_dist');
    //     document.getElementsByClassName('warmle-selector')[0].value = dist;
    // }
}

function otherWordbank(bank) {
    if (bank == 'restricted') return 'complete';
    return 'restricted';
}

function drawPage() {
    let container = document.getElementById('container');
    let header = document.getElementById('top-of-screen');
    let hints = document.getElementById('hints');

    addGrid(hints);

    createMainHeader(header);
    createWordLengthSelector();

    createGuessInput(container);
    createAnswerSuggestions(container);

    updateSettings();
}

function updateSettings() {
    let extra = document.getElementsByClassName('extra-settings')[0];
    
    if (bot.isFor(WARMLE)) {
        let selector = createElement('select', '', 'warmle-selector');

        for (let i = 3; i >= 1; i--) {
            let option = createElement('option', i);
            option.value = i;
            selector.append(option);            
        }

        setHTML(extra, 
                "Yellows are " + selector.outerHTML + " letters away from the correct letter.");

        if (localStorage.getItem('warmle_dist')) {
            document.getElementsByClassName('warmle-selector')[0].value = localStorage.getItem('warmle_dist');
        }
    } else {
        clearHTML(extra);
    }
}

function addGrid(hints) {
    clearHTML(hints);

    for (let i = 0; i < bot.getCount(); i++) {
        let grid = createElement('div', '', 'grid');
        hints.append(grid);
    }
}

function createMainHeader(div) {
    let main_header = document.getElementById('top-of-screen');
    let title = main_header.getElementsByTagName('h1')[0];

    title.innerHTML = bot.type + ' Calcle';
    main_header.append(title);
}

function createWordLengthSelector() {
    let select_length = document.getElementById('word-length');

    let options = "";
    for (let i = SMALLEST_WORD; i <= LARGEST_WORD; i++) {
        let selected = "";
        if (i == 5) selected = "selected = 'selected'";
        options += "<option value='" + i + "' " + selected +">" + i + "</option>";
    }

    if (bot.isFor(THIRDLE)) {
        localStorage.setItem('word_length' + bot.type, 3);
        options = "<option value ='3' selected = 'selected'>3</option>";
    }

    select_length.innerHTML = options;
    
    if (localStorage.getItem('word_length'+ bot.type) && (localStorage.getItem('word_length'+ bot.type) >= SMALLEST_WORD || bot.isFor(THIRDLE))) {
        select_length.value = localStorage.getItem('word_length'+ bot.type);
    }
}

function createMaxGuesses(div) {
    let max_input = document.getElementById('max-guesses');

    let options = "";
    for (let i = 3; i <= 21; i++) {
        let selected = "";
        if (i == 6) selected = "selected = 'selected'";
        options += "<option value='" + i + "' " + selected +">" + i + "</option>";    
    }

    if (bot.isFor(THIRDLE)) {
        localStorage.setItem('guesses' + bot.type, 3);
        options = "<option value ='3' selected = 'selected'>3</option>";
    }

    max_input.innerHTML = options;
    
    if (localStorage.getItem('guesses' + bot.type)) {
        max_input.value = localStorage.getItem('guesses' + bot.type);
    }
}

const EXAMPLE_LIST = 
    [
        {word: 'BLOKE', score: '2.188 guesses left', wrong: '96.77% solve rate'}, 
        {word: 'YOLKS', score: '2.250 guesses left'}, 
        {word: 'KOELS', score: '2.250 guesses left'},
        {word: 'KYLOE', score: '2.250 guesses left'}
    ];

function createExample() {
    let example_row = createRow('TRAIN', 'dummy');
    bot.setRowColor('GBYBB', example_row);

    let example_list = createElement('ul', '', 'word-list dummy');
    
    for (let i = 0; i < EXAMPLE_LIST.length; i++) {
        // example_list.innerHTML += createListItem(EXAMPLE_LIST[i].word, EXAMPLE_LIST[i].score, i+1);
        example_list.append(createListItem(EXAMPLE_LIST[i].word, EXAMPLE_LIST[i].score, i+1));
    }

    return {row: example_row, list: example_list};
}

function createWrongExample() {
    let example_wrong = createElement('ul', '', 'word-list dummy');
    // example_wrong.innerHTML = createListItem(EXAMPLE_LIST[0].word, EXAMPLE_LIST[0].wrong, 1);
    example_wrong.append(createListItem(EXAMPLE_LIST[0].word, EXAMPLE_LIST[0].wrong, 1));

    return example_wrong;
}

function makeCloseButton(type) {
    let close_button = createElement('button', '', type + ' close');
    return close_button;
}

function createInfoParagraphs() {
    let p1 = createElement('p', `Simply enter in your last guess, click on the tiles until the colors match, hit calculate, 
                                and the WordleBot will give you the best possible guesses from that point.`);

    let p2 = createElement('p', `This means the best guess from this point would be ` + EXAMPLE_LIST[0].word + `,
                                and that you have an average of ` + EXAMPLE_LIST[0].score + `. If you see:`);

    let p3 = createElement('p', `That means ` + EXAMPLE_LIST[0].word + ` will only solve 96.77% of the remaining possible answers within ` + bot.guessesAllowed() + ` guesses.
                                Generally speaking, you should only see this if you're playing on hard mode.`);

    let p4 = createElement('p', `Want to see how good your starting word is? Click the 
                                <button class = 'test dummy' disabled><i class="gg-bot"></i></button> on the top right to get a good idea.`);

    return [p1, p2, p3, p4]
}

function explainExample() {
    let explanation = createElement('div', '', 'description');

    if (bot.isFor(WORDLE)) {
        explanation.innerHTML = 'T is in the correct position, A is in the word but not in the correct position, and R, I, and N are not in the word.'
    }

    if (bot.isFor(WOODLE)) {
        explanation.innerHTML = 'TRAIN has one letter in the correct position, and one letter in the word, but not in the correct position';
    }

    if (bot.isFor(PEAKS)) {
        explanation.innerHTML = 'The 1st letter of the word is T, the second 2nd letter comes before R in the alphabet, the 3rd comes after A, the 4th before I, and the 5th before N.';
    }

    return explanation;
}

function createInfoPage() {
    let info = document.getElementsByClassName('info screen')[0];
    if (info.classList.contains('display')) return;

    let close_button = makeCloseButton('info');
    let example = createExample();
    let explanation = explainExample();
    let example_wrong = createWrongExample();
    let paragraphs = createInfoParagraphs();

    let main_header = createElement('h3', 'How does this Work?', 'top-header');
    let sub_header = createElement('h3', 'After each guess you should see something like this:', 'mini');

    info.append(close_button);   // button to close screen
    info.append(main_header);    // 'how does this work' 
    info.append(paragraphs[0]);  // intro paragraph
    info.append(sub_header);     // header to examples
    info.append(example.row);    // example row w/ colors
    info.append(explanation)     // explanation of tiles
    info.append(example.list);   // example answer list 
    info.append(paragraphs[1]);  // explanation of answer list
    info.append(example_wrong);  // example answer list with wrong %
    info.append(paragraphs[2]);  // explanation of wrong %
    info.append(paragraphs[3]);  // bot paragraph

    info.classList.remove('back');
    info.classList.add('display');

    close_button.addEventListener('click', function() {
        info.classList.remove("display");
        info.classList.add("back");
        clearHTML(info);
    });
}

function createSettingsPage() {
    let settings = document.getElementsByClassName('settings screen')[0];

    settings.classList.remove('hide');
    settings.classList.add('display');
    
    let close = settings.getElementsByClassName('close')[0];
    close.addEventListener('click', function() {
        settings.classList.remove("display");
        settings.classList.add("hide");
    });
}

function createGuessInput(div) {
    let input = document.getElementById('word-entered');
    setInputAttributes(input);
}

function setInputAttributes(input) {
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', 'enter your guess here');
    input.setAttribute('onkeypress', 'return /[a-z]/i.test(event.key)');
    input.setAttribute('oninput', 'this.value = this.value.toUpperCase()');
}

function createAnswerSuggestions() {
    let suggestions = document.getElementById('suggestions');

    if (bot.hasHardMode() && !document.getElementById('mode')) {
        createHardModeSwitch(suggestions);
    } else if (!bot.hasHardMode() && document.getElementById('mode')) {
        removeHardModeSwitch(suggestions);
    }

    if (bot.hasMax()) {
        createMaxGuesses(suggestions);
    } else {
        let max = document.getElementById('max-guesses');
        localStorage.setItem('guesses' + bot.type, 'infinity');
        max.innerHTML = "<option value ='infinity' selected = 'selected'> &#8734 </option>";    
    }

    createAnswerLists(suggestions);
}

function createAnswerLists(div) {
    if (document.getElementById('answers')) {
        document.getElementById('answers').remove();
    }

    let answer_lists = createElement('div', '', '', 'answers');

    createOptions(answer_lists);
    div.append(answer_lists);
}

function createOptions(div) {
    let best_guesses = createElement('div', '', 'best-guesses');
    let word_list = createElement('ul', '', 'word-list');

    best_guesses.append(word_list);
    div.append(best_guesses);
}

function createHardModeSwitch(div) {
    let switch_label = createElement('div', "Show me the best guesses for 'Hard Mode':", 'hard label');
    let switch_container = createElement('label', '', 'hard switch');
    let switch_slider = createElement('span', '', 'slider round');
    let switch_checkbox = createElement('input', '', '', 'mode');
    switch_checkbox.setAttribute('type', 'checkbox');

    switch_container.append(switch_checkbox);
    switch_container.append(switch_slider);
    
    let header = document.getElementsByClassName('mini-title')[0];
    div.insertBefore(switch_label, header);
    div.insertBefore(switch_container, header);

    switch_checkbox.addEventListener('change', function() {
        update();
    });
}

function removeHardModeSwitch() {
    let label = document.getElementsByClassName('hard label')[0];
    let container = document.getElementsByClassName('hard switch')[0];

    if (label) label.remove();
    if (container) container.remove();
}
