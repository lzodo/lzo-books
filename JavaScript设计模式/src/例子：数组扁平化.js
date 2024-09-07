let arr = [[1, 2, 3, 4], 5, [[6, 7, 8, 9, [10, 11, [400], 12]]]];
//1、 arr.flat(Infinity)

function flat(list) {
  return list.reduce((a, b) => {
    if (Array.isArray(b)) {
      return a.concat(flat(b));
    } else {
      return a.concat(b);
    }
  }, []);
}

console.log(flat(arr));
