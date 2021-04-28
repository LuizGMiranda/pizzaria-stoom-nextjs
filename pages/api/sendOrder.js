export default (req, res) => {
  const { body } = req;
  const order = Math.floor(Math.random() * 12345);
  const points = Math.floor(Math.random() * 100);
  if (body.recommended) {
    return res.status(200).json({ order, points });
  }
  res.status(200).json({ order });
};
