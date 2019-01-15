/*
* Example functions
*
*/
// define number in words (0-10) for specified languages:
const words = {};
//english
words.en = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
//french
words.fr = ['zéro', 'un', 'deux', 'troi', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
//german
words.de = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'];
//
//
//check if given language code is available to find
words.existsLangCode = (code) => {
    let result = false;
    for (let key in words) {
        if (words.hasOwnProperty(code)) {
            result = true;
        }
    }
    return result;
}
//
//
//check if given word is available to find and return the property containing of
words.existsNumberWord = (word) => {
    let result = false;
    for (let key in words) {
        if (typeof(words[key]) == 'object') {
            words[key].some(value => {
                if (value == word) {
                    result = words[key];
                }
            })
        }
    }
    return result;
}
//
//
// get the number in word for given numeric input (0-10) and specified languge (en, fr, de)
words.getNumberInWord = (number, language) => {
    // check if inputs are correct
    const inputNumber = typeof(number) == 'number' && Math.floor(number) >= 0 && Math.floor(number) <=10 ? true : false;
    const inputLanguage = typeof(language) == 'string' && words.existsLangCode(language) ? true : false;
    //return the word
    if (inputNumber && inputLanguage) {
        let result = '';
        result = words[language][number];
        return result;
    } else {
        return 'Incorrect input(s), try again'
    }
}
//
//
// get the number in word translated, for given word and specified language
words.getTranslatedNumber = (word, language) => {
    // check if inputs are correct
    const inputWord = typeof(word) == 'string' && word.length > 0 && words.existsNumberWord(word) ? words.existsNumberWord(word) : false;
    const inputLanguage = typeof(language) == 'string' && words.existsLangCode(language) ? true : false;
    //return the word
    if (inputWord && inputLanguage) {
        let result = '';
        const wordIndex = inputWord.indexOf(word);
        result = words[language][wordIndex];
        return result;
    } else {
        return 'Incorrect input(s), try again';
    }
}
//
//
module.exports = words;
