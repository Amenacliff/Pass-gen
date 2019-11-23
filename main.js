//DOM ELEMENTS

const resultElement= document.getElementById("result");
const lengthElement= document.getElementById("length");
const upperElement= document.getElementById("uppercase");
const lowerElement= document.getElementById("lowercase");
const numberElement= document.getElementById("numbers");
const symbolsElement= document.getElementById("symbols");
const buttonElement= document.getElementById("button");
const clipElement= document.getElementById("clip");


const randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
};

//Generate Event Listener
buttonElement.addEventListener('click', ()=>{
    const length=+lengthElement.value;
    const hasLower= lowerElement.checked;
    const hasUpper= upperElement.checked;
    const hasNumber= numberElement.checked
    const hasSymbol= symbolsElement.checked;

    resultElement.innerHTML=generatePassword(hasLower, hasUpper, hasNumber, hasSymbol,length)
})

//Copy Password to ClipBoard

clipElement.addEventListener('click',()=>{
    const textarea= document.createElement('textarea')
    const password= resultElement.innerText

    if(!password){
        return;
    }
    textarea.value=password

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password Copied to ClipBoard")

})

//Generate Password Function

function generatePassword(lower,upper,number,symbol,length){

    let generatedPassword= '';

    const typesCount= lower + upper + number + symbol;

    //console.log(typesCount)

    const typesArr = [{ lower },{ upper },{ number },{ symbol }].filter(
        item => Object.values(item)[0]);

//console.log(typesArr)

    if(typesCount===0){
        return '';
    }

    for( let i=0; i < length; i+= typesCount){
        typesArr.forEach( type =>{
            const funcName= Object.keys(type);
            console.log(funcName);
            generatedPassword+= randomFunc[funcName]();
        })
    }
    const finalPassword=(generatedPassword.slice(0,length))

    return finalPassword;
}




function getRandomLower(){
    return String.fromCharCode((Math.floor(Math.random()*26)+97))
}
function getRandomUpper(){
    return String.fromCharCode((Math.floor(Math.random()*26)+65))
}
function getRandomNumber(){
    return String.fromCharCode((Math.floor(Math.random()*10)+48))
}
function getRandomSymbol(){
    const symbols="!@#$%^&*(){}[]=<>/,.'";
    return symbols[Math.floor(Math.random()*symbols.length)];
}


    
