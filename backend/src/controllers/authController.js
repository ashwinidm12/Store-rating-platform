import { registerUser, loginUser, updatePassword } from '../services/authService.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({ success: true, message: 'User registered', data: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);
    const token = generateToken({ id: user.id, role: user.role });
    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    await updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  return res.json({ success: true, message: 'Logged out' });
};
