if (document.querySelector(".js-form-login")) {
   
   const linkLogin = "/user/login";

   const validationRulesLogin = {
      email: {
         required: true,
         email: true
   },
   password: {
         required: true,
   }};

   const validationMessagesLogin = {
      required: 'The field is required',
      email: 'Please, type a valid email',
      maxLength: 'The field must contain a maximum of :value characters',
      minLength: 'The field must contain a minimum of :value characters',
      password: 'Password is not valid',
      remote: 'Email already exists'
   }

   const loginUser = (form, values) => {
      fetch(linkLogin, { 
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

   const loginValidation = new window.JustValidate('.js-form-login', {
      rules: validationRulesLogin,
      messages: validationMessagesLogin,
      focusWrongField: true,
      colorWrong: '#ED4C67',
      tooltip: {
         fadeOutTime: 4000 // default value - 5000 
      },
      submitHandler: (form, values) => { loginUser(form, values); },
      invalidFormCallback: function (errors) {
      console.log(errors);
      }
   });

};
