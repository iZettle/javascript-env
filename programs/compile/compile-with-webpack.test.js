const compileWithWebpack = require("./compile-with-webpack")

describe("compile-with-webpack", () => {
  describe("when run as a module", () => {
    it("should return Webpack config", () => {
      const testData = { target: "node" }
      const returned = compileWithWebpack(testData, "--return-config")

      expect(returned instanceof Object).toEqual(true)
      expect(returned.target).toEqual(testData.target)
    })
  })
})
