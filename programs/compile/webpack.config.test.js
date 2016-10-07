const createWebpackConfig = require("./webpack.config")

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

  describe("entry and output options", () => {
    describe("if set", () => {
      let config

      beforeEach(() => {
        config = createWebpackConfig([], {
          entry: "foo",
          output: {
            path: "bar",
            filename: "baz"
          },
          outputCss: "foo/bar.css"
        }).build()
      })

      it("should set the entry", () => {
        expect(config.entry).toEqual(["foo"])
      })

      it("should set the javascript output", () => {
        expect(config.output).toEqual({ path: "bar", filename: "baz" })
      })

      it("should set the css output", () => {
        expect(config.plugins[0].filename).toEqual("foo/bar.css")
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
        config = createWebpackConfig([], {
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
      const config = createWebpackConfig([], {
        alias: {
          foo: "bar"
        }
      }).build()

      expect(config.resolve.alias).toEqual({ foo: "bar" })
    })
  })

  describe("exclude option", () => {
    it("should be default value if not set", () => {
      const configBuilder = createWebpackConfig()
      expect(configBuilder.config.module.loaders.babel.exclude).toEqual(/node_modules/)
    })

    it("should be changed if passed", () => {
      const configBuilder = createWebpackConfig([], { exclude: "foo" })
      expect(configBuilder.config.module.loaders.babel.exclude).toEqual("foo")
    })
  })

  describe("externals option", () => {
    it("should be empty object if not set in javascript-env.js config", () => {
      const config = createWebpackConfig().build()

      expect(config.externals).toEqual({})
    })

    it("should be present if set", () => {
      const config = createWebpackConfig([], {
        externals: {
          foo: "bar"
        }
      }).build()

      expect(config.externals).toEqual({ foo: "bar" })
    })
  })

  describe("target option", () => {
    it("should be default if not set", () => {
      const config = createWebpackConfig().build()

      expect(config.target).toEqual("web")
    })

    it("should be set if present in config", () => {
      const config = createWebpackConfig([], {
        target: "foo"
      }).build()

      expect(config.target).toEqual("foo")
    })

    it("should set node options when present in config", () => {
      const config = createWebpackConfig([], {
        target: "node"
      }).build()

      expect(config.node).toEqual({
        __dirname: false
      })
    })
  })

  describe("should handle development and production stylesheet handling", () => {
    it("should default to production scss", () => {
      const config = createWebpackConfig().build()
      expect(config.module.loaders[0].loaders)
        .toEqual(["babel?presets[]=es2015-loose,presets[]=react,presets[]=stage-1"])
      expect(config.module.loaders[3].loader)
        .toContain("extract-text-webpack-plugin/loader.js")
    })

    it("should work with dev-server flag", () => {
      const config = createWebpackConfig(["--dev-server"]).build()
      expect(config.module.loaders[0].loaders)
        .toEqual(["react-hot",
                  "babel?presets[]=es2015-loose,presets[]=react,presets[]=stage-1"])
      expect(config.module.loaders[3].loaders)
        .toEqual(["style",
                  "css?modules&localIdentName=[local]---[hash:base64:5]&sourceMap",
                  "postcss",
                  "sass"])
    })
  })
})
