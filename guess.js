//setting
let gameName="Guess The Word";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game  is created by sedra bazt`;

//setting game options
let numofTries=6;
let numofLetter=6;
let currentTyry=1;
let numofHint=2;

let wordToGuess="";
const words=["update","create","consol","javaxx","sameas","helloo"]
wordToGuess=words[Math.floor(Math.random() * words.length)].toLowerCase();

let AreaMessage=document.querySelector(".message");



document.querySelector(".hint-num span").innerHTML=numofHint;
const gethintbutton=document.querySelector(".hint-num ");




function generateInput() {
    const inputsContainer = document.querySelector(".inputs");
  
    // Create Main Try Div
    for (let i = 1; i <= numofTries; i++) {
      const tryDiv = document.createElement("div");
      tryDiv.classList.add(`try-${i}`);
      tryDiv.innerHTML = `<span>Try ${i}</span>`;
      if(i!==1) tryDiv.classList.add("disabled-inputs");
      inputsContainer.appendChild(tryDiv);

      //create inputs

      for(let j=1;j<=numofLetter;j++){
        const input=document.createElement("input");
        input.type="text";
        input.id=`guess-${i}-letter-${j}`;
        input.setAttribute("maxlength","1");
        tryDiv.appendChild(input)
      }
    }
inputsContainer.children[0].children[1].focus();
   
//disabled all input except first one

const inputDisabled=document.querySelectorAll(".disabled-inputs input");
inputDisabled.forEach((input)=>(input.disabled=true));

const inputs=document.querySelectorAll("input");
inputs.forEach((input,index)=>{
  input.addEventListener("input",function(){
    this.value=this.value.toUpperCase();
    const nextInput=inputs[index+1];
    if(nextInput) nextInput.focus();
  });
  input.addEventListener("keydown",function(event){

    const currentindex=Array.from(inputs).indexOf(event.target);

    if(event.key==="ArrowRight"){
       const nextInput=currentindex + 1;
       if(nextInput<inputs.length) inputs[nextInput].focus();
    }
    if(event.key==="ArrowLeft"){
      const prevInput=currentindex - 1;
      if(prevInput >= 0) inputs[prevInput].focus();
   }
  });
});
}

const guessButton=document.querySelector(".check");
guessButton.addEventListener("click",handleGuess);
console.log(wordToGuess)
function handleGuess(){
  let success=true;
  console.log(wordToGuess)
for(let i=1;i<=numofLetter;i++){
  const inputField=document.querySelector(`#guess-${currentTyry}-letter-${i}`)
  const letter=inputField.value.toLowerCase();
  const actualletter=wordToGuess[i - 1]


  if(letter===actualletter){
    inputField.classList.add("in-place")
  }
  else if (wordToGuess.includes(letter) && letter !== ""){
    inputField.classList.add("notin-place");
    success=false;
  }
  else{
    inputField.classList.add("wrong");
    success=false;
  }

}
if(success){
  AreaMessage.innerHTML=`you win the <span>${wordToGuess}</span>`;
  let allTries=document.querySelectorAll(".inputs > div");
  allTries.forEach((tryDiv)=>tryDiv.classList.add("disabled-inputs"));
  gethintbutton.disabled=true;
}else{
  // AreaMessage.innerHTML=`you lose the <span>Game</span>`
  document.querySelector(`.try-${currentTyry}`).classList.add("disabled-inputs");
  const currentTryInputs = document.querySelectorAll(`.try-${currentTyry} input`);
  currentTryInputs.forEach((input) => (input.disabled = true));


  currentTyry++;


const nextTryInputs = document.querySelectorAll(`.try-${currentTyry} input`);
nextTryInputs.forEach((input) => (input.disabled = false));

let el=document.querySelector(`.try-${currentTyry}`);
if(el){
  document.querySelector(`.try-${currentTyry}`).classList.remove("disabled-inputs");
  el.children[1].focus();
}else{
  guessButton.disabled=true;
  gethintbutton.disabled=true;
  AreaMessage.innerHTML=`you lose the  <span>Game</span> `
}

}

}

gethintbutton.addEventListener("click",getHint)
function getHint(){
  if(numofHint>0){ 
      numofHint--;
    document.querySelector(".hint-num span").innerHTML=numofHint;}
 
  else if(numofHint===0){
    gethintbutton.disabled=true;

  }

  const enableinput=document.querySelectorAll("input:not([disabled])");
  // console.log(enableinput);
  const emptyinput=Array.from(enableinput).filter((input)=>input.value==="");
  console.log(emptyinput)

  if(emptyinput.length>0){
    const randomindex=Math.floor(Math.random() * emptyinput.length);
    const randominput=emptyinput[randomindex];
    const indextofill=Array.from(enableinput).indexOf(randominput)
    // console.log(randomindex)
    // console.log(randominput)
    if(indextofill!==-1){
      randominput.value=wordToGuess[indextofill].toUpperCase();
    }
  }
}

window.onload = function () {
    generateInput();
  };

  /*
  scrollHeight:entire content &padding(visible or not)
  clientHeight:visible content &padding


  */
  
  // 
  let el=document.querySelector(".scroller");

  let height=document.documentElement.scrollHeight  - document.documentElement.clientHeight ;
  console.log(height)
  console.log(document.documentElement.scrollHeight)
  console.log( document.documentElement.clientHeight)

  window.addEventListener("scroll",function(){
    let scrolltop=document.documentElement.scrollTop;
    el.style.width=`${(scrolltop/height)*100}%`
  })
