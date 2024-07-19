require('sucrase/register'); // subset of babel
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const { engine } = require('express-handlebars');
const jsxEngine = require('./lib/react-server');

const dataController = require('./controller/data-controller');
const { handleError } = require('./error/errors');

const app = express();
app.engine('.jsx', jsxEngine);
app.engine(
  'handlebars',
  engine({ layoutsDir: path.join(app.settings.views, 'handlebars', 'layouts') })
);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('start');
});

/*
 * START HERE FOR JSX TEMPLATING
 */
app.get('/jsx', (req, res) => {
  const templateData = {
    pageTitle: 'Home',
    content: 'Hello World!',
  };

  res.render('jsx/Main.jsx', templateData);
});
/*
 * END JSX TEMPLATING
 */

/*
 * START HERE FOR HANDLEBARS TEMPLATING
 */

app.get('/handlebars', async (req, res) => {
  try {
    const templateData = await dataController.getMarketData(res);
    res.render('handlebars/home', templateData);
  } catch (error) {
    handleError(error, res);
  }
});
/*
 * END HANDLEBARS TEMPLATING
 */

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
}

// Export the app so that we can test it in `test/app.spec.js`
module.exports = app;
