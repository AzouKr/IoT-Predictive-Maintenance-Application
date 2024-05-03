const roleValidation = (data) => {
  const role = ["admin", "analyste", "technicien"];
  if (role.includes(data)) {
    return true;
  } else {
    return false;
  }
};

module.exports = roleValidation;
