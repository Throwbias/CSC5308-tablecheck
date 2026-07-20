// middleware/auth.js
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        // Validation logic can be added here later
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authenticate };