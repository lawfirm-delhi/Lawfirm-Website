const authRepo = require('../repositories/auth.repository');
const { hashPassword, verifyPassword } = require('../utils/password');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');

class AuthService {
  async register(data) {
    const existingUser = await authRepo.getUserByEmail(data.email);
    if (existingUser) {
      throw { status: 409, message: 'Email already registered', isOperational: true };
    }

    const passwordHash = await hashPassword(data.password);
    
    const user = await authRepo.createUser(
      { email: data.email, passwordHash, role: 'client' },
      { fullName: data.fullName, mobile: data.mobile, company: data.company }
    );

    return { id: user.id, email: user.email, role: user.role };
  }

  async login(email, password, ip, userAgent) {
    const user = await authRepo.getUserByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Invalid credentials', isOperational: true };
    }

    if (user.is_locked) {
      throw { status: 403, message: 'Account is locked. Please contact support.', isOperational: true };
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      await authRepo.updateFailedLoginAttempts(user.id, user.failed_login_attempts + 1, user.failed_login_attempts + 1 >= 5);
      await authRepo.logLoginAttempt(user.id, ip, userAgent, false);
      throw { status: 401, message: 'Invalid credentials', isOperational: true };
    }

    if (user.failed_login_attempts > 0) {
      await authRepo.updateFailedLoginAttempts(user.id, 0, false);
    }

    await authRepo.logLoginAttempt(user.id, ip, userAgent, true);

    const tokens = generateTokens(user);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    await authRepo.saveRefreshToken(user.id, tokens.refreshToken, expiresAt);

    const fullUser = await authRepo.getUserById(user.id);

    return {
      user: { 
        id: fullUser.id, 
        email: fullUser.email, 
        role: fullUser.role,
        fullName: fullUser.full_name,
        mobile: fullUser.mobile,
        company: fullUser.company
      },
      tokens
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw { status: 401, message: 'Refresh token required', isOperational: true };

    const tokenRecord = await authRepo.getRefreshToken(refreshToken);
    if (!tokenRecord || new Date(tokenRecord.expires_at) < new Date()) {
      throw { status: 401, message: 'Invalid or expired refresh token', isOperational: true };
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (e) {
      throw { status: 401, message: 'Invalid refresh token signature', isOperational: true };
    }

    const user = { id: payload.id, role: payload.role };
    const newTokens = generateTokens(user);

    await authRepo.deleteRefreshToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepo.saveRefreshToken(user.id, newTokens.refreshToken, expiresAt);

    return newTokens;
  }

  async logout(refreshToken) {
    if (refreshToken) {
      await authRepo.deleteRefreshToken(refreshToken);
    }
    return true;
  }
}

module.exports = new AuthService();
