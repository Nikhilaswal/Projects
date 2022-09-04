const puppeteer = require('puppeteer');
const codeObj = require('./code');
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "priyanshubhatt09@gmail.com";
const password = "dehradun,uk";

(async function(){
    try {
        let browserInstance = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args :['--start-maximized']
        })

        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']", email, {delay :20});
        await newTab.type("input[id='input-2']", password);
        await newTab.click("button[type='submit']" , {delay :100});
        await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab);
        await waitAndClick("input[value='warmup']" , newTab);

        let AllChallenges = await newTab.$$(".challenge-submit-btn" , {delay:100});
        await questionSolver(AllChallenges[0], newTab, codeObj.answers[0]);


    } catch (error) {
        console.log(error);
    }
})()

async function waitAndClick(selector, page){
    await page.waitForSelector(selector);
    let selectorClicked = page.click(selector);
    return selectorClicked;
}

async function questionSolver(question, page , code){
    await question.click();
    await waitAndClick(".monaco-editor.no-user-select.vs", page);
    await waitAndClick("input[type='checkbox']", page);
    await page.waitForSelector("input[type='checkbox']");
    await page.type("input[type='checkbox']" , code);
    await page.keyboard.down("Control");
    await page.keyboard.press("A" , {delay:100});
    await page.keyboard.press("X");
    await page.keyboard.up("Control");
    await waitAndClick(".monaco-editor.no-user-select.vs" , page);
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");
    await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", {delay: 50});

    
}