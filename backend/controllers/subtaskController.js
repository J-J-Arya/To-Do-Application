const db = require("../config/db");

const createSubtask = (req, res) => {

    const taskId = req.params.id;
    const { title } = req.body;

    db.query(
        `INSERT INTO subtasks
         (task_id, title)
         VALUES (?, ?)`,
        [taskId, title],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(201).json({
                message: "Subtask created"
            });
        }
    );
};

const getSubtasks = (req, res) => {

    const taskId = req.params.id;

    db.query(
        `SELECT *
         FROM subtasks
         WHERE task_id = ?`,
        [taskId],
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

const updateSubtask = (req, res) => {

    const subtaskId = req.params.id;

    const {
        title,
        is_completed
    } = req.body;

    db.query(
        `UPDATE subtasks
         SET title = ?,
             is_completed = ?
         WHERE id = ?`,
        [title, is_completed, subtaskId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                message: "Subtask updated"
            });
        }
    );
};

const deleteSubtask = (req, res) => {

    const subtaskId = req.params.id;

    db.query(
        `DELETE FROM subtasks
         WHERE id = ?`,
        [subtaskId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                message: "Subtask deleted"
            });
        }
    );
};

module.exports = {
    createSubtask,
    getSubtasks,
    updateSubtask,
    deleteSubtask
};