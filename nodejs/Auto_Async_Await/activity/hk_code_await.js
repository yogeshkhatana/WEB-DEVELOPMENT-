let puppeteer = require("puppeteer");
// let cheerio=require("cheerio");
// let request=require("request");

let{password,email}=require("./secrets.js");
let{codes}=require("./code");
//const code = require("./code");
let gtab;//gtab(global tab) for taking refrence from newTab so that it works for all code

console.log("before");
//In async function we have to write code in try catch to handle any error
(async function(){
    try{
        let browserInstance=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--incognito","--start-maximized"]//for maximizing screen and going into incognito
        });
        let newTab=await browserInstance.newPage();
        await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await newTab.type('#input-1',email,{delay:100});
        await newTab.type('#input-2',password,{delay:100});
        await newTab.click("button[data-analytics='LoginPassword']");
        console.log("Login Done");
        await waitAndClick(".card-content h3[title='Interview Preparation Kit']",newTab);
        await waitAndClick("a[data-attr1='warmup']",newTab);
        let url = newTab.url();//not using await here bcoz url doesn't return a promise
        for(let i=0;i<codes.length;i++)
        {
            await questionSolver(url,codes[i].soln,codes[i].qName,newTab);
        }
    }
    catch(err)
    {
        console.log(err);
    }
})();

async function waitAndClick(selector,gtab)
 {
        await gtab.waitForSelector(selector,{visible:true});
         
        let  selectorClickPromise=gtab.click(selector);//here we are not using await bcoz at fn call already await is used i.e its already waiting for a promise thats why we have to return promise
        //   or
        //we didn't wait this promise because we want the calling person to await this promise based async function.        
        return selectorClickPromise;
 } 
 
 //in questionSolver we didn't require try catch bcoz its err cought in main function which call this
 async function questionSolver(modulePageUrl,code,questionName,gtab)
 {
  
      //page visit
     await gtab.goto(modulePageUrl);
     function browserConsoleRunFn(questionName)
     {
         let allH4Elem=document.querySelectorAll("h4");
         let textArr=[];

         for(let i=0;i<allH4Elem.length;i++)
         {
             let myQuestion=allH4Elem[i].innerText.split("\n")[0];//to select part before \n
             textArr.push(myQuestion);
         }
         let idx=textArr.indexOf(questionName);//it gives index
         console.log(idx);
         console.log("hello");
         allH4Elem[idx].click();//clicking on first question through browser console
         console.log("clicked");
     }
     
    //page h4->matching h4->click
    //evaluate function of puppeteer executes inside browser
    await gtab.evaluate(browserConsoleRunFn,questionName);
    //checkbox click
    await waitAndClick(".checkBoxWrapper",gtab);
    //type  
    await gtab.type(".input.text-area.custominput.auto-width",code);
    await gtab.keyboard.down("Control");
    //ctrl a
    await gtab.keyboard.press("a");
    //ctrl x
    await gtab.keyboard.press("X");
    await gtab.click(".monaco-editor.no-user-select.vs");//in monaco or any editor for inspecting in them we have to inspect on upper edge so that we can get selector for that bcoz on right clicking on it inspect option not come
    //ctrl a
    await gtab.keyboard.press("A");
    //ctrl v
    await gtab.keyboard.press("v");
    //submit
    await gtab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");//not using waitAndClick bcoz selectors already loaded or we can use also
    return gtab.keyboard.up("Control");//we didn't wait this promise because we want the calling person to await this promise based async function.
}
console.log("After");
