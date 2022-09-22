const {src, dest, parallel, series, watch} = require('gulp'),
    browserSync = require('browser-sync').create(),
    fileInclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    rollup = require('gulp-better-rollup'),
    babel = require('rollup-plugin-babel'),
    resolve = require('rollup-plugin-node-resolve'),
    commonjs = require('rollup-plugin-commonjs'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    ghpages = require('gh-pages'),
    destFolder = require('path').basename(__dirname);

function browsersync() {
    browserSync.init({
        server: {baseDir: `${destFolder}/`},
        notify: false,
        online: true
    })
}

function startwatch() {
    watch('src/js/**/*.js', scriptsDev);
    watch('src/scss/**/*.scss', stylesDev);
    watch('src/images/**/*', images);
    watch('src/**/*.html', html);
}

function cleanDist() {
    return del(`${destFolder}`)
}

function html() {
    return src(['src/**/*.html', '!src/**/_*.html', '!src/components/*.html'])
        .pipe(fileInclude())
        .pipe(dest(`${destFolder}`))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('src/fonts/**/*')
        .pipe(dest(`${destFolder}/fonts`))
}

function scripts() {
    return src('src/js/*.js')
        .pipe(rollup({plugins: [babel(), resolve(), commonjs()]}, 'umd'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${destFolder}/js/`))
        .pipe(browserSync.stream())
}

function scriptsDev() {
    return src('src/js/*.js')
        .pipe(rollup({plugins: [babel(), resolve(), commonjs()]}, 'umd'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${destFolder}/js/`))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/scss/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(cleancss({level: {1: {specialComments: 0}}/* , format: 'beautify' */}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${destFolder}/css/`))
        .pipe(browserSync.stream())
}

function stylesDev() {
    return src('src/scss/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${destFolder}/css/`))
        .pipe(browserSync.stream())
}

function images() {
    return src('src/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimization: 0 // 0-7
        }))
        .pipe(dest(`${destFolder}/images/`))
        .pipe(browserSync.stream())
}

function deploy() {
    return ghpages.publish(destFolder, function (err) {
        console.log(err)
    });
}

exports.browsersync = browsersync;
exports.html = html;
exports.fonts = fonts;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.deploy = deploy;
exports.dev = series(cleanDist, parallel(fonts, images, scriptsDev, stylesDev, html), parallel(browsersync, startwatch));
exports.default = series(cleanDist, parallel(fonts, images, scripts, styles, html));