let videoPlayer=document.querySelector('video');
let videoRecordBtn=document.querySelector('#record-video');
let constraints={video:true,audio:true};//for taking permissions from user
let captureBtn=document.querySelector('#click-picture');
let mediaRecorder;
let recordState=false;
let chunks=[];

let filter='';
let currZoom=1;
let zoomInBtn=document.getElementById("in");//get elementById used for element with id so don't using # here for selecting as in querySelector as well as we have getElementByClass also.
let zoomOutBtn=document.getElementById("out");

zoomInBtn.addEventListener('click',function(){
    console.log(videoPlayer.style.transform);
    let vidScale=Number(
        videoPlayer.style.transform.split("(")[1].split(")")[0]
    )
    if(vidScale<3)
    {
        currZoom=vidScale+0.1;
        videoPlayer.style.transform=`scale(${currZoom})`;
    }

})

zoomOutBtn.addEventListener('click',function(){
    console.log(videoPlayer.style.transform);
    let vidScale=Number(
        videoPlayer.style.transform.split("(")[1].split(")")[0]
    )
    if(vidScale>1)
    {
        currZoom=vidScale-0.1;
        videoPlayer.style.transform=`scale(${currZoom})`;
    }

})



let allFilters=document.querySelectorAll('.filter');
for(let i=0;i<allFilters.length;i++)
{
    allFilters[i].addEventListener('click',function(e){
       filter=e.currentTarget.style.backgroundColor;//current target for that div on which we click
       removeFilter();
       addFilterToScreen(filter);

    })
}

function addFilterToScreen(filterColor){
  let filter=document.createElement('div');
  filter.classList.add('on-screen-filter');
  filter.style.height='100vh';
  filter.style.width='100vw';
  filter.style.backgroundColor=`${filterColor}`;
  filter.style.position='fixed';
  filter.style.top='0px';
  document.querySelector('body').appendChild(filter);
}

function removeFilter(){
    let el=document.querySelector('.on-screen-filter');
    if(el){
        el.remove();
    }
}

videoRecordBtn.addEventListener("click",function(){
    if(mediaRecorder!=undefined)
    {
        removeFilter();
        let innerDiv=document.querySelector('#record-div');
        if(recordState==false)
        {
            recordState=true;
            // videoRecordBtn.innerText=" Recording.....";
            innerDiv.classList.add('recording-animation');
            mediaRecorder.start();
        }
        else{
            recordState=false;
            innerDiv.classList.remove('recording-animation')
            mediaRecorder.stop();
        //    videoRecordBtn.innerText="Record";
        }
    }
})

navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){//navigatoris an api, used for taking access, mediadevices is an object used to take permission for using webcam,microphone etc.
   // getUserMedia takes constraints as a parameter and returns a promise->which is resolve or reject accordingly
   // in resolve it gives mediaStream which is basically a data
   videoPlayer.srcObject=mediaStream;
   mediaRecorder=new MediaRecorder(mediaStream);//it gives us media recorder on passing mediaStream
   mediaRecorder.ondataavailable=function(e){
       //ondataavailable,onstop are eventListener and using = here to attach a function to eventListener
       chunks.push(e.data);
   }
   mediaRecorder.onstop=function(){
       let blob=new Blob(chunks,{type:'video/mp4'});
       //type can be video,mp4,etc.
       //blob is an immutable file which gives binary/text file which is readable and can be processed
       chunks=[];
       
       addMediaToGallery(blob,'video');
    //    let blobUrl=URL.createObjectURL(blob);//for creating url from blob
    //    var link=document.createElement('a');//creating anchor element
    //    link.href=blobUrl;
    //    link.download='video.mp4';
    //    link.click();//so that link is clicked automatically 
    //    link.remove();//to remove link that is anchor



   }
}).catch(function(err){
    console.log(err);
}) 

captureBtn.addEventListener('click',function(){
    let innerDiv=document.querySelector('#click-div');
    innerDiv.classList.add('capture-animation');
    console.log('clicked');
    capture(filter);

    setTimeout(function(){
        innerDiv.classList.remove('capture-animation');
    },1000);
})
function capture(filter){
    let c=document.createElement('canvas');
    c.width=videoPlayer.videoWidth;//it gives videoplayer width
    c.height=videoPlayer.videoHeight;
    let tool=c.getContext('2d');
    
    
    //for getting color in captured images also
    if(filter!=''){
        tool.fillStyle=filter;
        tool.fillRect(0,0,c.width,c.height);
        //filling rectangle of screen size with desired filter color
    }
    
    //for zoom in and out for captured image
    //origin shifting->bcoz canvas origin initially at top left corner so we have to move it to center so that we can scale up equally from center
    tool.translate(c.width/2,c.height/2);//translate is a method for moving pointer or origin here,moveTo is for line only
    //scaling
    tool.scale(currZoom,currZoom);
    //moving back to origin
    tool.translate(-c.width/2,-c.height/2); 
    tool.drawImage(videoPlayer,0,0);//it draws the image but not appeared on screen bcoz don't added to dom
    
    // let link=document.createElement('a');
    // link.download='img.png';
    // link.href=c.toDataURL();//toDataURl gives url using canvas(convert into base64 form)
    // link.click();
    // link.remove();

    //or using now
    addMediaToGallery(c.toDataURL(),'img'); 
    c.remove();
}