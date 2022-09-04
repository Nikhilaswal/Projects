const puppeteer = require('puppeteer');
const codeObj = require('./code');
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "priyanshubhatt09@gmail.com";
const password = "dehradun,uk";

let page;
let browserOpen = puppeteer.launch({
    headless : false,
    args:['--start-maximized'],
    defaultViewport :null
})

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function(){
    let emailEntered = page.type("input[id='input-1']", email, {delay :50});
    return emailEntered;
}).then(function(){
    let passEntered = page.type("input[id='input-2']", password);
    return passEntered;
}).then(function(){
    let loginClick = page.click("button[type='submit']" , {delay :50});
    return loginClick;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick( "input[value='warmup']" ,page);
    return getToWarmUp;
}).then(function(){
    let waitFor3Seconds = page.waitForTimeout(3000);
    return waitFor3Seconds;
}).then(function(){
    let allChallengesPromise = page.$$(".ctas button" , {delay:50});   // $$ = document.querySelectorAll()
    return allChallengesPromise;
}).then(function(questionArr){
    console.log(questionArr.length);
    let questionWillBeSolved = questionSolver(page , questionArr[0] , codeObj.answers[0]);  // Hackerrank code index will change once it will solve
    return questionWillBeSolved;
})




function waitAndClick(selector , cPage){
    return new Promise(function(resolve , reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve()
        }).catch(function(){
            reject();
        })
    })
}

function questionSolver(page,  question, answer){
    return new Promise(function(resolve , reject){
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function(){
            let EditorPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
            EditorPromise.then(function(){
                return waitAndClick("input[type='checkbox']", page);
            }).then(function(){
                return page.waitForSelector("textarea[id='input-1']");
            }).then(function(){
                return page.type("textarea[id='input-1']", answer , {delay:10});
            }).then(function(){
                return page.keyboard.down("Control");
            }).then(function(){
                return page.keyboard.press("A", {delay:100});
            }).then(function(){
                return page.keyboard.press("X");
            }).then(function(){
                return page.keyboard.up("Control");
            }).then(function(){
                let EditorPromise = waitAndClick(".monaco-editor.no-user-select.vs" , page);
                return EditorPromise;
            }).then(function(){
                return page.keyboard.down("Control");
            }).then(function(){
                return page.keyboard.press("A");
            }).then(function(){
                return page.keyboard.press("V");
            }).then(function(){
                return page.keyboard.up("Control");
            }).then(function(){
                return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", {delay: 50});
            }).then(function(){
                resolve();
            }).catch(function(err){
                reject();
            })
        })
    })
}