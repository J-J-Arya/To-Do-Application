const db = require("../config/db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Email already registered"
                });
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

module.exports = {
    registerUser
};