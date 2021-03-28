let fs=require("fs");
let path=require("path");
let request=require("request");
let cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url,cb);
function cb(err,response,html)
{
 if(err)
 console.log(html);
 else
//  console.log(html);
 extractLink(html);
}

function extractLink(html)
{
 let selectorTool=cheerio.load(html);
 let linkArr=selectorTool(".label.blue-text.blue-on-hover");
 let link=selectorTool(linkArr[0]).attr("href");
 let FullLink="https://www.espncricinfo.com"+link;
 //console.log(FullLink);
 extractHtml(FullLink);
}

function extractHtml(FullLink)
{
    request(FullLink,cb);
    function cb(err,response,html)
    {
        if(err)
        console.log(err);
        else
        //console.log(html);
        extractTeamNames(html);
    }
}

function extractTeamNames(html)
{
    let arr=[]
    let selectorTool=cheerio.load(html);
    let teamNameArr=selectorTool(".text-capitalize.mb-0.ml-2");
  
    for(let i=0;i<teamNameArr.length-3;i++)
    {
        //console.log(selectorTool(teamNameArr[i]).text());
        arr.push(selectorTool(teamNameArr[i]).text().trim());
        dirCreator(arr[i]);
    }
    //console.log(arr);
    
}

function dirCreator(fileName)
{
 let foldePath=path.join(__dirname,fileName);
 if(fs.existsSync(foldePath)==false)
 {
     fs.mkdirSync(foldePath);
 }
}

