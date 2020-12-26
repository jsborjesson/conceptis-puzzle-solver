import { deepCopy, difference, intersection } from "../utils";

describe("deepCopy", () => {
  test("changing a copy does not alter original", () => {
    const original = [
      [1, 2],
      [3, 4],
    ];

    const copy = deepCopy(original);

    copy[0][0] = 100;

    expect(original[0][0]).toEqual(1);
  });
});

describe("difference", () => {
  test("returns difference between two arrays", () => {
    const a = [1, 2, 3];
    const b = [2, 3, 4];

    expect(difference(a, b)).toEqual([1]);
    expect(difference(b, a)).toEqual([4]);
  });
});

describe("intersection", () => {
  test("returns intersection between two arrays", () => {
    const a = [1, 2, 3];
    const b = [2, 3, 4];

    expect(intersection(a, b)).toEqual([2, 3]);
    expect(intersection(b, a)).toEqual([2, 3]);
  });
});
