export const profile = async (req, res) => {
  const { id, name, email, address, role, created_at, updated_at } = req.user;
  return res.json({ success: true, data: { id, name, email, address, role, created_at, updated_at } });
};
