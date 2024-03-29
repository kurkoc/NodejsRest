const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
		type: String,
        required: true,
        maxlength : 30,
        minlength: 3,
        unique : true
	},
    password: {
		type: String,
		minlength: 5
	},
    created_date : {
        type : Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user',UserSchema);