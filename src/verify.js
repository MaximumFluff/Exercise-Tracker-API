function enforceDateFormat(datestring) {
  const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return regex.test(datestring);
}

function filterWithBoundaries(from, to, data) {
    let filtered = [];
    if (from && !to) {
      filtered = data.filter(item => {
        const newDate = new Date(item.date);
        return newDate >= from;
      });
    }
    else if (!from && to) {
      filtered = data.filter(item => {
        const newDate = new Date(item.date);
        return newDate <= to;
      });
    }
    else if (from && to) {
      filtered = data.filter(item => {
        const newDate = new Date(item.date);
        return newDate >= from && newDate <= to;
      });
    }
    return filtered;
}

module.exports = {
  enforceDateFormat,
  filterWithBoundaries,
}