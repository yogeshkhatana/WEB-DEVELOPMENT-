let puppeteer=require("puppeteer");
let fs=require("fs");
let links=["https://www.amazon.in","https://www.flipkart.com","https://www.paytmmall.com"];
let pName=process.argv[2];

console.log("Before");
(async function(){
    try{
        let browserInstance=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        let AmazonArr=await getListingFromAmazon(links[0],browserInstance,pName);
        console.log(AmazonArr);

        let FlipkartArr=await getListingFromFlipkart(links[1],browserInstance,pName);
        console.table(FlipkartArr);

        let PaytmMallArr=await getListingFromPaytmMall(links[2],browserInstance,pName);
        console.table(PaytmMallArr);
    }
    catch(err){
     console.log(err);
    }
})();
//product name,url name of amazon page
//output->top 5 matching product->price name print 

async function getListingFromAmazon(link,browserInstance,pName)
{
 let newTab=await browserInstance.newPage();   
 await newTab.goto(link);
 await newTab.type('#twotabsearchtextbox',pName);
 await newTab.click(".nav-search-submit.nav-sprite");
 await newTab.waitForSelector(".a-price-whole",{visible:true});//ideally we have to wait for both price and name selector but here works with only one selector
 function consoleFn(priceSelector,pNameSelector)
 {
     let priceArr=document.querySelectorAll(priceSelector);
     let pName=document.querySelectorAll(pNameSelector);
     let details=[];
     //pushing name and price in a single array
     for(let i=0;i<5;i++)
     {
         if(priceArr[i]&&pName[i]){//for checking if price is not null then add into array
         let price=priceArr[i].innerText;
         let Name=pName[i].innerText;
         details.push({
             price,Name
         })}

     }
     return details;
 }
 return newTab.evaluate(consoleFn,".a-price-whole",".a-size-medium.a-color-base.a-text-normal");
} 

//flipkart
async function getListingFromFlipkart(link,browserInstance,pName)
{
 let newTab=await browserInstance.newPage();   
 await newTab.goto(link);
 await newTab.click("._2KpZ6l._2doB4z");//for closing pop up
 await newTab.type('._3704LK',pName);
 await newTab.click(".L0Z3Pu");
 await newTab.waitForSelector("._4rR01T",{visible:true});
 function consoleFn(priceSelector,pNameSelector)
 {
     let priceArr=document.querySelectorAll(priceSelector);
     let pName=document.querySelectorAll(pNameSelector);
     let details=[];
     //pushing name and price in a single array
     for(let i=0;i<5;i++)
     {   
         if(priceArr[i]&&pName[i]){
         let price=priceArr[i].innerText;
         let Name=pName[i].innerText;
         details.push({
             price,Name
         })}

     }
     return details;
 }
 return newTab.evaluate(consoleFn,"._30jeq3._1_WHN1","._4rR01T");
} 


//Paytm Mall
async function getListingFromPaytmMall(link,browserInstance,pName)
{
 let newTab=await browserInstance.newPage();   
 await newTab.goto(link);
 
 await newTab.type('#searchInput',pName,{delay:200});
 await newTab.keyboard.press("Enter",{delay:200});
 await newTab.waitForSelector(".UGUy",{visible:true});
 function consoleFn(priceSelector,pNameSelector)
 {
     let priceArr=document.querySelectorAll(priceSelector);
     let pName=document.querySelectorAll(pNameSelector);
     let details=[];
     //pushing name and price in a single array
     for(let i=0;i<5;i++)
     {
         let price=priceArr[i].innerText;
         let Name=pName[i].innerText;
         details.push({
             price,Name
         })

     }
     return details;
 }
 return newTab.evaluate(consoleFn,"._1kMS",".UGUy");
} 
