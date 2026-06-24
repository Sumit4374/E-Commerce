function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

function requiredJwtSecret() {
  const value = requiredEnv('JWT_SECRET');
  if (value === 'your_jwt_secret_change_in_production') {
    throw new Error('JWT_SECRET must be changed from the default value');
  }
  return value;
}

module.exports = {
  requiredEnv,
  requiredJwtSecret,
};
