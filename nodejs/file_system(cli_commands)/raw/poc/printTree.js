//file system->nodejs modules
//google
let fs=require("fs");
let path=require("path");
function isFileChecker(dirPath)
{
  return fs.lstatSync(dirPath).isFile();
}
function readContent(dirPath)
{
  return fs.readdirSync(dirPath);
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
      //console.log(indent,toPrint);
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

viewTree('C:\\Users\\YOGESH KHATANA\\Downloads',"");