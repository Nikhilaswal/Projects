const request = require('request');
const cheerio = require('cheerio');

const scorecardobj = require("./scorecard"); 


function getAllMatchesLink(url){
    request(url , function(err, response ,html){
        if(err){
            console.log(err);
        }
        else{
            getlinks(html);
        }
    })
}
function getlinks(html){

        let $ = cheerio.load(html);
        let scoreCard = $(".ds-text-ui-typo.ds-underline-offset-4.ds-block");
        for(let i=0;i<scoreCard.length;i++)
        {
            //let scorelinks = scoreCard.attr("href");
            let scoreT = $(scoreCard[i]).text();
            if( scoreT == "Scorecard"){
                let scorelinks = $(scoreCard[i]).attr("href");
                
    
                let Fulllink = "https://www.espncricinfo.com"+scorelinks;
                console.log(Fulllink);
                scorecardobj.ps(Fulllink);
            }
        
    }
}


module.exports = {
    getMatches : getAllMatchesLink
}
