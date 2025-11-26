export const productValidator = (req, res, next) => {
  const { name, price, description, stock } = req.body;
  if (!name || typeof name !== "string")
    return res.status(400).json({ error: "Name must be a string" });
  if (!price || typeof price !== "number")
    return res.status(400).json({ error: "Price must be a number" });
  if (!description || typeof description !== "string")
    return res.status(400).json({ error: "Description must be a string" });
  if (!stock || typeof stock !== "number")
    return res.status(400).json({ error: "Stock must be a number" });
  if (!name || !price || !description || !stock)
    return res.status(400).json({ error: "Name, price, stock and description are required" });
  return next();
};
