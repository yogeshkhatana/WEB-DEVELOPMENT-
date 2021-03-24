let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
let PDFDocument=require("pdfkit");
console.log("Before");
request("https://github.com/topics",cb);

function cb(error,response,html)
{
 if(error)
 console.log(error);
 else
 extractHtml(html);
}

function extractHtml(html)
{
let selectorTool=cheerio.load(html);
let topicsArr=selectorTool(".col-12.col-sm-6.col-md-4.mb-4 a");
for(let i=0;i<topicsArr.length;i++)
{
    let link=selectorTool(topicsArr[i]).attr("href");
    let fullLink="https://github.com"+link;
    console.log(fullLink);
    processrepoPage(fullLink);
}
}

function processrepoPage(fullLink)
{
    request(fullLink,cb);
    function cb(error,response,html)
    {
    if(error)
    console.log(error);
    else
    getRepoLinks(html);
    }

}

function getRepoLinks(html)
{
    let selectorTool=cheerio.load(html);
    let topicElem=selectorTool(".h1-mktg");
    let topicName=topicElem.text().trim();
    dirCreator(topicName);
    let arr=selectorTool("a.text-bold");
    for(let i=0;i<8;i++)
    {
        let link=selectorTool(arr[i]).attr("href");
        fullLink="https://github.com"+link;
        console.log(fullLink);
        let repoName=fullLink.split('/').pop();
        fileCreator(topicName,repoName);
        let newLink=(fullLink+"/issues");
        getIssueLinks(newLink,topicName,repoName);
    }
    console.log("`````````````````````````````");
}

function getIssueLinks(newLink,topicName,repoName)
{
    console.log(newLink);
    request(newLink,cb);
    function cb(err,response,html)
    {
        if(err)
        console.log(err);
        else
        extractIssues(html,topicName,repoName);
    }
}

function extractIssues(html,topicName,repoName)
{
    let selectorTool=cheerio.load(html);
    let anchorsArr=selectorTool("a[data-hovercard-type='issue']");
    let arr=[];
    for(let i=0;i<anchorsArr.length;i++)
    {
        let name=selectorTool(anchorsArr[i]).text();
        let link=selectorTool(anchorsArr[i]).attr('href');
        arr.push(
            {
                Name:name,
                Link:"https://github.com"+link
            })
    }
    
    //console.table(arr); //table used to get output of an object or  array of objects in table form

    
    var filePath=path.join(__dirname,topicName,repoName+".json");
    fs.writeFileSync(filePath,JSON.stringify(arr));

    //array->pdf file
    var filePath=path.join(__dirname,topicName,repoName+".pdf");
    let pdfDoc=new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.end();
}

function dirCreator(topicName)
{
  let folderPath=path.join(__dirname,topicName);//The __dirname in a node script returns the path of the folder where the current JavaScript file resides
  if(fs.existsSync(folderPath)==false)
  {
      fs.mkdirSync(folderPath);
  }
}

function fileCreator(topicName,repoName)
{
  let filePath=path.join(__dirname,topicName,repoName+".json");
  if(fs.existsSync(filePath)==false)
  {
      fs.openSync(filePath,"w");//for creating a new empty file, w stands for writing so file opened for writing
  }
}
console.log("After");  