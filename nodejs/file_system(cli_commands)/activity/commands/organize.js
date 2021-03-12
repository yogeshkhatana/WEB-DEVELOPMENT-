let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeExecutor(toOrganizeDirPath)
{
    //console.log("Organize command implemented");
    //create directories
    let organizedFilesPath=path.join(toOrganizeDirPath,"organized_files");
    
    dirCreator(organizedFilesPath);
    
    //organized_files->sub directory
    for(let key in types)
    {
        let innerDirPath=path.join(organizedFilesPath,key);
        dirCreator(innerDirPath);
    }
    let otherPath=path.join(organizedFilesPath,"others");
    dirCreator(otherPath);
    orgFiles(toOrganizeDirPath,organizedFilesPath); 
    //traverse and copy files
    

 
    
}
function dirCreator(dirPath)
{
    if(fs.existsSync(dirPath)==false)
    {
        fs.mkdirSync(dirPath);
    }
}   
function isFileChecker(dirPath)
{
  return fs.lstatSync(dirPath).isFile();
}
function readContent(dirPath)
{
  return fs.readdirSync(dirPath);
}

function orgFiles(dirPath,organizedFilesPath)
{
    let isFile=isFileChecker(dirPath);
    if(isFile==true)
    {
        //identify dest folder
        //console.log(dirPath);
        let destFolderName=getFolderName(dirPath);
        console.log(dirPath,"-->",destFolderName);

        //copy

        //dirPath->C:\Users\YOGESH KHATANA\Downloads\Video\GMT20210213-043128_FS-part-1-_1920x1080.mp4

        let destFolderPath=path.join(organizedFilesPath,destFolderName);
        copytodest(dirPath,destFolderPath);
        
}
    else{
          let childrens=readContent(dirPath);
        
          for(let i=0;i<childrens.length;i++)
          {
            
            orgFiles(path.join(dirPath,childrens[i]),organizedFilesPath);
          }
        }
}

function getFolderName(dirPath)
{
    let strArr=dirPath.split(".");  //it gives string array splitted with dot
    let ext=strArr.pop();//to get last element from array i.e. extension here
    //alternative => path.ext(dirPath) but it gives dot extension as output eg-> .js it can be managed with help of substring
    //console.log(ext);

    for(let key in types)
    {
        for(let i=0;i<types[key].length;i++)
        {
            if(types[key][i]==ext)
            {
                return key;
            }
        }
    }
    return "others";

}


function copytodest(dirPath,destFolderPath)
        {
          let originalName=path.basename(dirPath);
          let destFilePath=path.join(destFolderPath,originalName);
          fs.copyFileSync(dirPath,destFilePath);
        }

module.exports={
    organizeFn:organizeExecutor
};