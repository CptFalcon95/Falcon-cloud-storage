if (document.querySelector("#uploadForm")) {

   document.querySelector("#uploadForm").addEventListener("submit", event => {
      event.preventDefault();
      const filesInput = document.querySelector('input[type="file"]').files;
      const formData = new FormData();
      for (let i = 0; i < filesInput.length; i++) {
         let file = filesInput[i];
         formData.append('files[]', file);
      }
      upload(formData);
   });

   function upload(files) {
      fetch('user/upload', { 
         method: 'POST',
         body: files
      })
      .then(response => {
         console.log(response);
      })
      .catch(err => {
         console.log("sorry, there went something wrong");
      });
   }
}
