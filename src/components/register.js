if (document.querySelector(".js-form-register")) {

   const linkRegister = "/user/register";

   const validationRulesRegister = {
   email: {
      required: true,
      email: true
   },
   password: {
      required: true,
   }
   };

   const validationMessagesRegister = {
      required: 'The field is required',
      email: 'Please, type a valid email',
      maxLength: 'The field must contain a maximum of :value characters',
      minLength: 'The field must contain a minimum of :value characters',
      password: 'Password is not valid',
      remote: 'Email already exists'
   }

   const registerUser = (form, values) => {
   fetch(linkRegister, { 
      headers: {"Content-Type": "application/json; charset=utf-8"},
      method: 'POST',
   })
   .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
   .then(response => {
      console.log(response);
   })
   .catch(err => {
      alert("sorry, there are no results for your search");
   });
   }

   const registerValidation = new window.JustValidate('.js-form-register', {
      rules: validationRulesRegister,
      messages: validationMessagesRegister,
      focusWrongField: true,
      colorWrong: '#ED4C67',
      tooltip: {
         fadeOutTime: 4000 // default value - 5000 
      },
      submitHandler: (form, values) => { registerUser(form, values); },
      invalidFormCallback: function (errors) {
         console.log(errors);
      }
   });

} //Endif