import jwt from'jsonwebtoken';

export function verifyToken(req, res, next) {
var token = req.headers['authorization'].split(' ')[1];
 if (!token) {
    return res.status(403).send({ message: 'No token provided' });
 }

 jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
        console.error(err)
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
 });
}
