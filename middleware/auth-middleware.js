module.exports = {
    checkGuest,
    checkLogin,
    // checkAdmin,
};

function checkLogin(req, res, next) {
    if (req.session.auth != undefined)
    {
        if (req.session.auth || req.path==='/') {
            next();
        } else {
           res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}

function checkGuest(req, res, next) {
    if (!req.session.auth) {
        next();
    } else {
        res.redirect("/user");
    }
}

// function checkAdmin(req, res, next) {
//     if (req.session != undefined)
//     {
//         if (req.session.auth || req.path==='/') {
//      next();
//         } else {
//            res.redirect("/");
//         }
//     }
// }