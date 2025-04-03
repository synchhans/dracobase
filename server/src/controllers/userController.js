export const fetchDataUser = (req, res) => {
  const {
    displayName,
    firstName,
    lastName,
    role,
    plan,
    status,
    email,
    githubUsername,
    picture,
    level,
    createdAt,
  } = req.user;

  res.json({
    status: 200,
    user: {
      displayName,
      firstName,
      lastName,
      role,
      plan,
      status,
      email,
      githubUsername,
      picture,
      level,
      createdAt,
    },
  });
};
