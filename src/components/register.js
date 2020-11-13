if (document.querySelector(".js-form-register")) {

   const linkRegister = "/user/register";

   const validationRulesRegister = {
      name: {
         required: true,
      },
      email: {
         required: true,
         email: true,
         remote: {
            url: '/user/check',
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

   const validationMessagesRegister = {
      required: 'The field is required',
      email: {
         remote: "Email already in use",
         email: "Email not valid!"
      },
      password: 'Password is not valid',
   }

   const registerUser = (form, values) => {
      console.log("klik");
      fetch(linkRegister, { 
         headers: {"Content-Type": "application/json; charset=utf-8"},
         method: 'POST',
         body: JSON.stringify(values)
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
         console.log("RESPONSE");
         console.log(response);
      })
      .catch(err => {
         console.log("sorry, there are no results for your search");
      });
   }

   // Put inside click event
   document.querySelector("#register-btn").addEventListener('click', event => {
      console.log('Biem!');
      new window.JustValidate('.js-form-register', {
         rules: validationRulesRegister,
         messages: validationMessagesRegister,
         colorWrong: '#ED4C67',
         tooltip: {
            fadeOutTime: 4000 // default value - 5000 
         },
         submitHandler: (form, values) => { 
            registerUser(form, values); 
            console.log('Biem!');
            console.log(values);
         },
         invalidFormCallback: function (errors) {
            console.log(errors);
         }
      });
   })

} //Endif