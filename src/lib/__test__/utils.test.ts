import { deepCopy } from "../utils";

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
