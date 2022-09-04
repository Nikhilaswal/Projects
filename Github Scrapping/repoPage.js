const request = require('request');
const cheerio = require('cheerio');
const getIssuesPageHtml = require("./issue");

function getRepoPageHTML(url , topic){
    request(url , cb);
    function cb(err , response, html){
        if(err){
            console.log(err);
        }
        else{
            getRepoLink(html);
            //console.log(html);
        }
    }

    function getRepoLink(html){
        let $ = cheerio.load(html);
        let headingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        //console.log(topic);
        for(let i=0;i<8;i++){
           let twoAnchor =  $(headingArr[i]).find("a");
           let link = $(twoAnchor[1]).attr("href");
           console.log(link);
           let fullLink = "https://github.com" +link+"/issues";
           console.log(fullLink);
           let repoName = link.split("/").pop();
           getIssuesPageHtml(fullLink , topic ,repoName);
        }
        console.log("**********************************************************************")
    }
}

module.exports = getRepoPageHTML;