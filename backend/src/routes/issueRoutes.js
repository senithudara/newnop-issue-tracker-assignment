const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getIssues,
  getIssueStats,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

const router = express.Router();

//protect all routes after this middleware
router.use(protect);

router.get("/", getIssues);
router.get("/stats", getIssueStats);
router.get("/:id", getIssueById);
router.post("/", createIssue);
router.patch("/:id", updateIssue);
router.delete("/:id", deleteIssue);

module.exports = router;
