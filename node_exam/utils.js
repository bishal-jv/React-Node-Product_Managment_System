let jwt = require('jsonwebtoken');

function generateToken(user) {
    if (!user) return null;

    let u1 = {
      userId: user.userId,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };

    return jwt.sign(u1, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 1
    });
}


function getCleanUser(user) {
    if (!user) return null;

    return {
      userId: user.userId,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };
}

module.exports = {
    generateToken,
    getCleanUser
}
