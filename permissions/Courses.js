const { ROLE } = require("./roles");

function canViewCourse(user, project) {
  return user.role === ROLE.ADMIN || project.userId === user.id;
}

function scopedCourse(user, courses) {
  if (user.role === ROLE.ADMIN) return courses;
  return courses.filter((project) => project.userId === user.id);
}

function canDeleteCourse(user, project) {
  return project.userId === user.id;
}

module.exports = {
  canViewCourse,
  scopedCourse,
  canDeleteCourse,
};
