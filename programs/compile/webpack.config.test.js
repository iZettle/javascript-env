import createWebpackConfig from "./webpack.config"

describe("createWebpackConfig()", () => {
  describe("generic", () => {
    it("should include all loaders as an an object", () => {
      const configBuilder = createWebpackConfig()
      const loaders = configBuilder.config.module.loaders

      expect(loaders instanceof Object).toEqual(true)
      expect(Object.keys(loaders)).toEqual(["babel", "json", "raw", "sass"])
    })

    it("should convert the loaders to an array when built", () => {
      const config = createWebpackConfig().build()
      expect(config.module.loaders instanceof Array).toEqual(true)
    })

    it("should return a config with the all loaders included", () => {
      const config = createWebpackConfig().build()
      expect(config.module.loaders.length).toEqual(4)
    })
  })

  describe("when source and output are passed", () => {
    let config

    beforeEach(() => {
      config = createWebpackConfig({
        source: "foo",
        output: "bar"
      }).build()
    })

    it("should set source as the entry", () => {
      expect(config.entry).toEqual(["foo"])
    })

    it("should set output as the output path", () => {
      expect(config.output.path).toEqual("bar")
    })

    it("should set default set a default bundle filename", () => {
      expect(config.output.filename).toEqual("bundle.js")
    })
  })

  describe("when the include option is passed", () => {
    let config

    beforeEach(() => {
      config = createWebpackConfig({
        includes: ["foo"]
      }).build()
    })

    it("should be present in the moduleDirectories", () => {
      expect(config.resolve.modulesDirectories).toEqual(["foo"])
    })

    it("should be present in the sass loader config", () => {
      expect(config.sassLoader.includePaths).toEqual(["foo"])
    })
  })

  describe("when an alias is passed", () => {
    it("should be present as an alias", () => {
      const config = createWebpackConfig({
        alias: {
          foo: "bar"
        }
      }).build()

      expect(config.resolve.alias).toEqual({ foo: "bar" })
    })
  })
})
