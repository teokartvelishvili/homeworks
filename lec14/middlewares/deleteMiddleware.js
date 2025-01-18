module.exports = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey !== 'authorized-key') {
      return res.status(403).json({ error: 'Unauthorized request' });
    }
    next();
  };
  