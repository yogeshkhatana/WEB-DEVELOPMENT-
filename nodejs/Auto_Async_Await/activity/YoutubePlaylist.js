let puppeteer=require("puppeteer");
let fs=require("fs");
//to get->>
//no. of videos
//views
//watch time->get
//list of videos->[name ,duration]
//initial page data get
//handle->loader

console.log("Before");
(async function(){
        try{
            let browserInstance=await puppeteer.launch({
                headless:false,
                defaultViewport:null,
                args:["--start-maximized"]
            });
            let newPage=await browserInstance.newPage();
            await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");
            //evaluate
            let arr=await newPage.evaluate(consoleFn);
            console.table(arr);
            let videoCount=arr[0].split(" ")[0];
            videoCount=Number(videoCount);//typecast
            console.log(arr[0]);
            console.log(arr[1]);
            //get video name,duration
            //#video-title-> video name
            //span.style-scope.ytd-thumbnail-overlay-time-status-renderer->video duration
            
            let pCurrentVideosCount=await ScrolltoBottom(newPage,"#video-title");
            while(videoCount-50>pCurrentVideosCount)
            {
                pCurrentVideosCount=await ScrolltoBottom(newPage,"#video-title");
            }
            //later
            let timeDurArr=await newPage.evaluate(getStats,"span.style-scope.ytd-thumbnail-overlay-time-status-renderer","#video-title");
            console.table(timeDurArr);
        }
        catch(err)
        {
            console.log(err);
        }
})();

function consoleFn()
{
    let arr=document.querySelectorAll("#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
    let newarr=[];
    newarr.push(arr[0].innerText,arr[1].innerText);
    return newarr;
}

function getStats(durationSelector,title)
{
    let dElemarr=document.querySelectorAll(durationSelector);
    let titleElementArr=document.querySelectorAll(title);
    
    let nameNdurArr=[];
    for(let i=0;i<dElemarr.length;i++)
    {
      let duration=dElemarr[i].innerText;
      let title=titleElementArr[i].innerText;
      nameNdurArr.push({duration,title});
    }
    return nameNdurArr;

}
//scroll
async function ScrolltoBottom(page,title)
{
    function getLengthConsoleFn(title)
    {
        window.scrollBy(0,window.innerHeight);
        let titleElemArr=document.querySelectorAll(title);
        console.log("TitleLength",titleElemArr.length);
        return titleElemArr.length;
    }
    return page.evaluate(getLengthConsoleFn,title);
}