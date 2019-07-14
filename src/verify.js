function enforceDateFormat(datestring) {
  const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return regex.test(datestring);
}

function checkBoundaries(from, to, data) {
    const filtered = [];
    if (from && !to) {
      filtered = data.filter(item => item.date >= from);
    }
    else if (!from && to) {
      filtered = data.filter(item => item.date <= to);
    }
    else {
      filtered = data.filter(item => item.date >= from && item.date <= to);
    }
    return filtered;
}

module.exports = {
  enforceDateFormat,
  checkBoundaries,
}