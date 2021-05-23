let a=10;
let topRow=document.querySelector(".top-row");
let str="";
for(let i=0;i<26;i++)
{
    str+=`<div class='col'>${String.fromCharCode(65+i)}</div>`;
}
topRow.innerHTML=str;

let leftCol=document.querySelector(".left-col");
str="";
for(let i=0;i<100;i++)
{
    str+=`<div class='left-col_box'>${i+1}</div>`;
}
leftCol.innerHTML=str;

// 2d array
let grid=document.querySelector(".grid");
str="";
for(let i=0;i<100;i++)
{
    str+=`<div class="row">`
        for(let j=0;j<26;j++)
        {
            str+=`<div class="col" rid=${i} cid=${j} contenteditable="true"> </div>`
            //${String.fromCharCode(65+j)}${i+1} -> using it above before </div> to print adress on cells 
            // contenteditable="true" -> to make content editable in that block or class       
        }
        // String.fromCharCode converts ascii to character
        str+=`</div>`;
}
grid.innerHTML=str; 
//initial load

 workSheetDb=[];//don't use let here so it can be accessible on console->window.workSheetDb
function initcurrentSheetDb(){
let sheetDb=[];
for(let i=0;i<100;i++)
{
    let row=[];
    for(let j=0;j<26;j++)
    {
     let cell={
         bold:false,
         italic:false,
         underline:false,
         fontFamily:"Arial",
         fontSize:"10",
         halign:"left",
         value:"",
         formula:""
     }
     row.push(cell);
    }
    sheetDb.push(row);
}
console.log(sheetDb);
workSheetDb.push(sheetDb);
}
console.log(workSheetDb);
initcurrentSheetDb(); 

//2 D->Array Styling property
//cell stat