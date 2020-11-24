if (document.querySelector("#uploadForm")) {

    document.querySelector("#uploadForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // const filesInput = jQuery('#fileInput').get(0).files;
        const filesInput = document.querySelector('input[type="file"]').files;
        const formData = new FormData();
        for (let i = 0; i < filesInput.length; i++) {
            let file = filesInput[i];
            formData.append('files[]', file);
        }
        upload(formData);
    })
    

    const upload = (files) => {
        console.log("Files");
        console.log(files.get('files[0]'));
        fetch('user/upload', { 
           method: 'POST',
           body: files
        })
        .then(response => {
           // TODO User needs to be notified on the frontend.
           console.log(response);
        })
        .catch(err => {
           // TODO User needs to be notified on the frontend.
           console.log("sorry, there went something wrong");
        });
     }
}
