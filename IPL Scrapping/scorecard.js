const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/rajasthan-royals-vs-delhi-capitals-23rd-match-1216500/full-scorecard';
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
function processScorecard(url){
    request(url, cb);
}

function cb(error, response,html){
    if(error)
    {
        console.log(error);
    }
    else{
        extractMatchdetails(html);
    }
}
function extractMatchdetails(html){
    let $ = cheerio.load(html);
    let descElem = $(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid"); // venue and date
    let result = $(".ds-text-tight-m.ds-font-regular.ds-text-typo-title"); // result (win/loss)
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();        // trim only removes spaces from front and back
    let date = stringArr[2].trim();
    result = result.text();
    let collapse = $(".ds-bg-fill-content-prime.ds-rounded-lg");
    
    // storing data
    for(let i=0;i<collapse.length;i++){
        let teamName = $(collapse[0]).find(".ds-py-3").text();
        teamName = teamName.split("INNINGS")[0].trim();

        let opponentName = $(collapse[1]).find(".ds-py-3").text();
        opponentName = opponentName.split("INNINGS")[0].trim();
        //console.log(`${teamName} || ${opponentName} || ${venue} || ${date} || ${result}`);
    

        let cInnings = $(collapse[i]);
        let allRows = cInnings.find(".ds-mb-4 table tbody tr");
        for(let j=0;j<allRows.length;j++)
        {
            let isWorthy = $(allRows[j]).find("td")
            let allCols = $(allRows[j]).find("td");

            if(isWorthy.length == 8 || isWorthy.length == 11){
                
                let playerName = $(allCols[0]).text().trim();;
                let run = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();;
                let fours = $(allCols[5]).text().trim();;
                let sixes = $(allCols[6]).text().trim();;
                let sr = $(allCols[7]).text().trim();;

                console.log(`${playerName} || ${run} || ${balls} || ${fours} || ${sixes} || ${sr}`);
                console.log("********************************************************");
                
                processPlayer(teamName, playerName,  run,balls,fours,sixes,sr,opponentName,venue,date,result);

            }
            
          
        }


    }
    
}

function processPlayer(teamName, playerName,  run,balls,fours,sixes,sr,opponentName,venue,date,result)
{
    let teamPath = path.join(__dirname , "ipl", teamName);
    dirCreator(teamPath);
    let filePath = path.join(teamPath , playerName+ ".xlsx");
    let content = excelReader(filePath , playerName);
    let playerobj = {
        teamName,
        playerName,
        run,
        balls,
        fours,
        sixes,
        sr,
        opponentName,
        venue,
        date,
        result
    }

    content.push(playerobj);

    excelWriter(filePath , content, playerName)
}



function dirCreator(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}

function excelWriter(filePath, json, sheetName)
{
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB , newWS , sheetName);
    xlsx.writeFile(newWB, filePath);
}
function excelReader(filePath , sheetName){
    if(fs.existsSync(filePath) == false){
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
    //console.log(ans);
}
module.exports = {
    ps :processScorecard
}