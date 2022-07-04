const Member = require("../models/MemberModel");

// Get-All
const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, members) => {
      if (err) {
        reject(err);
      } else {
        resolve(members);
      }
    });
  });
};

// Get-By-Id
const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    Member.findById(id, (err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

// Post
const addMember = (newMember) => {
  return new Promise((resolve, reject) => {
    const member = new Member(newMember);

    member.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

// Put
const updateMember = (id, memberToUpdate) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(id, memberToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(memberToUpdate);
      }
    });
  });
};

// Delete
const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    let memberToDelete;
    Member.findById(id, (err, member) => {
      if (err) {
        reject(err);
      } else {
        memberToDelete = member;
      }
    });

    Member.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(memberToDelete);
      }
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
