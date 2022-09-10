const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const allMatchobj = require('./All_Match');


request(url, cb);
function cb(error, response,html){
    if(error)
    {
        console.log(error);
    }
    else{
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    console.log(html);
    let anchorElem = $(".ds-block.ds-text-center.ds-uppercase.ds-text-ui-typo-primary.ds-underline-offset-4.ds-block");
    let link = anchorElem.attr("href");
    console.log(link);
    let fulllink = "https://www.espncricinfo.com"+link ;
    //getAllMatchesLink(fulllink);
    allMatchobj.getMatches(fulllink);
}


function dirCreator(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}

const  iplPath = path.join(__dirname , "ipl");
dirCreator(iplPath);

