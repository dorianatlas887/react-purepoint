/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const compression = require('compression');
const axios = require('axios');
const Promise = require('bluebird');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const mimeTypes = require('mime-types');
const sitemap = require('./sitemap');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(path.join(process.cwd(), pkg.dllPlugin.path, filename));
    });
  }
  app.get('/api', (req, res) => {
    Promise.all([
      axios.get(`http://www.recipepuppy.com${req.url}&p=1`),
      axios.get(`http://www.recipepuppy.com${req.url}&p=2`),
    ])
      .then(data => {
        const recipes = data.map(result => result.data.results);
        res.json(recipes[0].concat(recipes[1]));
      })
      .catch(() => {
        res.sendStatus(204);
      });
  });
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  const isStaging = process.env.NODE_ENV === 'staging';
  app.use(
    require('prerender-node')
      .set('protocol', 'https')
      .set(
        'prerenderServiceUrl',
        isStaging ? 'http://staging.lift.co:3001' : 'http://lift.co:3001'
      )
  );
  app.use(compression());
  sitemap(app);

  app.use(
    publicPath,
    express.static(outputPath, {
      maxAge: '1m',
      setHeaders: (res, contentPath) => {
        // We never want to cache index.html or pace
        if (
          contentPath.includes('index.html') ||
          contentPath.includes('pace.min.js')
        ) {
          res.setHeader('Cache-Control', 'public, max-age=0');
        }
      },
    })
  );

  app.get('*', (req, res) => {
    const mimeType = mimeTypes.lookup(req.path);
    // If it's a static asset and reached this far, then it doesn't exists and we should return a hard 404
    if (mimeType) {
      res.status(404).end();
    } else {
      res.sendFile(path.resolve(outputPath, 'index.html'));
    }
  });
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
