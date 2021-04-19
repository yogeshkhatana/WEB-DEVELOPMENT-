let puppeteer = require("puppeteer");
// let cheerio=require("cheerio");
// let request=require("request");

let{password,email}=require("./secrets.js");
let{codes}=require("./code");
const code = require("./code");
let gtab;//gtab(global tab) for taking refrence from newTab so that it works for all code

console.log("before");

let browserPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--incognito","--start-maximized"]//for maximizing screen and going into incognito
})

browserPromise
    .then(function(browserInstance)
    {
        let newTabPromise=browserInstance.newPage();
        return newTabPromise;//return used here for chaining then so that all then in code works serially not in parallel
   })
   .then(function(newTab)
   {
       //console.log(newTab);
       let loginPageWillBeOpenedPromise=newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
       gtab=newTab;//newtab is just a refrence of whole page on which we do our task
       return loginPageWillBeOpenedPromise;
   })
   .then(function()
   {
       //console.log("login page opened");
       let emailWillBeTypedPromise=gtab.type('#input-1',email,{delay:100});
       return emailWillBeTypedPromise;

   })
   .then(function()//not passing a parameter bcozz we make gtab global it will take from there
   {
       let passwordWillBeTypedPromise=gtab.type('#input-2',password,{delay:100});
       return passwordWillBeTypedPromise;
   })
   .then(function()
   {
       let loginPageWillBeClickedPromise=gtab.click("button[data-analytics='LoginPassword']");
    //    let IPKitChallenge=gtab.waitForSelector(".card-content h3[title='Interview Preparation Kit']",{visible:true});
    //    let combinedPromise=Promise.all([loginPageWillBeClickedPromise,gtab.waitForNavigation({waituntil:"networkidle0"}),IPKitChallenge]);
    //    return combinedPromise;
       return loginPageWillBeClickedPromise;
   })
   .then(function()
   {
       console.log("Login Done");
       let clickIPKIT=waitAndClick(".card-content h3[title='Interview Preparation Kit']");
       //   OR
       //Not using waitForNavigation,using only waitForSelector
    //    let clickPromise=gtab.click(".card-content h3[title='Interview Preparation Kit']");
    //    let warmUpChallenge=gtab.waitForSelector("a[data-attr1='warmup']",{visible:true});
    //    let combinedPromise=Promise.all([clickPromise,gtab.waitForNavigation({waituntil:"networkidle0"}),warmUpChallenge]);
    //    return combinedPromise;
       return clickIPKIT;
   })
   .then(function()
   {
    //    let clickPromise=gtab.click("a[data-attr1='warmup']");
    //    let sockMerchantPromise=gtab.waitForSelector("a[data-attr1='sock-merchant']",{visible:true});
    //    let combinedPromise=Promise.all([clickPromise,gtab.waitForNavigation({waituntil:"networkidle0"}),sockMerchantPromise]);
    //    return combinedPromise;
    //               OR
          let warmupClick=waitAndClick("a[data-attr1='warmup']");
          return warmupClick;
   })
//    .then(function()
//    {
//     //    let clickPromise=gtab.click("a[data-attr1='sock-merchant']");
//     //    let combinedPromise=Promise.all([clickPromise,gtab.waitForNavigation({waituntil:"networkidle0"})]);
//     //    return combinedPromise;
//           let sockMerchantClick=waitAndClick("a[data-attr1='sock-merchant']");
//           return sockMerchantClick;
//    })
   .then(function()
   {
       return gtab.url()//url function gives url of page
   })
   .then(function(url)
   {
       console.log(url);
       let questionObj=codes[0];
       let fqsp=questionSolver(url,questionObj.soln,questionObj.qName);
       for(let i=1;i<codes.length;i++)
       {
         fqsp=fqsp.then(function(){
             return questionSolver(url,codes[i].soln,codes[i].qName);
         })
       }
       return fqsp;
   })
   .then(function(){
     console.log("All Questions Submitted");
   })
   .catch(function(err)
   {
       console.log(err);
   })

 //promise based function->Wait and Click
 function waitAndClick(selector)
 {
     return new Promise(function(resolve,reject)
     {
         let selectorWaitPromise=gtab.waitForSelector(selector,{visible:true});
         selectorWaitPromise
            .then(function()
            {
                let selectorClickPromise=gtab.click(selector);
                return selectorClickPromise;
            }).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            })
     })
 } 
 
 function questionSolver(modulePageUrl,code,questionName)
 {
  return new Promise(function(resolve,reject){
      //page visit
      let reachedPageUrlPromise=gtab.goto(modulePageUrl);
      reachedPageUrlPromise
        .then(function()
        {
            //page h4->matching h4->click
            //evaluate function of puppeteer executes inside browser
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
            let pageClickPromise=gtab.evaluate(browserConsoleRunFn,questionName);
            return pageClickPromise;
        })
        .then(function(){
          //checkbox click
          
          let inputWillBeClickedPromise=waitAndClick(".checkBoxWrapper");
          return inputWillBeClickedPromise;
        })
        .then(function(){
            //type  
            let codeWillBeTypedPromise=gtab.type(".input.text-area.custominput.auto-width",code);
            return codeWillBeTypedPromise;
        })
        .then(function(){
            let controIsHoldPromise=gtab.keyboard.down("Control");
            return controIsHoldPromise;
        })
        .then(function(){
            //ctrl a
            let aisPressedPromise=gtab.keyboard.press("a");
            return aisPressedPromise;
        })
        .then(function(){
            //ctrl x
            let cutPromise=gtab.keyboard.press("X");
            return cutPromise;
        })
        .then(function(){
            let editorWillBeClickedPromise=gtab.click(".monaco-editor.no-user-select.vs");//in monaco or any editor for inspecting in them we have to inspect on upper edge so that we can get selector for that bcoz on right clicking on it inspect option not come
            return editorWillBeClickedPromise;
        })
        .then(function(){
            //ctrl a
            let aisPressedPromise=gtab.keyboard.press("A");
            return aisPressedPromise;
        })
        .then(function(){
            //ctrl v
            let pastePromise=gtab.keyboard.press("v");
            return pastePromise;
        })
        .then(function(){
            //submit
            let submitIsClickedPromise=gtab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");//not using waitAndClick bcoz selectors already loaded or we can use also
            return submitIsClickedPromise;
        })
        .then(function(){
            let controIsHoldPromise=gtab.keyboard.up("Control");
            return controIsHoldPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })


  })
 }
console.log("After");
