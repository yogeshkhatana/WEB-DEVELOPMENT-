let videoPlayer=document.querySelector('video');
let videoRecordBtn=document.querySelector('#record-video');
let constraints={video:true,audio:true};//for taking permissions from user
let mediaRecorder;
let recordState=false;
let chunks=[];
videoRecordBtn.addEventListener("click",function(){
    if(mediaRecorder!=undefined)
    {
        if(recordState==false)
        {
            recordState=true;
            mediaRecorder.start();
            videoRecordBtn.innerText=" Recording.....";
        }
        else{
            recordState=false;
            mediaRecorder.stop();
           videoRecordBtn.innerText="Record";
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
       let blobUrl=URL.createObjectURL(blob);//for creating url from blob
       var link=document.createElement('a');//creating anchor element
       link.href=blobUrl;
       link.download='video.mp4';
       link.click();//so that link is clicked automatically 
       link.remove();//to remove link that is anchor



   }
}).catch(function(err){
    console.log(err);
})        