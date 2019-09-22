const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer') // prefixex
const cleanCSS = require('gulp-clean-css') // minify css
const concat = require('gulp-concat') // unit files
const uglify = require('gulp-uglify') // minify js
const del = require('del') // delete all in production folder
const sass = require('gulp-sass') // scss sass
const babel = require('gulp-babel')

// sources
const paths = {
    styles: {
        src: {
            custom: './dev/scss/**/*.scss',
            // cab: './dev/cab/scss/*.scss',
            other: [
                './node_modules/normalize.css/normalize.css'
                // './node_modules/bootstrap/dist/css/bootstrap.css'
            ]
        },
        dist: './dist/css'
    },
    // CabScripts: {
    //     src: {
    //         custom: './dev/cab/js/**/*.js'
    //     },
    //     dist: './dist/cab/js',
    // },
    MainScripts: {
        src: {
            custom: './dev/js/**/*.js',
            other: [
                // './node_modules/vue/dist/vue.js',
                './node_modules/jquery/dist/jquery.js',
                // './node_modules/vue-infinite-loading/dist/vue-infinite-loading.js'
            ]
        },
        dist: './dist/js',
    },
    production: './dist/'
    // CabDist: './dist/cab'
}

sass.compiler = require('node-sass');

// styles custom optimize
function customStyles() {
    return gulp.src(paths.styles.src.custom)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 0.1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist))
}

// cab styles custom optimize
// function CabStyles() {
//     return gulp.src(paths.styles.src.cab)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(concat('style.css'))
//         .pipe(autoprefixer({ overrideBrowserslist: ['> 0.1%'], cascade: false }))
//         .pipe(cleanCSS({ level: 2 }))
//         .pipe(gulp.dest(paths.CabDist))
// }

// styles libs optimize
function staticStyles() {
    return gulp.src(paths.styles.src.other)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist))
}

// scripts cab admin panel optimize
// function CabScripts() {
//     return gulp.src(paths.CabScripts.src.custom)
//         .pipe(concat('script.js'))
//         // .pipe(babel({
//         //     presets: ['@babel/env']
//         // }))
//         // .pipe(uglify({ toplevel: true }))
//         .pipe(gulp.dest(paths.CabScripts.dist))  
// }

// scripts custom optimize
function MainScripts() {
    return gulp.src(paths.MainScripts.src.custom)
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({ toplevel: true }))
        .pipe(gulp.dest(paths.MainScripts.dist))
}

// scripts libs optimize
function StaticScripts() {
    return gulp.src(paths.MainScripts.src.other)
        .pipe(gulp.dest(paths.MainScripts.dist))
}

// watchin' onchange
function watch() {
    gulp.watch(paths.styles.src.custom, customStyles)
    // gulp.watch(paths.styles.src.cab, CabStyles)
    // gulp.watch(paths.CabScripts.src.custom, CabScripts)
    gulp.watch(paths.MainScripts.src.custom, MainScripts)
    gulp.watch(paths.MainScripts.src.other, StaticScripts)
}

function fuckProduction(){
    return del([paths.production + '*'])
}

gulp.task('styles', customStyles)
// gulp.task('styles', CabStyles)
gulp.task('StaticScripts', StaticScripts)
// gulp.task('CabScripts', CabScripts)
// gulp.task('MainScripts', MainScripts)
// gulp.task('images', images)
gulp.task('watch', watch)

gulp.task('build', gulp.series(fuckProduction, gulp.parallel(customStyles, staticStyles, MainScripts, StaticScripts)))
gulp.task('default', gulp.series('build', 'watch'))
