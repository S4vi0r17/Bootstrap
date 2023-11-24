const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Images
const imagemin = require('gulp-imagemin');

function css(done) {
    // Identificar el archivo
    src('./src/scss/app.scss')

        // Compilar el archivo
        .pipe(sass())

        // Guardar el archivo compilado
        .pipe(dest('./build/css'))

    done();
}

function dev() {
    watch('./src/scss/**/*.scss', css); // ** = Todos los archivos con esa extensión en esa carpeta y en las subcarpetas
}

function images() {
    return src('./src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 })) // 0 (sin optimización) a 7 (máxima optimización)
        .pipe(dest('./build/img'))
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.default = series(images, css, dev);