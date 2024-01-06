function Validator(option){
    //Hàm thực hiện validate
    function validate (inputElement, rule){
        let errorElement = inputElement.parentElement.querySelector(".form-message");
        let errorMessage = rule.test(inputElement.value);
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorElement;
    }
    //Lấy element của form cần validate
    let formElement = document.querySelector(option.form);
    if(formElement){

        formElement.onsubmit = function(){
            let isFormValid = true;
            option.rules.forEach(function(rule){
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule)
                if(inputElement.value==""){
                    isFormValid = false;
                }
            })
            return isFormValid
        }

        option.rules.forEach(function(rule){
            let inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                // handle blur khỏi input 
                inputElement.onblur = function(){
                    validate(inputElement, rule)
                }
                //handle nhâp input het error
                inputElement.oninput = function(){
                    let errorElement = inputElement.parentElement.querySelector(".form-message");
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}
Validator.isRequired = function (selector){
    return{
        selector: selector,
        test: function (value){
            return value.trim() ? undefined : 'Please enter this field.'
        }
    }
}

Validator.isEmail = function(selector){
    return{
        selector: selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  'This field must be email.';
        }
    }
    
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Please enter a minimum of ${min} characters.`;
        }
    };
}