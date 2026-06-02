const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    updateSubtask,
    deleteSubtask
} = require("../controllers/subtaskController");

router.put("/:id", verifyToken, updateSubtask);
router.delete("/:id", verifyToken, deleteSubtask);

module.exports = router;