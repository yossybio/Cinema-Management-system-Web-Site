const express = require("express");
const membersService = require("../../BLL/services/membersServices");

const router = express.Router();

// Entry Point: 'http://localhost:8000/members'

// Get-All
router.route("/").get(async (req, res) => {
  try {
    const members = await membersService.getAllMembers();
    return res.json(members);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const member = await membersService.getMemberById(id);
    return res.json(member);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/").post(async (req, res) => {
  try {
    const member = req.body;
    const result = await membersService.addMember(member);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Put
router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const member = req.body;
    const result = await membersService.updateMember(id, member);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Delete
router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await membersService.deleteMember(id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
