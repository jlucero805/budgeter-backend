const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token === null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authenticatedToken) => {
		if (err) return res.sendStatus(403);
		req.token = authenticatedToken;
		next(); 
	});
}

const middleware = {
	authToken
}

module.exports = middleware;