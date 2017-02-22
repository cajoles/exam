var express = require("express"),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
methodOverride = require("method-override");
// tal@1722itservices.com
var app = express();

mongoose.connect("mongodb://localhost/vehicle_app");

//CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static('public'));


//DB SCHEMA
var vehicleSchema = mongoose.Schema({
	brand: String,
	name:  String,
	year: Number,
	type: String,
	engine: String
});

var Vehicle = mongoose.model("Vehicle", vehicleSchema);

//  var ride = new Vehicle({
// 	brand: "Acer",
// 	name: "acer",
// 	year: 2016,
// 	type: "truck",
// 	engine: "gas"
// });

//  ride.save();



//===========
//ROUTES
//============
app.get("/", function (req, res) {
	res.redirect("/vehicle");
});
//INDEX --main page
app.get("/vehicle", function (req, res) {
	Vehicle.find({}, function (err, vehicle) {
	if(err) {
		console.log(err)
	} else {
		// console.log(vehicle);
			res.render("index", {vehicle: vehicle});

	}
	});
});

//NEW -- show form for additional vehicle
app.get("/vehicle/new", function (req, res) {
	res.render("new");
});

//CREATE insert new vehicle
app.post("/vehicle", function (req, res) {

	// console.log(req.body.ride);
	Vehicle.create(req.body.ride, function (err, newVehicle) {
		if(err)	{
			console.log(err)
		} else {
			res.redirect("/vehicle");
		}
	});
});
//SHOW display detailed information of the select data
app.get("/vehicle/:id", function (req, res) {
	Vehicle.find({_id: req.params.id}, function (err, foundVehicle) {
		if(err) { console.log(err);
		}
			else{
				res.render("show", { vehicle: foundVehicle});
			}
	});
});
//EDIT show form for update
app.get("/vehicle/:id/edit", function (req, res) {
	Vehicle.find({_id: req.params.id}, function (err, editVehicle) {
		if(err) { console.log(err)}
			else{
				res.render("edit", { vehicle: editVehicle});
			}
	});
});

//UPDATE - update selected data with new information
app.put("/vehicle/:id", function (req, res) {
	Vehicle.findByIdAndUpdate(req.params.id, req.body.ride , function (err) {
		if(err) { console.log(err);}
			else {
				res.redirect("/vehicle");
			}
	});
});

//DELETE - remove selected data
app.delete("/vehicle/:id", function (req, res) {
	// res.send(req.params.id);
	Vehicle.findByIdAndRemove(req.params.id, function (err) {
		if(err) { console.log(err); }
			else {
				res.redirect("/vehicle");
			}
	});
});




//listening to PORT 3000
app.listen(3000, function (err) {
	if(err) { console.log(err);}
	console.log("Vehicle App Server Online");
});