const compileWithWebpack = require("./compile-with-webpack")

describe("compileWithWebpack()", () => {
  it("should throw an error in no webpack config is passed", () => {
    expect(compileWithWebpack).toThrow(new Error("No webpack config passed"))
  })
})

