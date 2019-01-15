/*
 * Test module
 *
 */
const words = require('./../app/lib');
const assert = require('assert');

//define test app
const _testApp = {};
//
//
// define test units
const testUnits = {};
_testApp.tests = testUnits;
//
//
// check if are any test to do
_testApp.countTests = function(){
  let counter = 0;
  for(let key in _testApp.tests){
     if(_testApp.tests.hasOwnProperty(key)){
       counter++;
     }
  }
  return counter;
};

// Run all the tests
_testApp.run = () => {
    //
    let errors = [];
    let successes = 0;
    const limit = _testApp.countTests();
    let counter = 0;
    //
    console.log("");
    for (let testName in _testApp.tests) {

        if (_testApp.tests.hasOwnProperty(testName)) {

            const subTest = _testApp.tests[testName];

            try {
                
                subTest( () => {
                    console.log('\x1b[32m%s\x1b[0m', testName);
                    counter++;
                    successes++;
                    if(counter == limit){
                        _testApp.makeReport(limit,successes,errors);
                    }
                });

            } catch (e) {
                
                errors.push( {'name' : testName, 'error' : e });
                console.log('\x1b[31m%s\x1b[0m',testName);
                counter++;
                if(counter == limit){
                    _testApp.makeReport(limit,successes,errors);
                }
            }
        }
    }
};


// Print result of the tests
_testApp.makeReport = (limit,successes,errors) => {
    //
    console.log("");
    console.log("_____BEGIN TEST REPORT_______________________");
    console.log("");
    console.log("Total Tests: ", limit);
    console.log("Pass: ", successes);
    console.log("Fail: ", errors.length);
    console.log("");
    //errors if any
    if (errors.length > 0) {
        console.log("_____BEGIN ERROR DETAILS_______________________");
        console.log("");
        errors.forEach( testError => {
            console.log('\x1b[31m%s\x1b[0m',testError.name);
            console.log(testError.error);
            console.log("");
        });
        console.log("");
        console.log("_____END ERROR DETAILS_______________________");
    }
    console.log("");
    console.log("_____END TEST REPORT_______________________");
    process.exit(0);
    //
};
//
//
//
testUnits['words.getNumberInWord should return a string'] = done => {
    const str = words.getNumberInWord(2, 'fr');
    assert.equal(typeof(str), 'string');
    done();
};
//
testUnits['words.getNumberInWord should return "sieben"'] = done => {
    const str = words.getNumberInWord(7, 'de');
    assert.equal(str, 'sieben');
    done();
};
//
testUnits['words.getTranslatedNumber should return "quatre"'] = done => {
    const str = words.getTranslatedNumber('four', 'fr');
    assert.equal(str, 'quatre');
    done();
};
//
testUnits['words.getTranslatedNumber should not throw when called with "wrong input"'] = done => {
    assert.doesNotThrow(() => {
        words.getTranslatedNumber('five', 'wrongInput');
        done()
    }, TypeError);
};
//
testUnits['words.getNumberInWord should not throw when called with wrong input 112233'] = done => {
    assert.doesNotThrow(() => {
        words.getNumberInWord(112233, 'en');
        done()
    }, TypeError);
};
//
testUnits['words.existsLangCode should return true'] = done => {
    const result = words.existsLangCode('fr');
    assert.ok(result);
    done();
};
//
testUnits['words.existsNumberWord should return an array with length > 0'] = done => {
    const result = words.existsNumberWord('ten');
    assert.ok(result instanceof Array)
    assert.ok(result.length > 0);
    done();
};
// red code expected!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
testUnits['words.existsNumberWord should return "zwei"'] = done => {
    const result = words.existsNumberWord('zwei');
    assert.strictEqual(result[1], 'zwei')
    done();
};
//
// Run!
_testApp.run();

