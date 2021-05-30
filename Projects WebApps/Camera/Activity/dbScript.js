let request=indexedDB.open('Camera',1);
let db;

request.onsuccess=function(e){
    db=request.result;
}
request.onerror=function(e){
    console.log(error);
}
request.onupgradeneeded=function(e){
    db=request.result;
    db.createObjectStore('gallery',{keyPath:'mId'});
}
function addMediaToGallery(data,type){
    let tx=db.transaction('gallery','readwrite');//it means we are accessing objectStore gallery in readwrite mode and to start a transition
    let gallery=tx.objectStore('gallery');//it gives objectStore to work on it
    gallery.add({mId:Date.now(),type,media:data});
}
function viewMedia(){
    let body=document.querySelector('body');
    let tx=db.transaction('gallery','readonly');
    let gallery=tx.objectStore('gallery');
    let req=gallery.openCursor();
    req.onsuccess=function(){
        let cursor=req.result;
        if(cursor)
        {
            if(cursor.value.type=='video')
            {
                let videoContainer=document.createElement('div');
                videoContainer.setAttribute('data-mId',cursor.value.mId);
                videoContainer.classList.add('gallery-vid-container');
                let video=document.createElement('video');
                videoContainer.appendChild(video);
                let deleteBtn=document.createElement('button');
                deleteBtn.classList.add('gallery-delete-button');
                deleteBtn.innerText='Delete';
                deleteBtn.addEventListener('click',deleteBtnHandler);
                let downloadBtn=document.createElement('button');
                downloadBtn.classList.add('gallery-download-button');
                downloadBtn.innerText='Download';
                videoContainer.appendChild(deleteBtn);
                videoContainer.appendChild(downloadBtn);
                video.controls=true;
                video.autoplay=true;
                video.src=URL.createObjectURL(cursor.value.media);//for converting blob that is stored in database as a blob only to url
                body.appendChild(videoContainer);
            }
            else{
                let imgContainer=document.createElement('div');
                imgContainer.setAttribute('data-mId',cursor.value.mId);
                imgContainer.classList.add('gallery-img-container');
                let img=document.createElement('img');
                img.src=cursor.value.media;//bcoz here in database we stored image in form of URL(base64) only so no need to convert it into URL again
                imgContainer.appendChild(img);
                let deleteBtn=document.createElement('button');
                deleteBtn.classList.add('gallery-delete-button');
                deleteBtn.innerText='Delete';
                deleteBtn.addEventListener('click',deleteBtnHandler);
                let downloadBtn=document.createElement('button');
                downloadBtn.classList.add('gallery-download-button');
                downloadBtn.innerText='Download';
                imgContainer.appendChild(deleteBtn);
                imgContainer.appendChild(downloadBtn);
                body.appendChild(imgContainer);
            }
            cursor.continue();
        }
    }
}

//deleting from database
function deleteMediaFromGallery(mId){
  let tx=db.transaction('gallery','readwrite');
  let gallery=tx.objectStore('gallery');
  gallery.delete(Number(mId));//converting into number bcoz mId is a number in database
}

//deleting media from ui
function deleteBtnHandler(e){
    let mId=e.currentTarget.parentNode.getAttribute('data-mId');//mId is parent of delete button thats why
    deleteMediaFromGallery(mId);
    e.currentTarget.parentNode.remove();//it deletes the mId div completely from dom
}