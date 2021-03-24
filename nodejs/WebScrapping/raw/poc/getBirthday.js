let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let request=require("request");
let cheerio=require("cheerio");
console.log("BEFORE");
request(url,cb);
function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        //console.log(html);
        extractHtml(html);
    }
}
function extractHtml(html)
{
 let selectorTool=cheerio.load(html);
 let teamNameElemArr=selectorTool(".Collapsible h5");
 let teamNameArr=[];
 for(let i=0;i<teamNameElemArr.length;i++)
 {
     let teamName=selectorTool(teamNameElemArr[i]).text();
     teamName=teamName.split("INNINGS")[0];
     teamName=teamName.trim();//always use trim best practice
     //console.log(teamName);
     teamNameArr.push(teamName);
 }
 
 let batsmantableArr=selectorTool(".table.batsman");
 for(let i=0;i<batsmantableArr.length;i++)
 {
    let batsmanNameAnchor=selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell a");
    //let batsmanPageLink=batsmanNameAnchor.attr("href");//.attr() is a function to get attributes data that are passed, it gives us output in array here without loop it gives us first anchor of both tables so to get all anchors we have to use loop
    for(let j=0;j<batsmanNameAnchor.length;j++)
    {
        let name=selectorTool(batsmanNameAnchor[j]).text();//bcoz in anchor tag name of player is present in between anchor tag
        let teamName=teamNameArr[i];
        let batsmanPageLink=selectorTool(batsmanNameAnchor[j]).attr("href");
        //console.log(batsmanPageLink);
        console.log(name+" "+teamName+" "+batsmanPageLink);
        printBirthday(batsmanPageLink,name,teamName);   
    }
    console.log('````````````````````````````````````````````');
 }
 
}
function printBirthday(batsmanPageLink,name,teamName)
{
    request(batsmanPageLink,cb);
    function cb(error,response,html)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            //console.log(html);\
            extractBirthday(html,name,teamName);
            
        }
        console.log("``````````````````````````````");
    }
}

function extractBirthday(html,name,teamName)
{
    let selectorTool=cheerio.load(html);
    let birthdayElem=selectorTool(".ciPlayerinformationtxt span");
    let birthday=selectorTool(birthdayElem[1]).text();
    console.log(name+" Plays for "+teamName+" was born on "+birthday);

}
console.log("After");