const idValidate = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400)
    .json({message: "id inválido"});
  next()
}

module.exports = {
  idValidate,
};
