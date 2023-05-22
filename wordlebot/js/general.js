function replaceAt(old_string, char, index) {
    old_string = old_string.slice(0, index) + char + old_string.slice(index+1);
    return old_string;
}

function allInstancesOf(c, string) {
    let indices = [];
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == c) {
            indices.push(i);
        }
    }

    return indices;
}

function clearHTML(element) {
    element.innerHTML = "";
}

function setHTML(element, html) {
    element.innerHTML = html;
}

function clearValue(element) {
    element.value = "";
}

function createElement(object, html, class_name, id) {
    let new_object = document.createElement(object);
    
    new_object.setAttribute('class', class_name);
    new_object.setAttribute('id', id);
    new_object.innerHTML = html;

    return new_object;
}

function count(string, char) {
    let count = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] == char) count++;
    }

    return count;
}

function combineLists(a, b) {
    return [...new Set(a.concat(b))];
}

function pluralOrSingle(quantity, singular, plural) {
    if (quantity == 1) {
        return singular;
    }

    return plural;
}

function intToChar(int) {
    return String.fromCharCode(int);
}

function charToInt(char) {
    return char.charCodeAt(0);
}

function isEmpty(list) {
    return list.length == 0;
}

function decimalToPercent(num) {
    return (num*100).toFixed(2) + "%";
}