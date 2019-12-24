var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://itsrocketfuel:yolook69@ds059947.mlab.com:59947/imdaad', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

console.log("Node server running at port: 6969");
console.log("Mongodb server running at mongodb://itsrocketfuel:yolook69@ds059947.mlab.com:59947/imdaad");

//our database models
var User = require('./models/user');
var Food = require('./models/food');
var Medicine = require('./models/medicine');
var Clothes = require('./models/clothes');
var Cause = require('./models/cause');
var CommentStar = require('./models/commentstar');
var Comments = require('./models/comments');
var Message = require('./models/message.js');
var DropOff = require('./models/dropoff.js');

var ReportP = require('./models/reportprofile.js');
var ReportC = require('./models/reportcause.js');
var Payment = require('./models/pay.js');

app.use('/curd', router);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router.get('/', function (req, res) {
	res.send({
		message: "Get Method"
	});
});

//All of our routes start from here

router.post('/signUp', function (req, res) {
	User.find({
		email: req.body.email
	}, function (err, obj) {
		if (obj.length > 0) {
			res.send({
				'success': 'ABCD',
				'message': 'Email Already Exists'
			});
		} else {
			var a = req.body.email;

			if (req.body.fname == '') {
				res.send({
					'success': 'firstn',
					'message': 'Please Enter First Name'
				});
			} else if (req.body.lname == '') {
				res.send({
					'success': 'lastn',
					'message': 'Please Enter Last Name'
				});
			} else if (req.body.email == '') {
				res.send({
					'success': 'emai',
					'message': 'Please Enter Email'
				});
			} else if (!(a.includes('@'))) {
				res.send({
					'success': 'email',
					'message': 'Please Enter Valid Email'
				});
			} else if (req.body.password == '') {
				res.send({
					'success': 'pass',
					'message': 'Please Enter Password'
				});
			} else if (req.body.securityQ == '') {
				res.send({
					'success': 'secQ',
					'message': 'Please Select Security Question'
				});
			} else if (req.body.securityA == '') {
				res.send({
					'success': 'secA',
					'message': 'Please Answer Security Question'
				});
			} else if (req.body.type == '') {
				res.send({
					'success': 'typ',
					'message': 'Please Select A Type'
				});
			} else {
				var abc = new User();
				abc.firstName = req.body.fname;
				abc.lastName = req.body.lname;
				abc.email = req.body.email;
				abc.password = req.body.password;
				abc.securityQuestion = req.body.securityQ;
				abc.securityAnswer = req.body.securityA;
				abc.type = req.body.type;
				console.log('name');
				abc.save(function (err) {
					if (err) {
						res.send(err);
					} else {
						res.json('Successfully Registered');
					}
				});
			}
		}
	})
});

router.post('/login', function (req, res) {
	var a = req.body.email;

	User.find({
		email: req.body.email,
		password: req.body.password
	}, function (err, obj) {
		if (err) {
			res.send(err);
		}
		if (obj.length > 0) {
			res.send({
				'success': true,
				'message': obj[0].firstName,
				'type': obj[0].type
			});
		} else if (req.body.email == '') {
			res.send({
				'success': 'email',
				'message': 'Please Enter Email'
			});
		} else if (!(a.includes('@'))) {
			res.send({
				'success': 'emails',
				'message': 'Please Enter Valid Email'
			});
		} else if (req.body.password == '') {
			res.send({
				'success': 'password',
				'message': 'Please Enter Password'
			});
		} else {
			res.send({
				'success': false,
				'message': 'User Not Found'
			});
		}
	});
});

router.post('/forgotpass', function (req, res) {
	var a = req.body.email;

	User.find({
		email: req.body.email,
		securityQuestion: req.body.securityQ,
		securityAnswer: req.body.securityA
	}, function (err, obj) {
		if (err) {
			res.send(err);
		}
		if (obj.length > 0) {
			res.send({
				'success': true,
				'message': obj[0]._id
			});
		} else if (req.body.email == '') {
			res.send({
				'success': 'emai',
				'message': 'Please Enter Email'
			});
		} else if (!(a.includes('@'))) {
			res.send({
				'success': 'email',
				'message': 'Please Enter Valid Email'
			});
		} else if (req.body.securityQ == '') {
			res.send({
				'success': 'secQ',
				'message': 'Please Select Security Question'
			});
		} else if (req.body.securityA == '') {
			res.send({
				'success': 'secA',
				'message': 'Please Answer Security Question'
			});
		} else {
			res.send({
				'success': false,
				'message': 'Invalid User'
			});
		}
	});
});

router.post('/resetpass', function (req, res) {
	User.find({
		_id: req.body.id,
		password: req.body.password
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else
		if (obj.length > 0) {
			res.send({
				'success': false,
				'message': 'Same Old Password'
			});
		} else if (req.body.password == '') {
			res.send({
				'success': 'password',
				'message': 'Please Enter Password'
			});
		} else {
			User.find({
				_id: req.body.id
			}, function (err, obj) {
				global.x = obj;
				User.update({
					_id: req.body.id
				}, {
					password: req.body.password
				}, function (err, obj) {
					if (err) {
						res.send(err);
					} else {
						res.send({
							'success': true,
							'message': x[0].firstName,
							'messages': x[0].email,
							'type': x[0].type
						});
					}
				});
			})
		}
	});
});

router.post('/updatepass', function (req, res) {
	User.find({
		email: req.body.email,
		password: req.body.password
	}, function (err, obj) {
		if (obj.length == 0) {
			res.send({
				'success': false,
				'message': 'Wrong Old Password'
			});
		} else if (obj.length > 0) {
			console.log('adda')
			User.update({
				email: req.body.email
			}, {
				password: req.body.ccpassword
			}, function (err, obj) {
				if (err) {
					res.send(err);
				} else {
					res.send({
						'success': true,
						'message': 'Password Updated'
					});
				}
			});
		}
	});
});

router.post('/updateprofile', function (req, res) {
	User.find({
		email: req.body.email
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'fname': obj[0].firstName,
				'lname': obj[0].lastName,
				'bio': obj[0].bio,
				'dob': obj[0].dob,
				'phoneno': obj[0].phoneNo,
				'secQ': obj[0].securityQuestion,
				'secA': obj[0].securityAnswer,
				'image': obj[0].image
			})
		}
	});
});

router.get('/updateprofile/:email', function (req, res) {
	var email = req.params.email
	User.find({
		email: email
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'fname': obj[0].firstName,
				'lname': obj[0].lastName,
				'bio': obj[0].bio,
				'dob': obj[0].dob,
				'phoneno': obj[0].phoneNo,
				'secQ': obj[0].securityQuestion,
				'secA': obj[0].securityAnswer,
				'image': obj[0].image
			})
		}
	});
});

router.post('/updateprofile1', function (req, res) {
	User.update({
		email: req.body.semail
	}, {
		firstName: req.body.fname,
		lastName: req.body.lname,
		bio: req.body.bio,
		dob: req.body.dob,
		phoneNo: req.body.phoneno,
		securityQuestion: req.body.secQ,
		securityAnswer: req.body.secA,
		image: req.body.image
	}, function (err, obj) {
		if (err) {
			console.log('happy')
			res.send(err);
		} else {
			console.log('sad');
			res.send({
				'success': true,
				'message': 'User Successfully Updated'
			});
		}
	});
});

router.post('/addFood', function (req, res) {
	if (req.body.name == '') {
		res.send({
			'success': 'name',
			'message': 'Please Enter Name'
		});
	} else if (req.body.quantity == '') {
		res.send({
			'success': 'quantity',
			'message': 'Please Enter Quantity'
		});
	} else if (req.body.date == '') {
		res.send({
			'success': 'date',
			'message': 'Please Enter Date'
		});
	} else if (req.body.condition == '') {
		res.send({
			'success': 'condition',
			'message': 'Please Enter Condition'
		});
	} else if (req.body.lat == null) {
		res.send({
			'success': 'location',
			'message': 'Please Select Location'
		});
	} else if (req.body.comments == '') {
		res.send({
			'success': 'comments',
			'message': 'Please Comment If Any'
		});
	} else {
		var abc = new Food();
		abc.email = req.body.semail;
		abc.fname = req.body.dname;
		abc.name = req.body.name;
		abc.quantity = req.body.quantity;
		abc.date = req.body.date;
		abc.condition = req.body.condition;
		abc.address = req.body.address;
		abc.long = req.body.long;
		abc.lat = req.body.lat;
		abc.comments = req.body.comments;

		abc.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json('Successfully Added');
			}
		});
	}
});

router.post('/addMedicine', function (req, res) {
	if (req.body.name == '') {
		res.send({
			'success': 'name',
			'message': 'Please Enter Name'
		});
	} else if (req.body.quantity == '') {
		res.send({
			'success': 'quantity',
			'message': 'Please Enter Quantity'
		});
	} else if (req.body.date == '') {
		res.send({
			'success': 'date',
			'message': 'Please Enter Date'
		});
	} else if (req.body.description == '') {
		res.send({
			'success': 'description',
			'message': 'Please Enter Description'
		});
	} else if (req.body.lat == null) {
		res.send({
			'success': 'location',
			'message': 'Please Select Location'
		});
	} else if (req.body.comments == '') {
		res.send({
			'success': 'comments',
			'message': 'Please Comment If Any'
		});
	} else {
		var abc = new Medicine();
		abc.email = req.body.semail;
		abc.fname = req.body.dname;
		abc.name = req.body.name;
		abc.quantity = req.body.quantity;
		abc.date = req.body.date;
		abc.description = req.body.description;
		abc.address = req.body.address;
		abc.long = req.body.long;
		abc.lat = req.body.lat;
		abc.comments = req.body.comments;

		abc.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json('Successfully Added');
			}
		});
	}
});

router.post('/addClothes', function (req, res) {
	if (req.body.gender == '') {
		res.send({
			'success': 'gender',
			'message': 'Please Select Gender'
		});
	} else if (req.body.type == '') {
		res.send({
			'success': 'type',
			'message': 'Please Enter Type'
		});
	} else if (req.body.material == '') {
		res.send({
			'success': 'material',
			'message': 'Please Enter Material'
		});
	} else if (req.body.quantity == '') {
		res.send({
			'success': 'quantity',
			'message': 'Please Enter Quantity'
		});
	} else if (req.body.size == '') {
		res.send({
			'success': 'size',
			'message': 'Please Select Size'
		});
	} else if (req.body.condition == '') {
		res.send({
			'success': 'condition',
			'message': 'Please Enter Condition'
		});
	} else if (req.body.lat == null) {
		res.send({
			'success': 'location',
			'message': 'Please Select Location'
		});
	} else if (req.body.comments == '') {
		res.send({
			'success': 'comments',
			'message': 'Please Comment If Any'
		});
	} else {
		var abc = new Clothes();
		abc.email = req.body.semail;
		abc.fname = req.body.dname;
		abc.gender = req.body.gender;
		abc.type = req.body.type;
		abc.material = req.body.material;
		abc.quantity = req.body.quantity;
		abc.size = req.body.size;
		abc.condition = req.body.condition;
		abc.address = req.body.address;
		abc.long = req.body.long;
		abc.lat = req.body.lat;
		abc.comments = req.body.comments;

		abc.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json('Successfully Added');
			}
		});
	}
});

router.post('/addCause', function (req, res) {
	if (req.body.title == '') {
		res.send({
			'success': 'title',
			'message': 'Please Enter Title'
		});
	} else if (req.body.name == '') {
		res.send({
			'success': 'name',
			'message': 'Please Enter Name'
		});
	} else if (req.body.age == '') {
		res.send({
			'success': 'age',
			'message': 'Please Enter Age'
		});
	} else if (req.body.phoneno == '') {
		res.send({
			'success': 'phoneno',
			'message': 'Please Enter Phone Number'
		});
	} else if (req.body.problem == '') {
		res.send({
			'success': 'problem',
			'message': 'Please State The Problem'
		});
	} else if (req.body.req == '') {
		res.send({
			'success': 'req',
			'message': 'Please Enter Your Requirement'
		});
	}
	/*else if (req.body.documents=='')
	{
		res.send({'success':'documents', 'message' : 'Please Upload Documents If Any'});
	}*/
	else {
		var abc = new Cause();
		abc.pic = req.body.pic;
		abc.email = req.body.semail;
		abc.fname = req.body.dname;
		abc.title = req.body.title;
		abc.name = req.body.name;
		abc.age = req.body.age;
		abc.phoneno = req.body.phoneno;
		abc.problem = req.body.problem;
		abc.req = req.body.req;
		abc.documents = req.body.documents;
		//abc.documents=req.body.documents;

		abc.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json('Successfully Added');
			}
		});
	}
});

router.get('/viewCause', function (req, res) {
	Cause.find({}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send(obj)
		}
	});
});

router.get('/viewprofile/:email', function (req, res) {
	var email = req.params.email
	User.find({
		email: email
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'fname': obj[0].firstName,
				'lname': obj[0].lastName,
				'bio': obj[0].bio,
				'dob': obj[0].dob,
				'phoneno': obj[0].phoneNo,
				'image': obj[0].image
			})
		}
	});
});

router.get('/viewCause1/:email.:title', function (req, res) {
	var email = req.params.email
	var title = req.params.title
	Cause.find({
		email: email,
		title: title
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'title': obj[0].title,
				'name': obj[0].name,
				'age': obj[0].age,
				'phoneno': obj[0].phoneno,
				'problem': obj[0].problem,
				'req': obj[0].req
			})
		}
	});
});

router.post('/commentstar', function (req, res) {
	CommentStar.find({
		email: req.body.email,
		name: req.body.name,
		title: req.body.title
	}, function (err, obj) {
		if (obj.length == 0) {
			var abc = new CommentStar();
			abc.email = req.body.email;
			abc.title = req.body.title;
			abc.name = req.body.name;
			abc.rating = req.body.rating;

			abc.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.json({
						'info': true,
						'message': 'Successfully Added Stars'
					});
				}
			});
		} else {
			CommentStar.update({
				email: req.body.email
			}, {
				rating: req.body.rating
			}, function (err, obj) {
				if (err) {
					res.send(err);
				} else {
					res.json({
						'info': true,
						'message': 'Successfully Updated Stars'
					});
				}
			})
			//res.send({'info': true, 'value': 'No More Than One Review'})
		}
	})
});

router.get('/viewcommentstar/:title', function (req, res) {
	var title = req.params.title
	CommentStar.find({
		title: title
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			var i;
			var rate = 0;
			for (i = 0; i < obj.length; i++) {
				rate = rate + obj[i].rating;
			}
			var rates = parseFloat(rate / obj.length);
			res.send({
				'info': true,
				'rating': rates,
				'counter': obj.length
			})
		}
	});
});

router.post('/addComment', function (req, res) {
	if (req.body.comment == '') {
		res.json({
			'info': false,
			'message': 'Please Enter Comment'
		})
	} else {
		var abc = new Comments();
		abc.email = req.body.email;
		abc.title = req.body.title;
		abc.name = req.body.name;
		abc.comment = req.body.comment;

		abc.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					'info': true,
					'message': 'Comment Successfully Added'
				});
			}
		});

	}
});

router.get('/viewComments/:title', function (req, res) {
	var title = req.params.title
	Comments.find({
		title: title
	}, function (err, obj) {
		if (err) {
			console.log('hali')
			res.send({
				'info': false,
				'message': 'There are no comments'
			});
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.post('/deleteComment', function (req, res) {
	Comments.find({
		email: req.body.email,
		title: req.body.title,
		name: req.body.name,
		comment: req.body.comment
	}, function (err, obj) {
		if (obj.length <= 0) {
			res.send({
				'info': false,
				'message': 'You Cannot Delete This Comment'
			});
		} else if (obj.length > 0) {
			Comments.deleteOne({
					email: req.body.email,
					title: req.body.title,
					name: req.body.name,
					comment: req.body.comment
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});

router.get('/viewFoodDonate/:email', function (req, res) {
	var email = req.params.email
	//var dname = req.params.dname
	Food.find({
		email: email
	}, function (err, obj) {
		if (err) {
			res.send({
				'info': false,
				'message': 'There are no donations'
			});
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.post('/deleteFoodDonate', function (req, res) {
	Food.deleteOne({
			email: req.body.email,
			fname: req.body.fname,
			name: req.body.name
		},
		function (err, obj) {
			if (err) {
				res.send(err);
			} else {
				res.send({
					'success': true,
					'message': 'Food Successfully Deleted'
				});
			}
		});
});

router.get('/updateFoodList/:email.:name', function (req, res) {
	var email = req.params.email
	var name = req.params.name
	Food.find({
		email: email,
		name: name
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'name': obj[0].name,
				'quantity': obj[0].quantity,
				'date': obj[0].date,
				'condition': obj[0].condition,
				'address': obj[0].address,
				'lat': obj[0].lat,
				'long': obj[0].long,
				'comments': obj[0].comments
			})
		}
	});
});

router.post('/updateFood', function (req, res) {
	Food.update({
		email: req.body.semail,
		name: req.body.name
	}, {
		quantity: req.body.quantity,
		date: req.body.date,
		condition: req.body.condition,
		address: req.body.address,
		lat: req.body.lat,
		long: req.body.long,
		comments: req.body.comments
	}, function (err, obj) {
		if (err) {
			res.send({
				'success': false,
				'message': 'You Cannot Change Name'
			});
		} else {
			res.send({
				'success': true,
				'message': 'Food Successfully Updated'
			});
		}
	});
});

router.get('/viewCause/:email', function (req, res) {
	var email = req.params.email
	//var dname = req.params.dname
	Cause.find({
		email: email
	}, function (err, obj) {
		if (err) {
			res.send({
				'info': false,
				'message': 'There are no causes'
			});
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.post('/deleteCause', function (req, res) {
	Cause.deleteOne({
			email: req.body.email,
			title: req.body.title,
			name: req.body.name
		},
		function (err, obj) {
			if (err) {
				res.send(err);
			} else {
				res.send({
					'success': true,
					'message': 'Cause Successfully Deleted'
				});
			}
		});
});

router.get('/showCause/:email.:title.:name', function (req, res) {
	var email = req.params.email
	var title = req.params.title
	var name = req.params.name
	Cause.find({
		email: email,
		title: title,
		name: name
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'title': obj[0].title,
				'name': obj[0].name,
				'age': obj[0].age,
				'phoneno': obj[0].phoneno,
				'problem': obj[0].problem,
				'req': obj[0].req
			})
		}
	});
});

router.post('/editCause', function (req, res) {
	Cause.update({
		email: req.body.email,
		title: req.body.title,
		name: req.body.name
	}, {
		name: req.body.name,
		age: req.body.age,
		phoneno: req.body.phoneno,
		problem: req.body.problem,
		req: req.body.req,
	}, function (err, obj) {
		if (err) {
			res.send({
				'success': false,
				'message': 'You Cannot Change Title'
			});
		} else {
			res.send({
				'success': true,
				'message': 'Cause Successfully Updated'
			});
		}
	});
});

router.get('/viewMedDonate/:email', function (req, res) {
	var email = req.params.email
	//var dname = req.params.dname
	Medicine.find({
		email: email
	}, function (err, obj) {
		if (err) {
			res.send({
				'info': false,
				'message': 'There are no donations'
			});
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.post('/deleteMedDonate', function (req, res) {
	Medicine.deleteOne({
			email: req.body.email,
			fname: req.body.fname,
			name: req.body.name
		},
		function (err, obj) {
			if (err) {
				res.send(err);
			} else {
				res.send({
					'success': true,
					'message': 'Medicine Successfully Deleted'
				});
			}
		});
});

router.get('/viewClothesDonate/:email', function (req, res) {
	var email = req.params.email
	//var dname = req.params.dname
	Clothes.find({
		email: email
	}, function (err, obj) {
		if (err) {
			res.send({
				'info': false,
				'message': 'There are no donations'
			});
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.post('/deleteClothesDonate', function (req, res) {
	Clothes.deleteOne({
			email: req.body.email,
			fname: req.body.fname,
			type: req.body.type
		},
		function (err, obj) {
			if (err) {
				res.send(err);
			} else {
				res.send({
					'success': true,
					'message': 'Clothes Successfully Deleted'
				});
			}
		});
});

router.get('/updateMedicineList/:email.:name', function (req, res) {
	var email = req.params.email
	var name = req.params.name
	Medicine.find({
		email: email,
		name: name
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'name': obj[0].name,
				'quantity': obj[0].quantity,
				'date': obj[0].date,
				'description': obj[0].description,
				'address': obj[0].address,
				'lat': obj[0].lat,
				'long': obj[0].long,
				'comments': obj[0].comments
			})
		}
	});
});

router.post('/updateMed', function (req, res) {
	Medicine.update({
		email: req.body.semail,
		name: req.body.name
	}, {
		quantity: req.body.quantity,
		date: req.body.date,
		description: req.body.description,
		address: req.body.address,
		lat: req.body.lat,
		long: req.body.long,
		comments: req.body.comments
	}, function (err, obj) {
		if (err) {
			res.send({
				'success': false,
				'message': 'You Cannot Change Name'
			});
		} else {
			res.send({
				'success': true,
				'message': 'Medicine Successfully Updated'
			});
		}
	});
});

router.get('/updateClothesList/:email.:type', function (req, res) {
	var email = req.params.email
	var type = req.params.type
	Clothes.find({
		email: email,
		type: type
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'gender': obj[0].gender,
				'type': obj[0].type,
				'material': obj[0].material,
				'quantity': obj[0].quantity,
				'size': obj[0].size,
				'condition': obj[0].condition,
				'address': obj[0].address,
				'lat': obj[0].lat,
				'long': obj[0].long,
				'comments': obj[0].comments
			})
		}
	});
});

router.post('/updateClothes', function (req, res) {
	Clothes.update({
		email: req.body.semail,
		type: req.body.type
	}, {
		gender: req.body.gender,
		material: req.body.material,
		quantity: req.body.quantity,
		size: req.body.size,
		condition: req.body.condition,
		lat: req.body.lat,
		long: req.body.long,
		comments: req.body.comments
	}, function (err, obj) {
		if (err) {
			res.send({
				'success': false,
				'message': 'You Cannot Change Type'
			});
		} else {
			res.send({
				'success': true,
				'message': 'Clothes Successfully Updated'
			});
		}
	});
});

router.post('/message', function (req, res) {
	/*var abc = new Message();
	abc.message = req.body.message;
	abc.save(function (err) 
	{
	if (err) 
		{
			res.send(err);
		}
		else
		{
			res.json({'info': true, 'message': 'Message Successfully Added'});
		}
	});*/

	Message.update({
		user: req.body.user
	}, {
		message: req.body.message,
	}, function (err, obj) {
		if (err) {
			res.send({
				'success': false,
				'message': 'Something is Wrong'
			});
		} else {
			res.send({
				'success': true,
				'message': 'Message Updated Successfully'
			});
		}
	});
});

router.get('/viewMessage/:user', function (req, res) {
	var user = req.params.user
	Message.find({
		user
	}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj[0].message
			})
		}
	});
});

router.post('/reportP', function (req, res) {
	var abc = new ReportP();
	abc.email = req.body.email;
	abc.fname = req.body.fname;
	abc.lname = req.body.lname;
	abc.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({
				'info': true,
				'message': 'Reported Successfully'
			});
		}
	});
});

router.post('/reportC', function (req, res) {
	var abc = new ReportC();
	abc.semail = req.body.semail;
	abc.title = req.body.title;
	abc.name = req.body.name;
	abc.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({
				'info': true,
				'message': 'Reported Successfully'
			});
		}
	});
});

router.get('/viewCauseReports/', function (req, res) {
	ReportC.find({}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.get('/viewProfileReports/', function (req, res) {
	ReportP.find({}, function (err, obj) {
		if (err) {
			res.send(err);
		} else if (obj.length > 0) {
			res.send({
				'info': true,
				'message': obj
			})
		}
	});
});

router.post('/deleteCauses', function (req, res) {
	ReportC.find({
		title: req.body.title,
		name: req.body.name
	}, function (err, obj) {
		if (err) {
			throw err;
		} else {
			Cause.deleteOne({
					title: req.body.title,
					name: req.body.name
				},
				function (err, obj) {
					if (err) {
						res.send(err);
					} else {
						res.send({
							'success': true,
							'message': 'Cause Successfully Deleted'
						});
						ReportC.deleteOne({
								title: req.body.title,
								name: req.body.name
							},
							function (err, obj) {})
					}
				});
		}
	})

});

router.post('/deleteProfiles', function (req, res) {
	ReportP.find({
		email: req.body.emaila
	}, function (err, obj) {
		if (err) {
			throw err;
		} else if (obj.length > 0) {
			User.deleteOne({
					email: req.body.emaila
				},
				function (err, obj) {
					if (err) {
						res.send(err);
					} else {
						res.send({
							'success': true,
							'message': 'Profile Successfully Deleted'
						});
						ReportP.deleteOne({
								email: req.body.emaila
							},
							function (err, obj) {})
					}
				});
		}
	})

});

router.post('/payment', function (req, res) {
	var abc = new Payment();
	abc.email = req.body.email;
	abc.name = req.body.name;
	abc.amount = req.body.amount;

	abc.save(function (err) {
		if (err) throw err;

		res.send({
			'info': true,
			'message': 'Payment Added Successfully'
		});
	})
});

router.get('/viewpayment', function (req, res) {
	Payment.find({}, function (err, obj) {
		if (err) console.log('ss')

		else {
			console.log('aasdas')
			res.send({
				'info': true,
				'message': obj
			})
		}
	})
})

////////////////////////////////


//var cause = require('./models/cause2');
//var user = require('./models/user2');

var setpermission = function (req, res, next) {

	res.setHeader('Access-Control-Allow-Methods', '*')

	res.setHeader('Access-Control-Allow-Origin', '*')

	res.setHeader('Access-Control-Allow-Headers', '*')

	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
}

router.post('/createCause', function (req, res) {

	let body = req.body;
	title = body.title;
	name = body.name;
	age = body.age;
	phoneNumber = body.phoneNumber;
	description = body.description;
	requirements = body.requirements;
	documents = body.documents;
	fname = body.fname;
	email = body.email;

	if (documents == undefined || document == "") {
		documents = "No Documents";
	}

	var c = new Cause();
	c.title = title;
	c.name = name;
	c.age = age;
	c.phoneno = phoneNumber;
	c.problem = description;
	c.req = requirements;
	c.email = email;
	c.fname = fname;
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

	User.find({}).populate('user').exec(function (err, view) {
		if (err) {
			res.status(500).send('Error in database.')
		} else {
			res.send(view);
		}
	})
	return router;
});

router.get('/get_causes', setpermission, function (req, res) {

	Cause.find({}).populate('causes').exec(function (err, view) {
		if (err) {
			res.status(500).send('Error in database.')
		} else {
			res.send(view);
		}
	})
	return router;
});

router.get('/reports', setpermission, function (req, res) {

	Cause.find({}).populate('cause').exec(function (err, view) {
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

	Cause.find({
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

	Cause.findOneAndUpdate({
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

	Cause.findOne({
		p_id: ID
	}, function (err, doc) {
		if (err) {
			res.status(500).send('Error occurred while finding.');
		} else {
			if (doc) {
				console.log('Cause found. Deleting.');
				Cause.deleteOne({
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

router.post('/addDropOff', function (req, res) {
	var abc = new DropOff();
	abc.title = req.body.title;
	abc.phoneno = req.body.phoneno;
	abc.problem = req.body.problem;
	abc.longi = req.body.longi;
	abc.lati = req.body.lati;
	console.log(abc.title);
	abc.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json('Successfully Registered');
		}
	});
});

router.get('/get_dropOffs', setpermission, function (req, res) {

	DropOff.find({approval:"approved"}).populate('drop-offs').exec(function (err, view) {
		if (err) {
			res.status(500).send('Error in database.')
		} else {
			res.send(view);
		}
	})
	return router;
});

router.get('/get_dropOffsApprovals', setpermission, function (req, res) {

	DropOff.find({approval:"notapproved"}).populate('drop-offs').exec(function (err, view) {
		if (err) {
			res.status(500).send('Error in database.')
		} else {
			res.send(view);
		}
	})
	return router;
});

router.post('/approveDropOff', function (req, res) {
	DropOff.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length == 0) {
			res.send({
				'success': false,
				'message': 'Nothing to update.'
			});
		} else if (obj.length > 0) {
			if (req.body.id != "" && req.body.id != " " && req.body.id != null && req.body.id != undefined)
				DropOff.update({
					_id: req.body.id
				}, {
					approval: "approved"
				}, function (err, obj) {
					if (err) {
				//		res.send(err);
					} else {
				//		res.send({
				//			'success': true,
				//			'message': 'Cause Updated'
				//		});
					}
			});
		}
	});
});

router.post('/deleteDropOffApproval', setpermission, function (req, res) {
	DropOff.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length <= 0) {
		//	res.send({
		//		'info': false,
		//		'message': 'You Cannot Delete This Comment'
		//	});
		} else if (obj.length > 0) {
			DropOff.deleteOne({
					_id: req.body.id
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});


router.post('/deleteCauseNew', setpermission, function (req, res) {
	Cause.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length <= 0) {
			res.send({
				'info': false,
				'message': 'You Cannot Delete This Comment'
			});
		} else if (obj.length > 0) {
			Cause.deleteOne({
					_id: req.body.id
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});

router.post('/deleteDropOff', setpermission, function (req, res) {
	DropOff.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length <= 0) {
		//	res.send({
		//		'info': false,
		//		'message': 'You Cannot Delete This Comment'
		//	});
		} else if (obj.length > 0) {
			DropOff.deleteOne({
					_id: req.body.id
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});

router.post('/deleteReportedCauseNew', setpermission, function (req, res) {
	Cause.find({
		title: req.body.title
	}, function (err, obj) {
		if (obj.length <= 0) {
			res.send({
				'info': false,
				'message': 'You Cannot Delete This Comment'
			});
		} else if (obj.length > 0) {
			Cause.deleteOne({
					title: req.body.title
				},
				function (err, obj) {
					if (err) {
						console.log("Error while deleted cause on a report basis..")
					} else {
						console.log("Cause deleted on basis of a report!")
					}
				});
			ReportC.deleteOne({
					title: req.body.title
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});

router.post('/ignoreReportedCause', setpermission, function (req, res) {
	ReportC.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length <= 0) {
			res.send({
				'info': false,
				'message': 'You Cannot Delete This Comment'
			});
		} else if (obj.length > 0) {

			ReportC.deleteOne({
					_id: req.body.id
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});

router.post('/deleteReportedProfileNew', setpermission, function (req, res) {
	ReportP.find({
		email: req.body.email
	}, function (err, obj) {
		if (obj.length <= 0) {
			res.send({
				'info': false,
				'message': 'You Cannot Delete This Comment'
			});
		} else if (obj.length > 0) {
			User.deleteOne({
					email: req.body.email
				},
				function (err, obj) {
					console.log("Account deleted on basis of a report!")
				});
			ReportP.deleteOne({
					email: req.body.email
				},
				function (err, obj) {
					if (err) {
					//	res.send({
					//		'info': false,
					//		'message': 'You Cannot Delete This Comment'
					//	});
					} else {
						//res.send({
						//	'success': true,
						//	'message': 'Comment Successfully Deleted'
					//	});
					}
				});

				Cause.deleteMany({
					email: req.body.email
				},
				function (err, obj) {
					if (err) {
					//	res.send({
					//		'info': false,
					//		'message': 'You Cannot Delete This Comment'
					//	});
					} else {
						//res.send({
						//	'success': true,
						//	'message': 'Comment Successfully Deleted'
					//	});
					}
				});
		}
	})
});

router.post('/ignoreReportedProfile', setpermission, function (req, res) {
	ReportP.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length <= 0) {
			res.send({
				'info': false,
				'message': 'You Cannot Delete This Comment'
			});
		} else if (obj.length > 0) {
			ReportP.deleteOne({
					_id: req.body.id
				},
				function (err, obj) {
					if (err) {
						res.send({
							'info': false,
							'message': 'You Cannot Delete This Comment'
						});
					} else {
						res.send({
							'success': true,
							'message': 'Comment Successfully Deleted'
						});
					}
				});
		}
	})
});

router.post('/updateCauseNew', function (req, res) {
	Cause.find({
		_id: req.body.id
	}, function (err, obj) {
		if (obj.length == 0) {
			res.send({
				'success': false,
				'message': 'Nothing to update.'
			});
		} else if (obj.length > 0) {
			if (req.body.title != "" && req.body.title != " " && req.body.title != null && req.body.title != undefined)
				Cause.update({
					_id: req.body.id
				}, {
					title: req.body.title
				}, function (err, obj) {
					if (err) {
				//		res.send(err);
					} else {
				//		res.send({
				//			'success': true,
				//			'message': 'Cause Updated'
				//		});
					}
				});
			if (req.body.name != "" && req.body.name != " " && req.body.name != null && req.body.title != undefined)
				Cause.update({
					_id: req.body.id
				}, {
					name: req.body.name
				}, function (err, obj) {
					if (err) {
			//			res.send(err);
					} else {
			//			res.send({
			//				'success': true,
			//				'message': 'Cause Updated'
			//			});
					}
				});
			if (req.body.age != "" && req.body.age != " " && req.body.age != null && req.body.age != undefined)
				Cause.update({
					_id: req.body.id
				}, {
					age: req.body.age
				}, function (err, obj) {
					if (err) {
			//			res.send(err);
					} else {
			//			res.send({
			//				'success': true,
			//				'message': 'Cause Updated'
			//			});
					}
				});
			if (req.body.phoneno != "" && req.body.phoneno != " " && req.body.phoneno != null && req.body.phoneno != undefined)
				Cause.update({
					_id: req.body.id
				}, {
					phoneno: req.body.phoneno
				}, function (err, obj) {
					if (err) {
			//			res.send(err);
					} else {
			//			res.send({
			//				'success': true,
			//				'message': 'Cause Updated'
			//			});
					}
				});
			if (req.body.problem != "" && req.body.problem != " " && req.body.problem != null && req.body.problem != undefined)
				Cause.update({
					_id: req.body.id
				}, {
					problem: req.body.problem
				}, function (err, obj) {
					if (err) {
				//		res.send(err);
					} else {
				//		res.send({
				//			'success': true,
				//			'message': 'Cause Updated'
				//		});
					}
				});
			if (req.body.req != "" && req.body.req != " " && req.body.req != null && req.body.req != undefined)
				Cause.update({
					_id: req.body.id
				}, {
					req: req.body.req
				}, function (err, obj) {
					if (err) {
				//		res.send(err);
					} else {
				//		res.send({
				//			'success': true,
				//			'message': 'Cause Updated'
				//		});
					}
				});
		}
	});
});

router.get('/getCauseReports', setpermission, function (req, res) {

	ReportC.find({}).populate('reportc').exec(function (err, view) {
		if (err) {
			res.status(500).send('Error in database.')
		} else {
			res.send(view);
		}
	})
	return router;
});

router.get('/getProfileReports', setpermission, function (req, res) {

	ReportP.find({}).populate('reportp').exec(function (err, view) {
		if (err) {
			res.status(500).send('Error in database.')
		} else {
			res.send(view);
		}
	})
	return router;
});

app.use('/api', router);

module.exports = app, router;