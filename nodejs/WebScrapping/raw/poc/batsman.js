//always remove front and back spaces from the input we are taking from outside using .trim()
//when we take tables from page using selector tool than table tags get removed from tables bcoz it finds content in table tags
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
 //console.log(teamNameArr);
 let batsmanHtmlStr="";//because Actually data comes in form of string when we use .html()
 let batsmantableArr=selectorTool(".table.batsman");
 for(let i=0;i<batsmantableArr.length;i++)
 {
     batsmanHtmlStr+=selectorTool(batsmantableArr[i]).html();
 }
 //console.log(batsmanHtmlStr);

 //APPROACH 1

//  for(let i=0;i<batsmantableArr.length;i++)
//  {
//      let singleTeamAllRows=selectorTool(batsmantableArr[i]).find("tbody tr");
//      for(let j=0;j<singleTeamAllRows.length;j++)
//      {
//        let allcols=selectorTool(singleTeamAllRows[j]).find("td");
//        if(allcols.length==8)
//        {
//            let playerName=selectorTool(allcols[0]).text();
//            console.log(playerName+" of "+teamNameArr[i]);
//        }
//      }
//      console.log("````````````````````````````````````");
//  }



//APPROACH 2
for(let i=0;i<batsmantableArr.length;i++)
 {
     let batsmanName=selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell");
     for(let j=0;j<batsmanName.length;j++)
     {
         let name=selectorTool(batsmanName[j]).text();
         console.log(name+" of "+teamNameArr[i]);
     }
     console.log("````````````````````````````````````");
}

//Approach 3 using J+2 in seconnd loop
//aprroach 4 using .hasClass() in selector tool



}
console.log("After");