'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const brandConfig = require('./configs/brandConfig');
app.use(express.static('dist'));
app.use('/fonts', express.static('src/fonts'));
app.use('/media', express.static('media'));
app.use('/media/shared', express.static('media/shared'));

var hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: 'views/partials/',
    layoutsDir: 'views/layouts/',
    extname: '.hbs',
    helpers: {
        theme: (data) => {
            // Get brand specific config
            return brandConfig[3000][data.hash.code];
        },
        stringReplace: (data) => {
            return data.replace(/\s+/g, '-').replace('&', 'and').toLowerCase();
        },
        ifeq: (a, b, options) => {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        ifGreater: (a, b, options) => {
            if (a > b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        ifSetOrDefault: (a, b) => {
            if (!a) {
                return b;
            }
            return a;
        },
        formatCurrency: (amount, currency) => {
            currency = currency || '£';
            if (amount) {
                return currency + amount.toFixed(2);
            }
            return currency + amount.toFixed(2);
        },
        times: (n, block) => {
            var accum = '';
            for (var i = 0; i < n; ++i) {
                accum += block.fn(i);
            }
            return accum;
        }
    }
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
});

app.get('/', (req, res) => {
    res.render('home', {});
});

app.get('/style-guide', (req, res) => {
    res.render('pages/styleGuide', {});
});

app.get('/product-list-page', (req, res) => {
    res.render('pages/productListPage', {});
});

app.get('/product-display-page', (req, res) => {
    res.render('pages/productDisplayPage', {});
});

app.listen(process.env.PORT, () => {
    console.log(`Mamas and papas is running on localhost:${process.env.PORT}, go do something amazing!`);
});
