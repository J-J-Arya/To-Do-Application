const db = require("../config/db");

const createTask = (req, res) => {

    const { title, description } = req.body;

    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    db.query(
        "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
        [userId, title, description],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(201).json({
                message: "Task created successfully","taskId": result.insertId
            });

        }
    );
};

const getTasks = (req, res) => {

    const userId = req.user.id;
    const selectedDate = req.query.date;

    let query;
    let values;

    if (selectedDate) {

        query = `
            SELECT *
            FROM tasks
            WHERE user_id = ?
            AND task_date = ?
            ORDER BY task_time ASC
        `;

        values = [userId, selectedDate];

    } else {

        query = `
            SELECT *
            FROM tasks
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

        values = [userId];

    }

    db.query(
        query,
        values,
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json(results);
        }
    );
};

const updateTask = (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.id;

    const { title, description, is_completed } = req.body;

    db.query(
        `UPDATE tasks
         SET title = ?, description = ?, is_completed = ?
         WHERE id = ? AND user_id = ?`,
        [title, description, is_completed, taskId, userId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
              return res.status(404).json({
                message: "Task not found",
              });
            }

            return res.status(200).json({
                message: "Task updated successfully"
            });
        }
    );
};

const deleteTask = (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.id;

    db.query(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [taskId, userId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
              return res.status(404).json({
                message: "Task not found",
              });
            }

            return res.status(200).json({
                message: "Task deleted successfully"
            });
        }
    );
};

const getTaskById = (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.id;

    db.query(
        `SELECT * FROM tasks
         WHERE id = ? AND user_id = ?`,
        [taskId, userId],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            return res.status(200).json(results[0]);
        }
    );
};

module.exports = {
    createTask,getTasks,updateTask,deleteTask,getTaskById
};