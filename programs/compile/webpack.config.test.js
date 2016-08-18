import createWebpackConfig from "./webpack.config"

describe("createWebpackConfig()", () => {
  describe("with no options", () => {
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

  describe("source and output options", () => {
    describe("if set", () => {
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

      it("should set default the bundle filename", () => {
        expect(config.output.filename).toEqual("bundle.js")
      })
    })

    describe("if not set", () => {
      it("should not set the entry", () => {
        const config = createWebpackConfig().build()
        expect(config.entry).toBeUndefined()
      })

      it("should not set output", () => {
        const config = createWebpackConfig().build()
        expect(config.output).toBeUndefined()
      })
    })
  })

  describe("include option", () => {
    describe("if set", () => {
      let config

      beforeEach(() => {
        config = createWebpackConfig({
          includes: ["foo"]
        }).build()
      })

      it("should be present in the modulesDirectories", () => {
        expect(config.resolve.modulesDirectories).toEqual(["foo"])
      })

      it("should be present in the sass loader config", () => {
        expect(config.sassLoader.includePaths).toEqual(["foo"])
      })
    })

    describe("if not set", () => {
      it("should not be present in the modulesDirectories", () => {
        const config = createWebpackConfig().build()
        expect(config.resolve.modulesDirectories).toBeUndefined()
      })

      it("should not be present in sassLoader", () => {
        const config = createWebpackConfig().build()
        expect(config.sassLoader.includePaths).toBeUndefined()
      })
    })
  })

  describe("alias option", () => {
    it("should not be present if not passed", () => {
      const config = createWebpackConfig().build()
      expect(config.resolve.alias).toBeUndefined()
    })

    it("should be present as an alias if present", () => {
      const config = createWebpackConfig({
        alias: {
          foo: "bar"
        }
      }).build()

      expect(config.resolve.alias).toEqual({ foo: "bar" })
    })
  })
})
