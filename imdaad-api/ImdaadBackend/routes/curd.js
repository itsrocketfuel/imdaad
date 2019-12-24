var express = require('express');
var router = express.Router();
var cause = require('../models/cause2');
var user = require('../models/user2');

var setpermission = function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', '*')

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.setHeader('Access-Control-Allow-Headers', '*')

    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

module.exports = router.post('/createCause', setpermission, function (req, res) {


    let body = req.body;
    title = body.title;
    name = body.name;
    age = body.age;
    phoneNumber = body.phoneNumber;
    description = body.description;
    requirements = body.requirements;
    documents = body.documents;

    if (documents == undefined || document == "") {
        documents = "No Documents";
    }

    var c = new cause();
    c.title = title;
    c.name = name;
    c.age = age;
    c.phoneNumber = phoneNumber;
    c.description = description;
    c.requirements = requirements;
    c.documents = documents;
    console.log(title);
    console.log(name);
    console.log(age);
    console.log(phoneNumber);
    console.log(description);
    console.log(requirements);
    console.log(documents);

    c.save(function (err, created) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(created);
        }
    })
    return router;
});

module.exports = router.post('/register', setpermission, function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*')

    let body = req.body;
    firstname = body.firstname;
    lastname = body.lastname;
    email = body.email;
    password = body.password;
    securityQuestion = body.securityQuestion;
    answer = body.answer;
    accountType = body.accountType;

    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log(securityQuestion);
    console.log(answer);
    console.log(accountType);

    var u = new user()
    u.firstname = firstname;
    u.lastname = lastname;
    u.email = email;
    u.password = password;
    u.securityQuestion = securityQuestion;
    u.answer = answer;
    u.accountType = accountType;

    user.findOne({
        email: email
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else if (doc) {
            console.log(doc);
            console.log("Already registered.");
        } else {
            u.save(function (err, created) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.send(created);
                    console.log("Registered.");
                }
            });
        }
    });
    return router;
});

module.exports = router.post('/login', setpermission, function (req, res) {

    let body = req.body;
    email = body.email;
    password = body.password;

    console.log(email);
    console.log(password);

    user.findOne({
        email: email,
        password: password
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
    return router;
});

router.get('/login_result', setpermission, function (req, res) {

    user.find({}).populate('user').exec(function (err, view) {
        if (err) {
            res.status(500).send('Error in database.')
        } else {
            res.send(view);
        }
    })
    return router;
});

router.get('/get_causes', setpermission, function (req, res) {

    cause.find({}).populate('causes').exec(function (err, view) {
        if (err) {
            res.status(500).send('Error in database.')
        } else {
            res.send(view);
        }
    })
    return router;
});

router.get('/reports', setpermission, function (req, res) {

    cause.find({}).populate('cause').exec(function (err, view) {
        if (err) {
            res.status(500).send('Error in database.')
        } else {
            res.send(view);
        }
    })
    return router;
});

router.post('/reportsearch', setpermission, function (req, res) {

    let body = req.body;
    Published = "\"" + body.dateandtime + "\"";
    console.log(Published);

    cause.find({
        $text: {
            $search: Published
        }
    }).populate('cause').exec(function (err, view) {
        if (err) {
            res.status(500).send('Error in database.')
        } else {
            res.send(view);
        }
    })
    return router;
});

router.put('/update', setpermission, function (req, res) {

    var body = req.body;
    Name = body.Name;
    ID = body.p_id;
    Type = body.Type;
    Gender = body.Gender;
    Evolves_to = body.Evolves_to;
    Average_Height = body.Average_Height;
    Average_Weight = body.Average_Weight;
    Region = body.Region;
    Img = body.ImgURL;

    cause.findOneAndUpdate({
        p_id: ID
    }, {
        Name: Name,
        p_id: ID,
        Type: Type,
        Gender: Gender,
        Evolves_to: Evolves_to,
        Average_Height: Average_Height,
        Average_Weight: Average_Weight,
        Region: Region,
        ImgURL: Img
    }, function (err, view) {
        if (err) {
            res.status(500).send('Error in database.')
        } else {
            res.send(view);
        }
    })
    return router;
});


router.delete('/delete/:p_id', setpermission, function (req, res) {

    var params = req.params;
    ID = params.p_id;

    cause.findOne({
        p_id: ID
    }, function (err, doc) {
        if (err) {
            res.status(500).send('Error occurred while finding.');
        } else {
            if (doc) {
                console.log('Cause found. Deleting.');
                cause.deleteOne({
                    p_id: ID
                }, function (err, deleted) {
                    if (err) {
                        res.status(500).send('Error in database.')
                    } else {
                        res.send();
                    }
                })
            }
        }
    })
    return router;
});

module.exports = router;