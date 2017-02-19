var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

const less = require('gulp-less');
const path = require('path');

const postcss = require('gulp-postcss');
const zindex = require('postcss-zindex');
const focus = require('postcss-focus');
const nocomments = require('postcss-discard-comments');
const nano = require('gulp-cssnano');
const mmq = require('gulp-merge-media-queries');

const stylelint = require('stylelint');
const stylelintConfig = require('stylelint-config-standard');

const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const favicons = require('gulp-favicons');

var DEST = 'build/';

var srcpaths = {
  bootstrap: './vendors/bootstrap/less/bootstrap.less',
  less: './src/less/**/*.less',
  images: './images/**/*',
  icons: './icons/**/*',
  meta: './meta/*'
};

var destpaths = {
  bootstrap: './vendors/bootstrap/dist/css',
  css: './build/css',
  html: '../production',
  index: '../production/index.html',
  webfonts: '../production/webfonts',
  images: '../production/images',
  icons: '..production/icons',
  meta: '../production/meta',
};

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/helpers/*.js',
        'src/js/*.js',
      ])
      .pipe(concat('custom.js'))
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});



// compilation and postproduction of LESS to CSS
gulp.task('css', function () {
    var processors = [
    	nocomments, // discard comments
    	focus, // add focus to hover-states
    	zindex, // reduce z-index values
        require('stylelint')(stylelintConfig), // lint the css
        require('postcss-font-magician')({
   			hosted: destpaths.webfonts,
			formats: 'local eot woff2'
		}) // import fonts
    ];
    return gulp.src(srcpaths.less)
        .pipe(less({
      		paths: [ path.join(__dirname, 'less', 'includes') ]
    	})) // compile less to css
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })) // add vendor prefixes
		.pipe(postcss(processors)) // clean up css
		.pipe(mmq({
			log: true
		}))
        .pipe(gulp.dest(destpaths.css)) // save cleaned version
        .pipe(nano()) // minify css
        .pipe(rename({suffix: '.min'})) // save minified version
    	.pipe(gulp.dest(destpaths.css));
});

gulp.task('bootstrap', function () {
    var processors = [
    	nocomments, // discard comments
    	focus, // add focus to hover-states
    	zindex, // reduce z-index values
        require('stylelint')(stylelintConfig), // lint the css
        require('postcss-font-magician')({
   			hosted: destpaths.webfonts,
			formats: 'local eot woff2'
		}) // import fonts
    ];
    return gulp.src(srcpaths.bootstrap)
        .pipe(less({
      		paths: [ path.join(__dirname, 'less', 'includes') ]
    	})) // compile less to css
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })) // add vendor prefixes
		.pipe(postcss(processors)) // clean up css
		.pipe(mmq({
			log: true
		}))
        .pipe(gulp.dest(destpaths.bootstrap)) // save cleaned version
        .pipe(nano()) // minify css
        .pipe(rename({suffix: '.min'})) // save minified version
    	.pipe(gulp.dest(destpaths.bootstrap));
});



// reduce images for web
gulp.task ('images', function () {
	return gulp.src(srcpaths.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(destpaths.images));
});

gulp.task ('icons', function () {
	return gulp.src(srcpaths.icons)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(destpaths.icons));
});

// crop and resize one meta image to different favicon formats.
gulp.task ('meta', function () {
    return gulp.src(srcpaths.meta)
		.pipe(favicons({
        appName: appName,
        appDescription: appDescription,
        developerName: developerName,
        developerURL: developerURL,
        background: backgroundColor,
        path: destpaths.meta,
        url: appURL,
        display: "standalone",
        orientation: "portrait",
        version: 1.0,
        logging: false,
        online: false,
        html: destpaths.index,
        replace: true
    	}))
		.pipe(gulp.dest(destpaths.meta));
});

gulp.task('watch', function () {
   gulp.watch(srcpaths.less, ['css']);
   gulp.watch(srcpaths.icons, ['icons']);
   gulp.watch(srcpaths.images, ['images']);
   gulp.watch(srcpaths.meta, ['meta']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './production/index.html'
    });
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('production/*.html', browserSync.reload);
  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
  // Watch .less files
  gulp.watch('src/less/*.less', ['css']);
  gulp.watch('vendors/bootstrap/less/*.less', ['bootstrap']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch', 'css', 'images', 'icons', 'meta']);
