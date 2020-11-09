(function($) {
   $("#login-form").submit(function(e) {
      e.preventDefault();
      
      const link = "/user/login";
      const email = $("input[name=email]").val();
      const password = $("input[name=password]").val();

   fetch(link, { 
         headers: {"Content-Type": "application/json; charset=utf-8"},
         method: 'POST',
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
         console.log(response);
      })
      .catch(err => {
         console.log("u");
         alert("sorry, there are no results for your search");
      });
   });
})(jQuery);