// TODO Build login 
// Check if the page contains the login form
if (document.querySelector(".js-form-login")) {
   
   const linkLogin = "/user/login";

   const validationRulesLogin = {
      email: {
         required: true,
         remote: {
            url: '/user/check',
            successAnswer: 'NOT OK',
            sendParam: 'email',
            method: 'POST'
         }
      },
      password: {
         required: true,
      }
   };

   const validationMessagesLogin = {
      email: {
         email: 'Email is required',
         remote: 'Email or password invalid',
      },
      password: 'Password is required'
   }

   // This variable ensures that the form does not submit more than once.
   // There is a bug with the validation package, this is a work around.
   // I'll fix this later.
   // FIXME Submit form submits more than once.
   let submitted = false;
   
   const loginUser = (form, values) => {
      console.log("loginUser");
      fetch(linkLogin, { 
         headers: {"Content-Type": "application/json; charset=utf-8"},
         method: 'POST',
         body: JSON.stringify(values)
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
         // TODO Notify user of login success/failure
         if (response == false) {
            submitted = false;
         } else {
            // Refresh page
            console.log("Logged IN");
         }
      })
      .catch(err => {
         alert("sorry, there are no results for your search");
      });
   }
   
   document.querySelector("#login-btn").addEventListener('click', event => {
      console.log("klik");
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
            submitted = false;
         }
      });
   });
};
