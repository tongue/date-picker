import { deepmerge } from "./utils";

describe("deepmerge", () => {
  it("should behave like Object.assign on the top level", () => {
    const obj1 = { a: { a1: "A1" }, c: "C" };
    const obj2 = { a: undefined, b: { b1: "B1" } };
    expect(deepmerge(obj1, obj2)).toEqual(Object.assign({}, obj1, obj2));
  });
  it("should not merge array values, just override", () => {
    const obj1 = { a: ["A", "B"], c: { c1: "E", c2: ["Z"] } };
    const obj2 = { a: ["C"], b: ["D"], c: { c2: ["Y"] } };
    expect(deepmerge(obj1, obj2)).toEqual({
      a: ["C"],
      b: ["D"],
      c: { c1: "E", c2: ["Y"] },
    });
  });
  it("should not handle functions as objects", () => {
    const obj1 = { a: ["A", "B"], b: { b1: "C", b2: "D" } };
    const obj2 = {
      a: expect.anything(),
      b: {
        b1: expect.anything(),
      },
    };
    const obj3 = {
      a: expect.anything(),
      b: {
        b1: expect.anything(),
        b2: "D",
      },
    };
    expect(deepmerge(obj1, obj2)).toEqual(obj3);
  });
  it("should deep merge all objects", () => {
    const obj1 = {
      a: { a1: "A-1", a2: { a21: "A-2-1", a22: "A-2-2" } },
      c: "C",
      d: {},
      e: { e1: "E-1", e2: expect.anything(), e3: expect.anything() },
      f: { f1: "F-1", f2: "F-2" },
    };
    const obj2 = {
      a: { a2: { a21: "A-2-1-2" }, a3: "A-3" },
      b: { b1: "B-1" },
      d: null,
      e: { e1: expect.anything(), e2: { e22: "E-2-2" }, e3: expect.anything() },
      f: ["F-1", "F-2"],
      g: "G",
    };
    const obj3 = {
      a: { a1: "A-1", a2: { a21: "A-2-1-2", a22: "A-2-2" }, a3: "A-3" },
      b: { b1: "B-1" },
      c: "C",
      d: null,
      e: { e1: expect.anything(), e2: { e22: "E-2-2" }, e3: expect.anything() },
      f: ["F-1", "F-2"],
      g: "G",
    };
    expect(deepmerge(obj1, obj2)).toMatchObject(obj3);
  });
});
