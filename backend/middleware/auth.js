const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  const auth = req.header('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return res.status(401).json({msg:'No token'});
  try {
    const dec = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = dec.id;
    next();
  } catch (err) {
    return res.status(401).json({msg:'Invalid token'});
  }
}
