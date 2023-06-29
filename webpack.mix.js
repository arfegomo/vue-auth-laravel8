const mix = require('laravel-mix');

mix.js('resources/js/app.js','public/js').vue();

mix.combine(['resources/assets/js/jsvalidator.js'], 'public/js/custom.js');

mix.combine(['resources/assets/css/custom.css'], 'public/css/custom.css');
