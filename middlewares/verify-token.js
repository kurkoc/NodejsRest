const jwt = require('jsonwebtoken');
const config = require('../helper/config');

module.exports = (req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token){
		jwt.verify(token, config.secret_key, (err, decoded) => {
			if (err){
				res.json({
					status: false,
					message: 'Failed to authenticate token.'
				})
			}else{
								req.decoded = decoded;
                console.log(req.decode);
				next();
			}
		});
	}else{
		res.json({
			status: false,
			message: 'No token provided.'
		})
	}
}