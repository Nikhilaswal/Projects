const puppeteer = require('puppeteer');
const pdf = require('pdfkit');
const fs = require('fs');
const path = require('path');

const link = "https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj";

let newTab;
(async function(){
    try {
        let browserInsatnce = await puppeteer.launch({
            headless : false,
            defaultViewport:null,
            args: ['--start-maximized']
        })
    
        let Pages = await browserInsatnce.pages();
        newTab = Pages[0];
        await newTab.goto(link);
        await newTab.waitForSelector("h1#title");
        let name = await newTab.evaluate(function(select){
            return document.querySelector(select).innerText
        } , "h1#title");

       

        let allData = await newTab.evaluate(getData, "#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
        console.log(name);
        let videos = allData.videos;
        let views = allData.views;
        console.log(videos);
        console.log(views);

        let totalVideos = videos.split(" ")[0];
        console.log(totalVideos);
        let currentVid = await getCurrentVideos();
        console.log(currentVid);


        while(totalVideos - currentVid > 50){
            await scrollToBottom();
            currentVid = await getCurrentVideos();

        }
        console.log("Done");
        let finalList = await getStats();

        //creating pdf ************
        let pdfDoc = new pdf;
        pdfDoc.pipe(fs.createWriteStream("play.pdf"))
        pdfDoc.text(JSON.stringify(finalList));
        pdfDoc.end();
        //************************************* */
        

        
    } catch (error) {
        console.log(error);
    }
})()

function getData(selector){
    let tableArr = document.querySelectorAll(selector);
    let videos = tableArr[0].innerText;
    let views = tableArr[1].innerText;
    
    return {
        videos,
        views
    }
}

async function getCurrentVideos(){
    let length = await newTab.evaluate(getLength , "#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer");
    return length;
}

function getLength(NoOfVideos){
    let renderedVideos = document.querySelectorAll(NoOfVideos);
    return renderedVideos.length;
}


async function scrollToBottom(){
    await newTab.evaluate(goToBottom)
    function goToBottom(){
        window.scrollBy(0, window.innerHeight);
        
    }
}

async function getStats(){
    let list = await newTab.evaluate(getNameAndDuration , "#video-title" , "#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer");  
    return list ;
} 

function getNameAndDuration(videoSelctor , durationSelector){
    let videoElem = document.querySelectorAll(videoSelctor);
    let durationElem = document.querySelectorAll(durationSelector);

    let currentList = [];
    for(let i=0;i<durationElem.length;i++)
    {
        let videoTitle = videoElem[i].innerText;
        let duration = durationElem[i].innerText;
        currentList.push({videoTitle, duration});
    }
    
    return currentList;
}