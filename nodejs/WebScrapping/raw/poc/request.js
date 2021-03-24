//npm init -y   for package.json file
//npm install request
//npm install cheerio
let request=require("request");
let cheerio=require("cheerio");
console.log("BEFORE");
request("https://www.google.com",cb);
function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        extractHtml(html);//for extracting html
        //console.log(html);
    }
}

function extractHtml(html)
{
    let selectorTool=cheerio.load(html);//for loading html
    let selectElem=selectorTool("#SIvCob");//for selecting particular element
    console.log(selectElem.text());//to convert selectElement to text
    console.log(selectElem.html());//to convert  selectElement to html
}
console.log("after");
    