const roleValidation = (data) => {
  const role = ["admin", "analyste", "technicien", "supervisor"];
  if (role.includes(data)) {
    return true;
  } else {
    return false;
  }
};

module.exports = roleValidation;
