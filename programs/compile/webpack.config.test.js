const createWebpackConfig = require("./webpack.config")
const webpack = require("webpack")

describe("createWebpackConfig()", () => {
  describe("with no options", () => {
    it("should include all loaders as an an object", () => {
      const configBuilder = createWebpackConfig()
      const rules = configBuilder.config.module.rules

      expect(rules instanceof Object).toEqual(true)
      expect(Object.keys(rules)).toEqual(["babel", "json", "svg", "sass"])
    })

    it("should convert the loaders to an array when built", () => {
      const config = createWebpackConfig().build()
      expect(config.module.rules instanceof Array).toEqual(true)
    })

    it("should return a config with the all loaders included", () => {
      const config = createWebpackConfig().build()
      expect(config.module.rules.length).toEqual(4)
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
        expect(config.entry).toEqual({ main: ["babel-polyfill", "foo"] })
      })

      it("should set the javascript output", () => {
        expect(config.output).toEqual({ path: "bar", filename: "baz" })
      })

      it("should set the css output", () => {
        expect(config.plugins[1].filename).toEqual("foo/bar.css")
      })
    })

    describe("if not set", () => {
      it("should just include the default", () => {
        const config = createWebpackConfig().build()
        expect(config.entry).toEqual(["babel-polyfill"])
      })

      it("should not set output", () => {
        const config = createWebpackConfig().build()
        expect(config.output).toBeUndefined()
      })
    })
  })

  describe("include option", () => {
    describe("if set", () => {
      let builder

      beforeEach(() => {
        builder = createWebpackConfig([], {
          includes: ["foo"]
        })
      })

      it("should be present in the modules", () => {
        const config = builder.build()
        expect(config.resolve.modules).toEqual(["foo"])
      })

      it("should be present in the sass loader config", () => {
        const loader = builder.config.module.rules.sass.loader
        expect(loader.pop().query.includePaths).toEqual(["foo"])
      })
    })

    describe("if not set", () => {
      it("should not be present in the modules", () => {
        const config = createWebpackConfig().build()
        expect(config.resolve.modules).toBeUndefined()
      })

      it("should not be present in sassLoader", () => {
        const builder = createWebpackConfig()
        const loader = builder.config.module.rules.sass.loader
        expect(loader.pop().query.includePaths).not.toEqual(["foo"])
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
      expect(configBuilder.config.module.rules.babel.exclude).toEqual(/node_modules/)
    })

    it("should be changed if passed", () => {
      const configBuilder = createWebpackConfig([], { exclude: "foo" })
      expect(configBuilder.config.module.rules.babel.exclude).toEqual("foo")
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

      expect(config.module.rules[0].use[0].options)
        .toEqual({ presets: [["es2015", { loose: true, modules: false }], "react", "stage-1"], plugins: [] })

      expect(config.module.rules[3].loader[0].loader)
        .toContain("extract-text-webpack-plugin/loader.js")
    })

    it("should work with dev-server flag", () => {
      const config = createWebpackConfig(["--dev-server"]).build()

      expect(config.module.rules[0].use[0].options)
        .toEqual({
          presets: [["es2015", { loose: true, modules: false }], "react", "stage-1"],
          plugins: ["react-hot-loader/babel"]
        })
    })

    it("should work with coverage flag", () => {
      const config = createWebpackConfig(["--coverage"]).build()

      expect(config.module.rules[0].use[0].options)
        .toEqual({
          presets: [["es2015", { loose: true, modules: false }], "react", "stage-1"],
          plugins: [["__coverage__", { ignore: "*.test.js" }]]
        })
    })
  })

  describe("code splitting", () => {
    it("includes common chunk plugin", () => {
      const config = createWebpackConfig(["--production"], {
        vendor: ["foo", "bar"],
        output: "bundle.js",
        entry: "main.js"
      }).build()
      const chunkPlugin = config.plugins.find(p => p instanceof webpack.optimize.CommonsChunkPlugin)

      expect(chunkPlugin).toBeDefined()
      expect(config.entry).toEqual({
        main: ["babel-polyfill", "main.js"],
        vendor: ["foo", "bar"]
      })
      expect(chunkPlugin.chunkNames).toEqual(["vendor", "manifest"])
    })
  })
})
