const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const pdfkit = require('pdfkit');

function getIssuesPageHtml(url , topic, repoName){
    request(url , cb);
    function cb(err , response, html){
        if(err){
            console.log(err);
        }
        else if(response.statusCode == 404){
            console.log("Page not found");
        }
        else{
            //console.log(html);
            getIssues(html,topic);
        }
    }
    
    function getIssues(html){
        
        let $ = cheerio.load(html);
        let issueElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];
        for(let i=0;i<issueElemArr.length;i++)
        {
            let link =  $(issueElemArr[i]).attr("href");
            arr.push("https://github.com" +link);
            //let fullLink = `https://www.github.com/${arr[i]}`;
            //console.log(arr[i]);
            console.log(topic);
            console.log(repoName);

        }
        let folderPath = path.join(__dirname , topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath , repoName+".pdf");
        //fs.writeFileSync(filePath , JSON.stringify(arr));
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        
        

        

    }
}


module.exports = getIssuesPageHtml;
function dirCreator(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }

}