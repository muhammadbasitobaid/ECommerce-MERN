module.exports = (tryFunc) => (req, res, next) => {
  Promise.resolve(tryFunc(req, res, next)).catch(next);
};
