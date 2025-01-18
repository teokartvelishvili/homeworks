module.exports = (req, res, next) => {
    const { amount, description, date } = req.body;
    if (!amount || !description || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    next();
  };
  