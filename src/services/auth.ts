import jwt from 'jsonwebtoken';

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAfAQ/pbAC4d4UH15acVvhJXe+X5d7DpuF
WKD9CeKOKPCDlNWgiR63NFHSgToGLNnmOKGlTubpLzakWEBJQ3Mv0wIDAQAB
-----END PUBLIC KEY-----
`;

export const TOKEN_KEY = '@formatISO-Token';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, PUBLIC_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

export const login = (token: { token: string; expiresIn: number }): void => {
  localStorage.setItem(TOKEN_KEY, token.token);
  setTimeout(logout, token.expiresIn * 1000);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
