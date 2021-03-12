let fs=require("fs");
let path=require('path');
function view(dirPath,mode)
{
    //console.log("View Command executed");
    if(mode=="tree")
    {
     //console.log("Tree is working");
       viewTree(dirPath,"");
    }
    else if(mode=="flat")
    {
        //console.log("Flat is working");
        viewFlat(dirPath);
    }
    else
    console.log("wrong mode");
}function isFileChecker(dirPath)
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
function viewTree(dirPath,indent)
{
    //path->file/folder
    let isFile=isFileChecker(dirPath);
    if(isFile==true)
    {
      //let stArr=dirPath.split("\\");
      // let toPrint=stArr.pop();             //->>>for without path module
      // console.log(indent,toPrint+"*");
      
      // with path module

      console.log(indent,path.basename(dirPath)+"*");
    }
    else{
        //directory
        //print path
      //let stArr=dirPath.split("\\");   
      //let toPrint=stArr.pop();      ->>without path module
      //console.log(indent,toPrint+"*");
        //recursion

       //with path module
       console.log(indent,path.basename(dirPath));
       //get childrens 
        let childrens=readContent(dirPath);
        // call for viewTree
        for(let i=0;i<childrens.length;i++)
        {
            //let childPath=dirPath+"\\"+childrens[i];   //without path module
            viewTree(path.join(dirPath,childrens[i]),indent+"\t");
        }
        //console.log("children:",childrens);


    }

}

module.exports={
    viewFn:view
};