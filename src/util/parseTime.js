const parseTime = (time) => {
  const regex = /(\d+)([smhdw])/;
  const parsed = regex.exec(time);
  if (!parsed) return null;
  const num = parsed[1];
  const unit = parsed[2];

  if (unit === 's') return num * 1000;
  if (unit === 'm') return num * 1000 * 60;
  if (unit === 'h') return num * 1000 * 60 * 60;
  if (unit === 'd') return num * 1000 * 60 * 60 * 24;
  if (unit === 'w') return num * 1000 * 60 * 60 * 24 * 7;

  return null;
};

module.exports = parseTime;
