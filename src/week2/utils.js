const getUserIndex = (id) => data.findIndex((user) => user.id === id);

const getAutoSuggestUsers = (loginSubstring, limit) => {
  const re = RegExp(`.*${loginSubstring.split("").join(".*")}.*`);
  const matches = data
    .filter((user) => user.login.toLowerCase().match(re))
    .splice(0, limit);
  return matches;
};

module.exports.getUserIndex = getUserIndex;
module.exports.getAutoSuggestUsers = getAutoSuggestUsers;
