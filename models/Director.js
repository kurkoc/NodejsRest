const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    firstName: {
		type: String,
		maxlength: 60,
		minlength: 2
	},
    lastName: {
		type: String,
		maxlength: 60,
		minlength: 2
	},
    bio : String,
    created_date : {
        type : Date,
        default: Date.now
    }
});


module.exports = mongoose.model('director',DirectorSchema);