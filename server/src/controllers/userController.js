export const fetchDataUser = (req, res) => {
  const { displayName, email, githubUsername, picture, level } = req.user;

  res.json({
    status: 200,
    user: {
      displayName,
      email,
      githubUsername,
      picture,
      level,
    },
  });
};
