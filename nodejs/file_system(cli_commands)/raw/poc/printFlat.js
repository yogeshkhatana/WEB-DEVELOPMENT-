//file system->nodejs modules
//google
let fs=require("fs");
let path=require('path');
function isFileChecker(dirPath)
{
  return fs.lstatSync(dirPath).isFile();
}
function readContent(dirPath)
{
  return fs.readdirSync(dirPath);
}
function viewFlat(dirPath)
{
    //path->file/folder
    let isFile=isFileChecker(dirPath);
    if(isFile==true)
    {
      console.log(dirPath+"*");
    }
    else{
        //directory
        //print path
        console.log(dirPath);
        //get children
        let childrens=readContent(dirPath);
        // call for viewFlat 
        for(let i=0;i<childrens.length;i++)
        {
            viewFlat(path.join(dirPath,childrens[i]));//we can also use -->dirPath+"/"+childrens[i]  or \ if cmd / if bash at joining time
            // path.join method automatically joins according to cmd,bash etc best approach
        }
        //console.log("children:",childrens);


    }

}

viewFlat("d10");