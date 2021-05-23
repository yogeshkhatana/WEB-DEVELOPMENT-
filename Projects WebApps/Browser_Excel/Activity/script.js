let addbtnContainer=document.querySelector(".add-sheet_container");
let sheetList=document.querySelector(".sheets-list");
let firstSheet=document.querySelector(".sheet");
let AllCells=document.querySelectorAll(".grid .col");
let addressBar=document.querySelector(".address-box");
let leftBtn=document.querySelector(".left");
let rightBtn=document.querySelector(".right");
let centerBtn=document.querySelector(".center");
let fontBtn=document.querySelector(".font-size");
let boldBtn=document.querySelector(".bold");
let underlineBtn=document.querySelector(".underline");
let italicBtn=document.querySelector(".italic");
let fontFamily=document.querySelector(".font-family");
let allAlignBtns=document.querySelectorAll(".alignment-container>*"); 
let sheetDb=workSheetDb[0];
let formulaInput=document.querySelector(".formula-box");

firstSheet.addEventListener("click",handleActiveSheet);

//create sheets and functionality to them
addbtnContainer.addEventListener("click",function(){
   let sheetsArr=document.querySelectorAll(".sheet");
   let lastSheetElem=sheetsArr[sheetsArr.length-1];
   let idx=lastSheetElem.getAttribute("sheetIdx");
   idx=Number(idx);
   let NewSheet=document.createElement("div");
   NewSheet.setAttribute("class","sheet");
   NewSheet.setAttribute("sheetIdx",idx+1);
   NewSheet.innerText=`Sheet ${idx+1}`;
   //page add
   sheetList.appendChild(NewSheet);
   initcurrentSheetDb();//for new sheet database
   sheetDb=workSheetDb[idx];
   //make cell empty of new page 
   initUI();
   //active set
   sheetsArr.forEach(function(sheet){
    //using for each->higher order function to get sheet one by one instead of for loop
    sheet.classList.remove("active-sheet");
}) 
   sheetsArr=document.querySelectorAll(".sheet");
   sheetsArr[sheetsArr.length-1].classList.add("active-sheet");//adding active sheet on last sheet
  

   NewSheet.addEventListener("click",handleActiveSheet);

})
function handleActiveSheet(e){
   let MySheet=e.currentTarget;
   let sheetsArr=document.querySelectorAll(".sheet");
   sheetsArr.forEach(function(sheet){
       //using for each->higher order function to get sheet one by one instead of for loop
       sheet.classList.remove("active-sheet");
   }) 
   if(!MySheet.classList[1]){
       //just a check->to check if sheet not have active sheet class then we add it
       
       MySheet.classList.add("active-sheet");
   }
   let sheetIdx=MySheet.getAttribute("sheetIdx");
   sheetDb=workSheetDb[sheetIdx-1];
   //get data from sheet and set Ui
   setUI(sheetDb);

}

// console.log(AllCells.length);
// it gives length on which column class is there->so column class is on all cells so here->2600

//address  set on click of a cell
for(let i=0;i<AllCells.length;i++)
{
    
    AllCells[i].addEventListener("click",function handleCell(){
        let rid=Number(AllCells[i].getAttribute("rid"));
        let cid=Number(AllCells[i].getAttribute("cid"));
        let rowAdd=rid+1;
        let colAdd=String.fromCharCode(cid+65);
        let address=colAdd+rowAdd;
        addressBar.value=address;
        let cellObject=sheetDb[rid][cid];

        //boldness
        if(cellObject.bold==true)
        {
            boldBtn.classList.add("active-btn");
        }
        else
        {
            boldBtn.classList.remove("active-btn");
        }
        // AllCells[i].style.border="2px solid green"

        //italic
        if(cellObject.italic==true)
        {
            italicBtn.classList.add("active-btn");
        }
        else
        {
            italicBtn.classList.remove("active-btn");
        }

        //underline
        if(cellObject.bold==true)
        {
            underlineBtn.classList.add("active-btn");
        }
        else
        {
            underlineBtn.classList.remove("active-btn");
        }


        //alignment
        for(let i=0;i<allAlignBtns.length;i++)
        {
            allAlignBtns[i].classList.remove("active-btn");
        }
        if(cellObject.halign=="left")
        {
            //left active
            leftBtn.classList.add("active-btn");
        }
        else if(cellObject.halign=="right")
        {
            //right active
            rightBtn.classList.add("active-btn");
        }
        else if(cellObject.halign=="center"){
            //center active
            centerBtn.classList.add("active-btn");

        }


    });
}

AllCells[0].click();//to click on first cell by default so that its address comes in address bar

leftBtn.addEventListener("click", function(){
  let address=addressBar.value;
  let {rid,cid}=getRIdCIdfromAddress(address);
  console.log(rid,cid);
  let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
  cell.style.textAlign="left";
  //In js they follow camel casing instead of - in case of css
  //eg->js= textAlign  and in css=text-align
  for(let i=0;i<allAlignBtns.length;i++)
  {
      allAlignBtns[i].classList.remove("active-btn");
  }
  leftBtn.classList.add("active-btn"); 
  //db update 
  let cellObject=sheetDb[rid][cid];
  cellObject.halign="left";
});

rightBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";
    for(let i=0;i<allAlignBtns.length;i++)
    {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");  
    //db update 
    let cellObject=sheetDb[rid][cid];
    cellObject.halign="right";
});

centerBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);   
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";
    for(let i=0;i<allAlignBtns.length;i++)
    {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");  
    //db update 
    let cellObject=sheetDb[rid][cid];
    cellObject.halign="center";
});

//Helper function
function getRIdCIdfromAddress(address){
    //A1
    let cellColAdr=address.charCodeAt(0);
    let cellRowAdr=address.slice(1);
    let cid=Number(cellColAdr-65);
    let rid=Number(cellRowAdr)-1;//-1 bcoz in rid we did +1 in rowAddress above
    return {cid,rid};
    //returning {cid,rid} instead of {rid,cid} it is an object it will handle it automatically;
}

fontBtn.addEventListener("change",function(){
    let fontSize=fontBtn.value;//it gives value
    let address=addressBar.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);   
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=fontSize+"px"; 
    
})

boldBtn.addEventListener("click",function(){
    let isActive=boldBtn.classList.contains("active-btn");
    let address=addressBar.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);   
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDb[rid][cid];
    if(isActive==false)
    {
        //cell text bold
        cell.style.fontWeight='bolder'; 
        boldBtn.classList.add("active-btn");
        cellObject.bold=true;

    }
    else
    {
        cell.style.fontWeight="normal";
        boldBtn.classList.remove("active-btn");
        cellObject.bold=false;
    }


})

underlineBtn.addEventListener("click",function(){
    let isActive=underlineBtn.classList.contains("active-btn");
    let address=addressBar.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);   
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDb[rid][cid];

    if(isActive==false)
    {
        //cell text underline
        cell.style.textDecoration='underline';  
        underlineBtn.classList.add("active-btn");
        cellObject.underline=true;
    }
    else
    {
        cell.style.textDecoration="none";
        underlineBtn.classList.remove("active-btn");
        cellObject.underline=false;
    }

});

italicBtn.addEventListener("click",function(){
    let isActive=italicBtn.classList.contains("active-btn");
    let address=addressBar.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);   
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDb[rid][cid];
    
    if(isActive==false)
    {
        //cell text italic
        cell.style.fontStyle='italic';
        italicBtn.classList.add("active-btn");
        cellObject.italic=true;
    }
    else
    {
        cell.style.fontStyle="normal";
        italicBtn.classList.remove("active-btn");
        cellObject.italic=false;
    } 

})

fontFamily.addEventListener("change",function(){
    let address=addressBar.value;
    // alert(fontFamily.value);
    let currentFont=fontFamily.value;
    let {rid,cid}=getRIdCIdfromAddress(address);
    console.log(rid,cid);   
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily=currentFont; 
})

for(let i=0;i<AllCells.length;i++)
{
    
    AllCells[i].addEventListener("blur",function handleCell(){
       
        
        let address = addressBar.value;
        let {rid,cid}=getRIdCIdfromAddress(address);
        let cellObject=sheetDb[rid][cid];
        let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value=cell.innerText;

});
}

function setUI(sheetDb)
{
 for(let i=0;i<sheetDb.length;i++)
 {
     for(let j=0;j<sheetDb[i].length;j++)
     {
         let cell=document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
         let {bold,italic,underline,fontFamily,halign,value}=sheetDb[i][j];
         cell.style.fontWeight=bold==true ? "bold" : "normal";
         cell.innerText=value;
     }
 }
}
// alert(a);


//***********************Formula Code**************** */
formulaInput.addEventListener("keydown",function(e){
    if(e.key=="Enter" && formulaInput.value!=""){
        let formula=formulaInput.value;
        //getCurrentCell
        let evaluatedValue=evaluateFormula(formula);
        //alert(value);
        let address=addressBar.value;
        let {rid,cid}=getRIdCIdfromAddress(address);
        //Ui change
        setUIByFormula(evaluatedValue,rid,cid);
        // db->work
        // setcontentInDB(value,formula);

    }
})
function evaluateFormula(formula)
{
 //"( A1 + A2 )"
 let formulaTokens=formula.split(" ");
 //split-> [(,A1,+,A2,)]
 for(let i=0;i<formulaTokens.length;i++)
 {
     let firstCharOfToken=formulaTokens[i].charCodeAt(0);
     if(firstCharOfToken>=65 && firstCharOfToken<=90)
     {
         //console.log(formulaTokens[i]);
         //A1
         let {rid,cid}=getRIdCIdfromAddress(formulaTokens[i]);
         let cellObject=sheetDb[rid][cid];
         //getting value from db
         let {value}=cellObject;
         //or 
        //  let value=cellObject.value;
        formula=formula.replace(formulaTokens[i],value);
     }

 }
 //evaluation
 let ans=eval(formula);
 return ans;
//  space given in btw to identify value easily
 //DB->A1,A2
 //[(,10,+,20,)]
 //eval or use infix for evaluation prefix is more suitable than eval
 //eval->just evaluates
 //( 10 + 20 )

}

function initUI(){
 //make cell empty
 for(let i=0;i<AllCells.length;i++)
 {
 AllCells[i].innerHTML="";
 //setting by default settings like bold,italic
 AllCells[i].style.fontWeight="normal";
 AllCells[i].style.fontStyle="normal";
 AllCells[i].style.textDecoration="none";
 AllCells[i].style.fontFamily="Arial";
 AllCells[i].style.fontSize="10px";
 AllCells[i].style.textAlign="left";
 AllCells[i].style.innerText="";
 
 }
}

