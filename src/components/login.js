// TODO Build login 
// Check if the page contains the login form
if (document.querySelector(".js-form-login")) {
   
   const linkLogin = "/user/login";

   const validationRulesLogin = {
      email: {
         required: true,
         email: true
      },
      password: {
         required: true,
         remote: {
            url: '/user/login',
            successAnswer: 'OK',
            sendParam: 'passwd',
            method: 'POST'
         }
      }
   };

   const validationMessagesLogin = {
      email: 'Email is required',
      password: 'Password is required'
   }

   const loginUser = (form, values) => {
      fetch(linkLogin, { 
         headers: {"Content-Type": "application/json; charset=utf-8"},
         method: 'POST',
         body: JSON.stringify(values)
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
         console.log(response);
      })
      .catch(err => {
         alert("sorry, there are no results for your search");
      });
   }
   // This variable ensures that the form does not submit more than once.
   // There is a bug with the validation package, this is a work around.
   // I'll fix this later.
   // FIXME Submit form submits more than once.
   let submitted = false;
   document.querySelector("#login-btn").addEventListener('click', event => {
      new window.JustValidate('.js-form-login', {
         rules: validationRulesLogin,
         messages: validationMessagesLogin,
         focusWrongField: true,
         colorWrong: '#ED4C67',
         tooltip: {
            fadeOutTime: 4000 // default value - 5000 
         },
         submitHandler: (form, values) => { 
            if(!submitted) loginUser(form, values); 
            submitted = true;
         },
         invalidFormCallback: function (errors) {
            console.log(errors);
         }
      });
   });
};
