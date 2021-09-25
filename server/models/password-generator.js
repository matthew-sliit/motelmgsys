
exports.generatePassword = function generatePassword(){
    let tries = [];
    try{
        tries.push(selfGeneratePassword("generate"));
        tries.push(selfGeneratePassword("generate"));
        tries.push(selfGeneratePassword("generate"));
    }catch (callStackError){

    }
    let passwordGenerated = "passwordGenerateError+_123";
    tries.map(password=>{
        if(typeof password!==undefined){
            passwordGenerated = password;
        }
    })
    return passwordGenerated;
}
function selfGeneratePassword(password){
    const symbols = "@#$&+_=%";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrst";
    const numbers = "123456789";//number 0 and letter O can be confusing
    const choices = [symbols,alphabet,numbers];
    if(password==="generate"){
        password = "";
        return selfGeneratePassword(password);
    }else if(password.length<=9){
        const randomNumber = Math.floor(Math.random() * 3);
        //console.log("randomNumber: "+randomNumber);
        const selected = choices[randomNumber];
        //console.log("selected: "+JSON.stringify(selected));
        const selectedEntity = Math.floor(Math.random() * selected.length);
        //console.log("selectedEntity: "+selected.charAt(selectedEntity));
        password+=""+selected.charAt(selectedEntity);
        return selfGeneratePassword(password);
    }else{
        //at least 3 upper case letters
        if(!/[A-Z][A-Z][A-Z]/.test(password)){
            return selfGeneratePassword("generate");
        }else if(!/[a-z][a-z]/.test(password)){
            //at least 2 lower case letters
            return selfGeneratePassword("generate");
        }else if(!/\d/.test(password)){
            //at least 1 number
            return selfGeneratePassword("generate");
        }else if(!/[!@#$&+_=%]/.test(password)){
            //at least 1 symbol
            return selfGeneratePassword("generate");
        }
        return password;
    }
}