const Issue = require("../models/Issue");

// GET /api/issues
const getIssues = async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;

    // filter object based on query parameters
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };

    // pagination
    const skip = (page - 1) * limit;
    const total = await Issue.countDocuments(filter);
    const issues = await Issue.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      issues,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/issues/stats
const getIssueStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/issues/:id
const getIssueById = async (req, res) => {
  try {
    //populate createdBy field with user details
    const issue = await Issue.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/issues
const createIssue = async (req, res) => {
  try {
    const { title, description, priority, severity } = req.body;
    const issue = await Issue.create({
      title,
      description,
      priority,
      severity,
      createdBy: req.userId,
    });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/issues/:id
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/issues/:id
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getIssues,
  getIssueStats,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};
