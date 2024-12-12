export default {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
        browsers: ['last 2 versions', 'not dead', 'not ie 11']
      },
      modules: false,
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true,
      absoluteRuntime: false,
      version: '^7.24.0'
    }]
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' }
        }]
      ]
    },
    production: {
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: true,
          absoluteRuntime: false,
          version: '^7.24.0'
        }]
      ]
    }
  }
};