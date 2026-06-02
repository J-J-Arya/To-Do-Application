const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { createTask,getTasks,updateTask,deleteTask,getTaskById } = require("../controllers/taskController");
const { createSubtask,getSubtasks } = require("../controllers/subtaskController");

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.get("/:id", verifyToken, getTaskById);
router.post("/:id/subtasks", verifyToken, createSubtask);
router.get("/:id/subtasks", verifyToken, getSubtasks);

module.exports = router;