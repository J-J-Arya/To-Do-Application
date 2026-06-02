const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [email, username],
    async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (results.length > 0) {

            if (results[0].email === email) {
                return res.status(400).json({
                    message: "Email already registered"
                });
            }

            if (results[0].username === username) {
                return res.status(400).json({
                    message: "Username already taken"
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                return res.status(201).json({
                    message: "User registered successfully"
                });
            }
        );
    }
);
};

const loginUser = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
    }
);
};

const getProfile = (req, res) => {

    const userId = req.user.id;

    db.query(
        "SELECT id, username, email FROM users WHERE id = ?",
        [userId],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json(results[0]);

        }
    );
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};