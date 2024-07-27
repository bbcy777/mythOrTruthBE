import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    //Pull token out of header
    const token = req.header('x-auth-token');
    console.log(req.header)
    //If no token is found
    if(!token) {
        return res.status(401).json({ error: [{ msg: 'No Token, Authorization Denied.'}]});
    }
    //Else authenticate if token match db
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.user = decoded.user;
        
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: [{ msg: 'Token is not valid' }]});
    }
}