const fs = require('./file-system-controller');

module.exports = {
    getImages
}

async function getImages(req, res) {
    const user = req.session.auth;
    // Each array represents a column in the gallery on the frontend
    let galleryColumns = [ [],[],[],[] ];
    let distributerCounter = 0; 
    await fs.getUserFiles({
        owner: user._id, 
        type: "image"
    })
    .then(files => {
        for (let x = 0; x <= files.length; x++) {
            // FIXME Could be shorter, like this:
            // if (x <= 3) {
            //     galleryColumns[distributerCounter].push(files[x]); 
            //     distributerCounter++;
            // } else {
            //     galleryColumns[distributerCounter].push(files[x]); 
            //     distributerCounter = 0;
            // }
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
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}