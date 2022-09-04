const request  = require('request');
const cheerio = require('cheerio');
const getRepoPageHTML = require("./repoPage");
let url = "https://github.com/topics";

request(url , cb);
function cb(error , response , html){
    if(error){
        console.log(error);
    }
    else{
        //console.log(html);
        getTopicLink(html);
    }
}
function getTopicLink(html){
    let $ = cheerio.load(html);
    let linkElem = $(".no-underline.d-flex.flex-column.flex-justify-center");
    
    for(let i=0;i<linkElem.length;i++){
        let href = $(linkElem[i]).attr("href");

        let topic = href.split("/").pop();
        //console.log(href);
        let fullLink = "https://github.com"+ href;
        //console.log(fullLink); 
        

        getRepoPageHTML(fullLink , topic);
    }
}
