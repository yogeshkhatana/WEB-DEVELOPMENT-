//commands--->
//view --tree,--flat
//organize->same folder,multiple folder
//help
//node mycli.js view dirName mode
//node mycli.js organize -/foldername
//node mycli.js help
let input=process.argv.slice(2);    
let cmd=input[0];
let viewFile=require("./commands/view");//here we have to access like that vieFile.viewFn()
let {helpFn}=require("./commands/help");//its a shotcut for directly accessing variables and functions,here helpFn() directly
let {organizeFn}=require("./commands/organize");

switch(cmd)
{
    case 'view':
        viewFile.viewFn(input[1],input[2]);
        break;
    case 'organize':
        organizeFn(input[1]);
        break;
    case "help":
        helpFn();
        break;        
    default:
        console.log(`Wrong Command Entered,      
        Enter help for list of all commands`);    //use back tick for multi line strings in js
}





