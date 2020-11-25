// Check if the page contains the register form
if (document.querySelector(".js-form-register")) {

   const linkRegister = "/register";

   const validationRulesRegister = {
      // TODO validate name, as a standard username
      name: {
         required: true,
         remote: {
            url: '/check',
            successAnswer: 'OK',
            sendParam: 'name',
            method: 'POST'
         }
      },
      email: {
         required: true,
         email: true,
         remote: {
            url: '/check',
            successAnswer: 'OK',
            sendParam: 'email',
            method: 'POST'
         }
      },
      password: {
         required: true,
         strength: {
            default: true
         }
      },
      password_repeat: {
         required: true,
         function: (name, value) => {
            const password = document.querySelector("input[name='password']").value;
            return (password === value);
         }
      },
      tos_check: {
         required: true
      }
   };

   // FIXME Needs better wording
   const validationMessagesRegister = {
      required: 'The field is required',
      email: {
         remote: "Email already in use",
         email: "Email not valid!"
      },
      password: 'Password is not valid',
      name: {
         remote: "Name contains invalid characters",
      }
   }

   const registerUser = (form, values) => {
      console.log("registerUser");
      fetch(linkRegister, { 
         headers: {"Content-Type": "application/json; charset=utf-8"},
         method: 'POST',
         body: JSON.stringify(values)
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
         // TODO User needs to be notified on the frontend.
         console.log(response);
         sessionStorage.setItem("registerSuccess", true);
         window.location.href = '/';
      })
      .catch(err => {
         // TODO User needs to be notified on the frontend.
         console.log("sorry, there went something wrong");
      });
   }

   // This variable ensures that the form does not submit more than once.
   // There is a bug with the validation package, this is a work around.
   // FIXME Submit form submits more than once.
   let submitted = false;
   document.querySelector("#register-btn").addEventListener('click', event => {
      // This keeps firing multiple times after a 
      // invalidated field was corrected en submitted again
      new window.JustValidate('.js-form-register', {
         rules: validationRulesRegister,
         messages: validationMessagesRegister,
         colorWrong: '#ED4C67',
         tooltip: {
            fadeOutTime: 4000 // default value - 5000 
         },
         submitHandler: (form, values) => {
            if(!submitted) registerUser(form, values);
            submitted = true;
         },
         invalidFormCallback: () => {
            submitted = false;
         }
      });
   })

} //Endif