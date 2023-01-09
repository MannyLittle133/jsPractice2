describe('anagrams', () => {
  beforeEach(() => {
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });
  
  it('returns true if words are anagrams', () => {
    expect(anagrams('abc', 'cba')).toBe(true);
  });

  it('returns false if words are not anagrams', () => {
    expect(anagrams('abc', 'aba')).toBe(false);
  });

  it('does not count words with same letters but varying lengths as anagrams', () => {
    expect(anagrams('abc', 'cbaa')).toBe(false);
  });

  it('can handle large words with letters extremely scrambled', () => {
    expect(anagrams('aiuwehfxzxcvmneowieurahsde', 'nsewceaerihfawzueouxdihmxv')).toBe(true);
    expect(anagrams('aiuwehfxzxcvmneowieurahsde', 'nsewceaerihfawzueouxdihmxw')).toBe(false);
  });
});

describe("String.prototype.realWordsInString", () => {
  it("finds a simple word", () => {
    const words = "asdfcatqwer".realWordsInString(["cat", "car"]);
    expect(words).toEqual(["cat"]);
  });

  it("doesn't find words not in the dictionary", () => {
    const words = "batcabtarbrat".realWordsInString(["cat", "car"]);
    expect(words).toEqual([]);
  });

  it("does not return duplicates", () => {
    const words = "catcarcat".realWordsInString(["cat", "car"]);
    expect(words).toEqual(["car", "cat"])
  });

  it("finds words at the end of the string", () => {
    const words = "cabcarcat".realWordsInString(["cat", "car", "cab"]);
    expect(words).toEqual(["cab", "car", "cat"]);
  });

  it("finds words within words", () => {
    const dictionary = ["bears", "ear", "a", "army"];
    const words = "erbearsweatmyajs".realWordsInString(dictionary);
    expect(words).toEqual(["a", "bears", "ear"]);
  });
});

describe("String.prototype.symmetricSubstrings", () => {
  it("returns an empty array if there are no symmetric substrings", () => {
    expect("abc".symmetricSubstrings()).toEqual([]);
  });
  
  it("handles a simple example", () => {
    expect("aba".symmetricSubstrings()).toEqual(["aba"]);
  });

  it("handles two substrings", () => {
    expect("aba1cdc".symmetricSubstrings()).toEqual(["aba", "cdc"]);
  });

  it("handles nested substrings", () => {
    expect("xabax".symmetricSubstrings()).toEqual(["aba", "xabax"]);
  });
});

describe("titleize", () => {
  it("capitalizes a word", () => {
    expect(titleize("jaws")).toEqual("Jaws");
  });

  it("capitalizes every word (aka title case)", () => {
    expect(titleize("david copperfield")).toEqual("David Copperfield");
  });

  it("doesn't capitalize 'little words' in a title", () => {
    expect(titleize("war and peace")).toEqual("War and Peace");
  });

  it("does capitalize 'little words' at the start of a title", () => {
    expect(
      titleize("the bridge over the river kwai")
    ).toEqual("The Bridge over the River Kwai");
  });
});

describe("Array.prototype.quickSort", () => {
  beforeEach(() => {
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });
  
  it("works with an empty array", () => {
    expect([].quickSort()).toEqual([]);
  });

  it("works with an array of 1 number", () => {
    expect([5].quickSort()).toEqual([5]);
  });
  
  it("sorts an array of numbers with no duplicates", () => {
    const a = [ 2, 1, 3, 5, 0, 8, 4, 7, 6];
    const sorted = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    expect(a.quickSort()).toEqual(sorted);
  });

  it("sorts an array of numbers with duplicates", () => {
    const a = [3, 1, 2, 3, 9, 17, 10, 432, 10];
    const sorted = [1, 2, 3, 3, 9, 10, 10, 17, 432];
    expect(a.quickSort()).toEqual(sorted);
  });

  it("sorts according to the callback passed in", () => {
    const a = [ 2, 1, 3, 5, 0, 8, 4, 7, 6];
    const sorted = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    const callback = (x, y) => {
      if (y < x) return - 1;
      return 1;
    };

    expect(a.quickSort(callback)).toEqual(sorted);
  });
});

describe("jumbleSort", () => {
  beforeEach(() => {
    spyOn(Array.prototype, "sort").and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });
  
  it("defaults to alphabetical order", () => {
    expect(jumbleSort("hello")).toEqual("ehllo");
  });

  it("takes an alphabet array and sorts by that order", () => {
    const alphabet = 'helo'.split('');
    expect(jumbleSort("hello", alphabet)).toEqual("hello");
  });

  it("sorts by a reversed alphabet", () => {
    const reverseAlpha = 'abcdefghijklmnopqrstuvwxyz'.split('').reverse().join('');
    expect(jumbleSort("hello", reverseAlpha)).toEqual("ollhe");
  });
});

describe("binarySearch", () => {
  let searchArr;

  beforeEach(() => {
    searchArr = [1, 2, 3, 4, 5, 6, 7];
    spyOn(Array.prototype, 'indexOf').and.callThrough();
    spyOn(Array.prototype, 'includes').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.indexOf).not.toHaveBeenCalled();
    expect(Array.prototype.includes).not.toHaveBeenCalled();
  });

  it("should find an element in the right side of the array", () => {
    expect(binarySearch(searchArr, 7)).toEqual(6);
  });

  it("should find an element in the left side of the array", () => {
    expect(binarySearch(searchArr, 1)).toEqual(0);
  });

  it("should return -1 when an element is not present", () => {
    expect(binarySearch(searchArr, 8)).toEqual(-1);
  });

  it("should recursively search the correct half of the array", () => {
    spyOn(window, "binarySearch").and.callThrough();
    expect(binarySearch(searchArr, 6)).toEqual(5);
    expect(binarySearch).toHaveBeenCalledWith([5, 6, 7], 6);
  });
});

describe("Array.prototype.mergeSort", () => {
  let array;

  beforeEach(() => {
    array = [1, 5, 2, 4, 3];
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });

  it("works with an empty array", () => {
    expect([].mergeSort()).toEqual([]);
  });

  it("works with an array of one item", () => {
    expect([1].mergeSort()).toEqual([1]);
  });

  it("sorts numbers", () => {
    const sortedArray = [1, 2, 3, 4, 5];
    expect(array.mergeSort()).toEqual(sortedArray);
  });

  it("sorts arrays with duplicates", () => {
    expect([5, 4, 3, 3, 2, 1].mergeSort()).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it("uses a comparator function if passed in", () => {
    const reversed = array.mergeSort((x, y) => {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return 1;
      } else {
        return -1;
      }
    });
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it("does not modify original", () => {
    const dupedArray = [1, 5, 2, 4, 3];
    dupedArray.mergeSort();
    expect(dupedArray).toEqual(array);
  });

  it("calls the merge helper method", () => {
    spyOn(window, 'merge');
    array.mergeSort();
    expect(merge).toHaveBeenCalled();
  });
});

describe("Array.prototype.bubbleSort", () => {
  let array;

  // it does not call sort (setup)
  beforeEach(() => {
    array = [3, 1, 2, 5, 4];
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  // it does not call sort (verification)
  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });

  it("works with an empty array", () => {
    expect([].bubbleSort()).toEqual([]);
  });

  it("works with an array of one item", () => {
    expect([1].bubbleSort()).toEqual([1]);
  });

  it("sorts numbers", () => {
    const sortedArray = [1, 2, 3, 4, 5];
    expect(array.bubbleSort()).toEqual(sortedArray);
  });

  it("will use callback if given", () => {
    const reversedArray = [5, 4, 3, 2, 1];
    const sorted = array.bubbleSort((num1, num2) => {
      // order numbers based on descending sort of their squares
      const square1 = Math.pow(num1, 2);
      const square2 = Math.pow(num2, 2);
      if (square2 < square1) {
        return -1;
      } else if (square2 === square1) {
        return 0;
      } else {
        return 1;
      }
    });

    expect(sorted).toEqual(reversedArray);
  });

  it("does not modify the original array", () => {
    const dupedArray = array.slice();
    dupedArray.bubbleSort();
    expect(dupedArray).toEqual(array);
  });
});

describe("deepDup", () => {
  const robotParts = [
    ["nuts", "bolts", "washers"],
    ["capacitors", "resistors", "inductors"]
  ];
  let copy;

  beforeEach(() => {
    copy = deepDup(robotParts);
  });

  it("makes a copy of the original array", () => {
    expect(copy).toEqual(robotParts);
    expect(copy).not.toBe(robotParts);
  });

  it("deeply copies arrays", () => {
    copy[1].push("LEDs");
    expect(robotParts[1]).toEqual(["capacitors", "resistors", "inductors"]);
    expect(copy[1]).not.toBe(robotParts[1]);
  });

  it("calls itself recursively", () => {
    spyOn(window, "deepDup").and.callThrough();
    deepDup(robotParts);
    expect(deepDup).toHaveBeenCalledTimes(3);
  })
});

describe("exponent", () => {
  beforeEach(() => {
    spyOn(Math, 'pow').and.callThrough();
  });

  afterEach(() => {
    expect(Math.pow).not.toHaveBeenCalled();
  });
  
  it("correctly handles positive powers", () => {
    expect(exponent(5, 3)).toEqual(125);
  });

  it("correctly handles negative powers", () => {
    expect(exponent(2, -3)).toEqual(1/8.0);
  });

  it("correctly handles 0", () => {
    expect(exponent(2, 0)).toEqual(1);
  });

  it("calculates the exponent recursively", () => {
    spyOn(window, "exponent").and.callThrough();
    exponent(5, 3);
    expect(exponent.calls.count()).not.toBeLessThan(3);
  });
});

describe('fibsSum', () => {
  it('returns the sum of the first fibonacci number', () => {
    expect(fibsSum(1)).toEqual(1);
  });

  it('returns the sum of the first 2 fibonacci numbers', () => {
    expect(fibsSum(2)).toEqual(2);
  });

  it('returns the sum of the first 6 fibonacci numbers', () => {
    expect(fibsSum(6)).toEqual(20);
  });

  it("calls itself recursively", () => {
    spyOn(window, "fibsSum").and.callThrough();
    fibsSum(6);
    expect(fibsSum.calls.count()).not.toBeLessThan(5);
  });
});

describe("digitalRoot", () => {
  it("calculates the digital root of a single-digit number", () => {
    expect(digitalRoot(9)).toEqual(9);
  });

  it("calculates the digital root of a larger number", () => {
    expect(digitalRoot(44322)).toEqual(6);
  });
  
  it("does not call Number#toString on the argument", () => {
    spyOn(Number.prototype, 'toString').and.callThrough();
    digitalRoot(4322);
    expect(Number.prototype.toString).not.toHaveBeenCalled();
  });
});

describe("stringIncludeKey", () => {
  it("returns true for the same string", () => {
    expect(stringIncludeKey("adblfci", "abc")).toEqual(true);
  });

  it("handles keys with duplicate characters: case 1", () => {
    expect(stringIncludeKey("adbblfci", "abbc")).toEqual(true);
  });

  it("handles keys with duplicate characters: case 2", () => {
    expect(stringIncludeKey("adbclfci", "abbc")).toEqual(false);
  });

  it("returns false if the key characters are in the wrong order", () => {
    expect(stringIncludeKey("dblfcia", "abc")).toEqual(false);
  });

  it("returns false if the string doesn't contain the key", () => {
    expect(stringIncludeKey("db", "abc")).toEqual(false);
  });

  it("calls itself recursively", () => {
    spyOn(window, "stringIncludeKey").and.callThrough();
    stringIncludeKey("adbblfci", "abbc");
    expect(stringIncludeKey.calls.count()).not.toBeLessThan(4);
  });
});

describe("recSum", () => {
  it("returns 0 if the array is empty", () => {
    expect(recSum([])).toEqual(0);
  });
  
  it("works with an array of 1 element", () => {
    expect(recSum([25])).toEqual(25);
  });

  it("returns the sums of all elements in an array", () => {
    const arr = [1,2,3,4];
    expect(recSum(arr)).toEqual(10);
  });

  it("calls itself recursively", () => {
    const arr = [1,2,3,4]
    spyOn(window, 'recSum').and.callThrough();
    recSum(arr)
    expect(recSum.calls.count()).not.toBeLessThan(4);
  });
});

describe("factorialsRec", () => {
  it("returns first factorial number", () => {
    expect(factorialsRec(1)).toEqual([1]);
  });

  it("returns first two factorial numbers", () => {
    expect(factorialsRec(2)).toEqual([1, 1]);
  });

  it("returns many factorials numbers", () => {
    expect(factorialsRec(6)).toEqual([1, 1, 2, 6, 24, 120]);
  });

  it("calls itself recursively", () => {
    spyOn(window, "factorialsRec").and.callThrough();
    factorialsRec(6);
    expect(factorialsRec).toHaveBeenCalledTimes(6);
  });
});

describe('firstEvenNumbersSum', () => {
  it("Correctly returns the sum of the first even number", () => {
    expect(firstEvenNumbersSum(1)).toEqual(2);
  });

  it("Returns the sum of the first n even numbers", () => {
    expect(firstEvenNumbersSum(6)).toEqual(42);
  });

  it("calls itself recursively", () => {
    spyOn(window, "firstEvenNumbersSum").and.callThrough();
    firstEvenNumbersSum(4);
    expect(firstEvenNumbersSum).toHaveBeenCalledTimes(4);
  });
});

describe("Array.prototype.myFlatten", () => {
  it('Does not alter an empty array', () => {
    const array = [];
    expect(array.myFlatten()).toEqual([]);
  });

  it('Does not alter a one-dimensional array', () => {
    const array = [1,2,3];
    expect(array.myFlatten()).toEqual([1,2,3]);
  });

  it('Flattens arrays correctly', () => {
    const array = [1, 2, 3, [4, [5, 6]], [[[7]], 8]];
    expect(array.myFlatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("factors", () => {
  it("returns the factors of a number in ascending order", () => {
    expect(factors(10)).toEqual([1, 2, 5, 10]);
    expect(factors(21)).toEqual([1, 3, 7, 21]);
  });

  it("should handle 1 correctly", () => {
    expect(factors(1)).toEqual([1]);
  });
});

describe("primes", () => {
  it("returns an empty array when asked for zero primes", () => {
    expect(primes(0)).toEqual([]);
  });

  it("returns an array with the first prime when asked for one prime", () => {
    expect(primes(1)).toEqual([2]);
  });
  
  it("returns first five primes in order", () => {
    expect(primes(5)).toEqual([2, 3, 5, 7, 11]);
  });
});

describe("doubler", () => {
  let array;

  beforeEach(() => {
    array = [1, 2, 3]
  });

  it("doubles the elements of the array", () => {
    expect(doubler(array)).toEqual([2, 4, 6]);
  });

  it("does not modify the original array", () => {
    const dupArray = array.slice(0);
    doubler(array);

    expect(array).toEqual(dupArray);
  });
});

describe("myFind", () => {
  let arr, spy;
  beforeEach(() => {
    arr = [1, 2, 3];
    spy = {
      callback: (el) => false
    };

    spyOn(Array.prototype, 'find');
  });

  afterEach(() => {
    expect(Array.prototype.find).not.toHaveBeenCalled();
  });

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");

    myFind(arr, spy.callback);

    expect(spy.callback).toHaveBeenCalled();
  });

  it("returns an element for which the callback is true", () => {
    expect(myFind([1,2,3], el => el > 2)).toEqual(3);
  });

  it("returns undefined if the callback never returns true", () => {
    expect(myFind([1,2,3], el => el > 4)).toEqual(undefined);
  });

  it("returns the only the first applicable element", () => {
    expect(myFind([1,2,3], el => el > 1)).toEqual(2);
  });
});

describe("Array.prototype.twoSum", () => {
  it("returns positions of pairs of numbers that add to zero", () => {
    expect([5, 1, -7, -5].twoSum()).toEqual([[0, 3]]);
  });

  it("finds multiple pairs", () => {
    expect([5, -1, -5, 1].twoSum()).toEqual([[0, 2], [1, 3]]);
  });

  it("finds pairs with same element", () => {
    expect([5, -5, -5].twoSum()).toEqual([[0, 1], [0, 2]]);
  });

  it("returns [] when no pair is found", () => {
    expect([5, 5, 3, 1].twoSum()).toEqual([]);
  });

  it("won't find spurious zero pairs", () => {
    expect([0, 1, 2, 3].twoSum()).toEqual([]);
  });

  it("will find real zero pairs", () => {
    expect([0, 1, 2, 0].twoSum()).toEqual([[0, 3]]);
  });
});

describe("myReverse", () => {
  beforeEach(() => {
    spyOn(Array.prototype, 'reverse').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.reverse).not.toHaveBeenCalled();
  });

  it("Works on an empty array", () => {
    expect(myReverse([])).toEqual([]);
  });

  it("Works on a single element array", () => {
    expect(myReverse(["a"])).toEqual(["a"]);
  });

  it("Reverses an array", () => {
    const a = ["a", "b", "c"];
    expect(myReverse(a)).toEqual(["c", "b", "a"]);
  });

  it("Doesn't mutate the original array", () => {
    const a = ["a", "b", "c"];
    myReverse(a);
    expect(a).toEqual(["a","b","c"]);
  });
});

describe("Array.prototype.median", () => {
  it("returns null for the empty array", () => {
    expect([].median()).toBe(null);
  });

  it("returns the element for an array of length 1", () => {
    expect([1].median()).toEqual(1);
  });

  it("returns the median of an odd-length array", () => {
    expect([3, 2, 6, 7, 1].median()).toEqual(3);
  });

  it("returns the median of an even-length array", () => {
    expect([3, 2, 6, 7].median()).toEqual(4.5);
  });
});

describe("Array.prototype.dups", () => {
  it("solves a simple example", () => {
    expect([1, 3, 0, 1].dups()).toEqual({ 1: [0, 3] });
  });

  it("finds two dups", () => {
    expect([1, 3, 0, 3, 1].dups()).toEqual({ 1: [0, 4], 3: [1, 3] });
  });

  it("finds multi-dups", () => {
    expect([1, 3, 4, 3, 0, 3].dups()).toEqual({ 3: [1, 3, 5] });
  });

  it("returns {} when no dups found", () => {
    expect([1, 3, 4, 5].dups()).toEqual({});
  });
});

describe("transpose", () => {
  it("should transpose a small square matrix", () => {
    const smallArr = [
      [1, 2],
      [3, 4]
    ];

    expect(transpose(smallArr)).toEqual([
      [1, 3],
      [2, 4]
    ]);
  });

  it("should transpose a larger square matrix", () => {
    const arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(transpose(arr)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]);
  });


  it("should transpose a horizontal rectangular matrix", () => {
    const rectArr = [
      [1, 2, 3],
      [4, 5, 6]
    ];

    expect(transpose(rectArr)).toEqual([
      [1, 4],
      [2, 5],
      [3, 6]
    ]);
  });

  it("should transpose a vertical rectangular matrix", () => {
    const rectArr = [
      [1, 2],
      [3, 4],
      [5, 6]
    ];

    expect(transpose(rectArr)).toEqual([
      [1, 3, 5],
      [2, 4, 6]
    ]);
  });

  it("should not modify the original array", () => {
    const arr = [
      [1, 2],
      [3, 4]
    ];

    transpose(arr);
    expect(arr).toEqual([
      [1, 2],
      [3, 4]
    ]);
  });
});

describe("String.prototype.mySlice", () => {
  beforeEach(() => {
    spyOn(String.prototype, 'slice').and.callThrough();
    spyOn(String.prototype, 'substring').and.callThrough();
    spyOn(String.prototype, 'substr').and.callThrough();
  });

  afterEach(() => {
    expect(String.prototype.slice).not.toHaveBeenCalled();
    expect(String.prototype.substring).not.toHaveBeenCalled();
    expect(String.prototype.substr).not.toHaveBeenCalled();
  });

  it("slices the string from the start index to the end index", () => {
    expect("abcd".mySlice(0, 2)).toEqual("ab");
  });

  it("slices to the end of the string when no second argument is passed", () => {
    expect("foobar".mySlice(3)).toEqual("bar");
  });

  it("returns an empty string when the first argument is higher", () => {
    expect("empty!".mySlice(1, 0)).toEqual("");
  });

  it("slices to the end of the string when the end index is greater than the string's length", () => {
    expect("super long string".mySlice(0, 200)).toEqual("super long string");
  });
});

describe("myJoin", () => {
  beforeEach(() => {
    spyOn(Array.prototype, 'join').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.join).not.toHaveBeenCalled();
  });

  it("returns an empty string for an empty array", () => {
    const empty = [];
    expect(empty.myJoin()).toEqual("");
  });

  it("joins an array with an empty string if no argument is passed", () => {
    const a = ['a', 'b', 'c', 'd'];
    expect(a.myJoin()).toEqual("abcd");
  });

  it("joins an array with argument if an argument is passed", () => {
    const a = ['a', 'b', 'c', 'd'];
    expect(a.myJoin("$")).toEqual("a$b$c$d");
  });
});

describe("Array.prototype.myRotate", () => {
  let a;

  beforeEach(() => {
    a = ["a", "b", "c", "d"];
  })

  it("Rotates the elements 1 position if no argument is passed in", () => {
    expect(a.myRotate()).toEqual(["b", "c", "d", "a"]);
  });

  it("Rotates the elements correctly if an argument is passed in", () => {
    expect(a.myRotate(2)).toEqual(["c", "d", "a", "b"]);
  });

  it("Rotates the elements correctly if a negative argument is passed in", () => {
    expect(a.myRotate(-3)).toEqual(["b", "c", "d", "a"]);
  });

  it("Rotates the elements correctly for a large argument", () => {
    expect(a.myRotate(15)).toEqual(["d", "a", "b", "c"]);
  });
});

describe("Function.prototype.myCurry", () => {
  it("if numArgs is 1, should call function first time the curried function is invoked with an argument", () => {
    const echo = function (arg) {
      return arg;
    };

    const first = echo.myCurry(1);
    expect(first("one")).toMatch(/one/);
  });

  it("curries arguments and calls function after called with total num args", () => {
    const dubs = function (a, b, c) {
      return (a + b + c) * 2;
    };

    const curriedSum = dubs.myCurry(3);
    const result = curriedSum(1)(2)(3);
    expect(result).toEqual(12);
  });

  it("should return itself if there are too few arguments", () => {
    const threeSum = function (x, y, z) {
      return x + y + z;
    };

    const myCurryResult = threeSum.myCurry(3)(1)(2);
    expect(myCurryResult).not.toEqual(6);
    expect(typeof (myCurryResult)).toEqual("function");
  });
});

describe("Function.prototype.myApply", () => {
  let Cat;
  let sally, markov, curie;

  beforeEach(() => {
    Cat = function Cat(name) {
      this.name = name;
    };

    Cat.prototype.sayHello = function () {
      return this.name + " says hello!";
    };

    Cat.prototype.greetOne = function (otherCat) {
      return this.name + " says hello to " + otherCat.name;
    };

    Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
      return this.name + " says hello to " + otherCat1.name + " and " +
        otherCat2.name;
    };

    sally = new Cat("Sally");
    markov = new Cat("Markov");
    curie = new Cat("Curie");
  });

  afterEach(() => {
    const stringifiedFn = Function.prototype.myApply.toString();
    expect(stringifiedFn.includes("call"))
      .toBeFalsy('Function.prototype.call not allowed (spec will fail even if it is commented out)');
    expect(stringifiedFn.includes("apply"))
      .toBeFalsy('Function.prototype.apply not allowed (spec will fail even if it is commented out)');
  });

  it("invokes the function it is called on", () => {
    expect(sally.greetOne.myApply(sally, [markov])).toEqual("Sally says hello to Markov");
  });

  it("can take any number of arguments", () => {
    expect(sally.greetTwo.myApply(sally, [markov, curie]))
      .toEqual("Sally says hello to Markov and Curie");
  });

  it("should call the function method style on the context", () => {
    expect(sally.sayHello.myApply(markov)).toEqual("Markov says hello!");
  });
});

describe("Function.prototype.myBind", () => {
  let Cat;
  let sally, markov, curie;

  beforeEach(() => {
    Cat = function Cat(name) {
      this.name = name;
    };

    Cat.prototype.sayHello = function () {
      return this.name + " says hello!";
    };

    Cat.prototype.greetOne = function (otherCat) {
      return this.name + " says hello to " + otherCat.name;
    };

    Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
      return this.name + " says hello to " + otherCat1.name + " and " +
        otherCat2.name;
    };

    sally = new Cat("Sally");
    markov = new Cat("Markov");
    curie = new Cat("Curie");
  });

  afterEach(() => {
    expect(Function.prototype.myBind.toString().includes("=>"))
      .toBeFalsy('Fat arrow function not allowed (this spec will fail even if it is commented out)');  
  });
  
  it("sets the context and returns a function which can be called function style", () => {
    spyOn(Cat.prototype.sayHello, 'bind');
    expect(sally.sayHello.myBind(sally)()).toEqual("Sally says hello!");
    expect(Cat.prototype.sayHello.bind).not.toHaveBeenCalled();
  });

  it("should pass in bind-time argument to the method", () => {
    spyOn(Cat.prototype.greetOne, 'bind');
    expect(sally.greetOne.myBind(sally, markov)())
      .toEqual("Sally says hello to Markov");
    expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
  });

  it("should pass in two bind-time arguments to the method", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally, markov, curie)())
      .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("takes multiple call-time arguments", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally)(markov, curie))
      .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("should combine bind-time and call-time arguments", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally, markov)(curie))
      .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("doesn't pass the call-time arguments to future calls", () => {
    spyOn(Cat.prototype.greetOne, 'bind');
    const boundFn = sally.greetOne.myBind(sally);
    expect(boundFn(markov)).toEqual("Sally says hello to Markov");
    expect(boundFn(curie)).toEqual("Sally says hello to Curie");
    expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
  });
});

describe("Function.prototype.myCall", () => {
  let Cat;
  let sally, markov, curie;

  beforeEach(() => {
    Cat = function Cat(name) {
      this.name = name;
    };

    Cat.prototype.sayHello = function () {
      return this.name + " says hello!";
    };

    Cat.prototype.greetOne = function (otherCat) {
      return this.name + " says hello to " + otherCat.name;
    };

    Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
      return this.name + " says hello to " + otherCat1.name + " and " +
        otherCat2.name;
    };

    sally = new Cat("Sally");
    markov = new Cat("Markov");
    curie = new Cat("Curie");
  });

  afterEach(() => {
    const stringifiedFn = Function.prototype.myCall.toString();
    expect(stringifiedFn.includes("call"))
      .toBeFalsy('Function.prototype.call not allowed (spec will fail even if it is commented out)');
    expect(stringifiedFn.includes("apply"))
      .toBeFalsy('Function.prototype.apply not allowed (spec will fail even if it is commented out)');
  });

  it("invokes the function it is called on", () => {
    expect(sally.greetOne.myCall(sally, markov)).toEqual("Sally says hello to Markov");
  });

  it("can take any number of arguments", () => {
    expect(sally.greetTwo.myCall(sally, markov, curie))
      .toEqual("Sally says hello to Markov and Curie");
  });

  it("should call the function method style on the context", () => {
    expect(sally.sayHello.myCall(markov)).toEqual("Markov says hello!");
  });
});

describe("Function.prototype.inherits", () => {
  let Animal;
  let Dog;
  let dog;

  beforeEach(() => {
    spyOn(Object, 'create').and.callThrough();
    spyOn(Object, 'assign').and.callThrough();
    spyOn(Object, 'setPrototypeOf').and.callThrough();
    
    Animal = function() {
      this.name = "Yogi";
    };

    Animal.prototype.makeNoise = function() { return "Hi!"; };

    Dog = function() {
      this.age = 7;
    };

    Dog.inherits(Animal);
    Dog.prototype.bark = function() { return "Woof!"; };
    dog = new Dog();
  });

  afterEach(() => {
    expect(Object.create).not.toHaveBeenCalled();
    expect(Object.assign).not.toHaveBeenCalled();
    expect(Object.setPrototypeOf).not.toHaveBeenCalled();
    expect(Function.prototype.inherits.toString().includes("__proto__"))
      .toBeFalsy('Do not modify the __proto__ property directly (this spec will fail even if it is commented out)');  
  });

  it("should properly set up the prototype chain between a child and parent", () => {
    expect(dog.bark()).toBe("Woof!");
    expect(dog.makeNoise()).toBe("Hi!");
  });

  it("should not call the parent's constructor function", () => {
    expect(dog.name).toBeUndefined();
  });

  it("should maintain separation of parent and child prototypes", () => {
    Dog.prototype.someProperty = 42;
    const animal = new Animal();
    expect(animal.someProperty).toBeUndefined();
    expect(animal.makeNoise()).toBe("Hi!");
  });

  it("should properly work for longer inheritance chains", () => {
    const Poodle = function () { this.name = "Bill"; };
    Poodle.inherits(Dog);
    Poodle.prototype.shave = function() { return "Brrr."; };
    const poodle = new Poodle();
    
    expect(poodle.name).toBe("Bill");
    expect(poodle.shave()).toBe("Brrr.");
    expect(poodle.makeNoise()).toBe("Hi!");
    expect(poodle.bark()).toBe("Woof!");
  });

  it("should set the child's constructor function back to the child", () => {
    expect(dog.constructor.name).toBe("Dog");
  });
});

describe('Array.prototype.myFilter', () => {
  let originalArray;
  const spy = {
    callback: (el) => { return true }
  }

  // it does not call forEach or filter (setup)
  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'filter').and.callThrough();
  });

  // it does not call forEach or filter (verification)
  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.filter).not.toHaveBeenCalled();
  });

  const isEven = function (num) { return num % 2 === 0; };

  const isLessThanThree = function (num) { return num < 3; };

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myFilter(spy.callback);
    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myFilter(spy.callback);
    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
    expect(spy.callback).toHaveBeenCalledWith(3);
  });

  it("calls the Array.prototype.myEach method", () => {
    originalArray = [1, 2, 3];
    spyOn(originalArray, "myEach");
    originalArray.myFilter(spy.callback);
    expect(originalArray.myEach).toHaveBeenCalled();
  });

  it("returns an array of filtered items", () => {
    const testArray = [1, 2, 3, 4, 5];
    expect(testArray.myFilter(isEven)).toEqual([2, 4]);
    expect(testArray.myFilter(isLessThanThree)).toEqual([1, 2]);
  });

  it("does not modify the original array", () => {
    originalArray = [1, 2, 3];
    originalArray.myFilter(isEven);
    expect(originalArray).toEqual([1, 2, 3]);
  });
});

describe('Array.prototype.myReduce', () => {
  let myArray;
  const noOp = (accum, el) => accum;

  const spy = {
    sum: (accum, el) => accum + el
  };

  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'reduce').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.reduce).not.toHaveBeenCalled();
  });

  it("calls the callback, passing in the accumulator and each element", () => {
    myArray = [1, 2, 3];
    spyOn(spy, "sum").and.callThrough();

    myArray.myReduce(spy.sum);

    expect(spy.sum).toHaveBeenCalledWith(1, 2);
    expect(spy.sum).toHaveBeenCalledWith(3, 3);
  });

  it("works with a sum callback", () => {
    myArray = [1, 2, 3, 4];
    expect(myArray.myReduce(spy.sum)).toEqual(10);
  });

  it("works with a multiplier callback", () => {
    myArray = [4, 4, 4];
    const times = (accum, el) => accum * el;

    expect(myArray.myReduce(times)).toEqual(64);
  });

  it("uses the given argument as the initial accumulator", () => {
    myArray = [1, 2, 3, 4];
    expect(myArray.myReduce(noOp, 5)).toEqual(5);
  });

  it("uses the first item as the accumulator if none is given", () => {
    myArray = [1, 2, 3, 4];
    expect(myArray.myReduce(noOp)).toEqual(1);
  });

  it("calls the Array.prototype.myEach method", () => {
    myArray = [1, 2, 3];
    spyOn(Array.prototype, "myEach");
    myArray.myReduce(spy.sum);
    expect(Array.prototype.myEach).toHaveBeenCalled();
  });
});

describe('Array.prototype.mySome', () => {
  let a;
  const spy = {
    callback: x => x > 1
  }

  beforeEach(() => {
    a = [1, 2, 3];
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, "some").and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.some).not.toHaveBeenCalled();
  });

  it("returns true if any element matches the callback", () => {
    expect(a.mySome(spy.callback)).toBe(true);
  });

  it("returns false if no elements match the callback", () => {
    const callback = x => x === 4;
    expect(a.mySome(callback)).toBe(false);
  });

  it("calls the Array.prototype.myEach method", () => {
    spyOn(a, "myEach");
    a.mySome(spy.callback);
    expect(a.myEach).toHaveBeenCalled();
  });
});

describe('Array.prototype.myReject', () => {
  let a;
  const spy = {
    callback: x => x > 1
  }

  beforeEach(() => {
    a = [1, 2, 3];
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'filter').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.filter).not.toHaveBeenCalled();
  });

  it('returns elements that do not match the passed in block', () => {
    expect(a.myReject(spy.callback)).toEqual([1]);
  });

  it('returns all elements if no elements match the block', () => {
    const callback = x => x === 4;
    expect(a.myReject(callback)).toEqual([1, 2, 3]);
  });

  it('returns an empty array if all elements match the block', () => {
    const callback = x => x < 4;
    expect(a.myReject(callback)).toEqual([]);
  });

  it("calls the Array.prototype.myEach method", () => {
    spyOn(a, "myEach");
    a.myReject(spy.callback);
    expect(a.myEach).toHaveBeenCalled();
  });
});

describe('Array.prototype.myEvery', () => {
  let arr;
  const spy = {
    callback: x => x % 2 === 0
  }

  beforeEach(() => {
    arr = [2, 4, 6];
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'every').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.every).not.toHaveBeenCalled();
  });

  it("returns true if all elements match the block", () => {
    expect(arr.myEvery(spy.callback)).toBe(true);
  });

  it("returns false if not all elements match the block", () => {
    const callback = x => x % 3 === 0;
    expect(arr.myEvery(callback)).toBe(false);
  });

  it("calls the Array.prototype.myEach method", () => {
    spyOn(arr, "myEach");
    arr.myEvery(spy.callback);
    expect(arr.myEach).toHaveBeenCalled();
  });
});

describe("Array.prototype.myEach", () => {
  let originalArray;
  let testArray;
  let result;
  const spy = {
    callback: (el) => { return el + 1; }
  };

  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
  });

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myEach(spy.callback);
    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback and has no return value", () => {
    spyOn(spy, "callback");
    result = [1, 2].myEach(spy.callback);
    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
    expect(result).toBeUndefined();
  });

  it("does not modify the original array", () => {
    originalArray = ["original array"];
    testArray = ["original array"];
    testArray.myEach(spy.callback);
    expect(testArray).toEqual(originalArray);
  });
});

