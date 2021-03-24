//npm init -y   for package.json file
//npm install request
//npm install cheerio
url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary"
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
        //console.log.(html);
        extractHtml(html);
    }
}

function extractHtml(html)
{
    let selectorTool=cheerio.load(html);
    let allCommentaries=selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");//here cheerio gives us output in form of array if multiple results are there
    console.log(allCommentaries.length);
    //rule->when we use index,we have to use cheerioselector or wrap content in cheerioselector bcoz on index .html() and .text() fuction does not work directly
    let lastbComment=selectorTool(allCommentaries[0]).text();//text() is used to convert html output to text
    console.log(lastbComment);
}
console.log("after");
    