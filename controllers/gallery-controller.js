const fs = require('./file-system-controller');

module.exports = {
    getImages
}

function getImages(req, res) {
    return new Promise((resolve, reject) => {
        const user = req.session.auth;
        fs.getUserFiles({
            owner: user._id, 
            type: "image"
        })
        .then(files => {
            resolve(fillColumns(files));
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

function fillColumns(files) {
    // Each array represents a column in the gallery on the frontend
    let galleryColumns = [ [], [], [], [] ];
    let distributerCounter = 0; 
    for (let x = 0; x < files.length; x++) {
        switch(distributerCounter){
            case 0:
                galleryColumns[0].push(files[x]); 
                distributerCounter++;
                break;
            case 1:
                galleryColumns[1].push(files[x]);
                distributerCounter++;
                break;
            case 2:
                galleryColumns[2].push(files[x]);
                distributerCounter++; 
                break;
            case 3:
                galleryColumns[3].push(files[x]); 
                distributerCounter = 0;
                break;
            default:
                return;
        }
    }
    return galleryColumns;
}