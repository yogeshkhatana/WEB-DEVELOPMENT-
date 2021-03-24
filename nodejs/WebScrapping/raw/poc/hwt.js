let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request=require("request");
let cheerio=require("cheerio");
console.log("BEFORE");

request(url,cb);
function cb(error,response,html)
{
 if(error)
 console.log(error)
 else
 //console.log(html);
 extractHtml(html);
}

function extractHtml(html)
{
    let selectorTool=cheerio.load(html);
    //step 1.get bowler table from whole page
    let bowlersTable = selectorTool(".table.bowler");
    let stringhtml="";
    for(let i=0;i<bowlersTable.length;i++)
    {
        stringhtml+=selectorTool(bowlersTable[i]).html();
    }
    //console.log(stringhtml);
    
    //2.Get all bowlers name,wickets


    //find function is used to find within an element
    //selector tool find in whole page
    for(let i=0;i<bowlersTable.length;i++)
    {
     let singleInningBol=selectorTool(bowlersTable[i]).find("tbody tr");
     for(let j=0;j<singleInningBol.length;j++)
     {
         let singleAllCol=selectorTool(singleInningBol[j]).find("td");
         let name=selectorTool(singleAllCol[0]).text();
         let wickets=selectorTool(singleAllCol[4]).text();
         console.log("Name->",name+" Wickets->",wickets);
     }
     console.log("````````````````````````````````````````````");
    }
    //3.compare wickets
}
