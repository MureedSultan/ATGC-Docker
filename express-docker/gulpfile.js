const gulp = require('gulp');
const purgecss = require('gulp-purgecss');
const imageresize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

const src = './public/src';
const dist = './public/dist';
const ignore = 'bootstrap';

gulp.task('images', () => {
	const paths = {
		folder: 'img/',
		src: './public/src/',
		dest: './public/dist/'
	};
	const images = [{
			folder: 'header',
			width: 1000,
			crop: false
		},
		{
			folder: 'custom',
			width: 900,
			crop: false
		},
		{
			folder: 'clients',
			width: 400,
			crop: false
		},
		{
			folder: 'partners',
			width: 400,
			crop: false
		},
		{
			folder: 'news',
			width: 700,
			crop: false
		}
	];
	return new Promise(function(resolve, reject) {
		images.forEach(function(type) {
			let resize_settings = {
				width: type.width,
				crop: type.crop,
				upscale: false
			};
			if (type.hasOwnProperty("height")) {
				resize_settings.height = type.height
			}
			gulp
				.src(paths.src + paths.folder + type.folder + '/**/*')
				.pipe(imageresize(resize_settings))
				.pipe(imagemin([
					imagemin.gifsicle({
						interlaced: true
					}),
					imageminMozjpeg({
						quality: 80
					}),
					imagemin.optipng({
						optimizationLevel: 5
					}),
					imagemin.svgo({
						plugins: [{
								removeViewBox: true
							},
							{
								cleanupIDs: true
							}
						]
					})
				]))
				.pipe(gulp.dest(paths.dest + paths.folder + type.folder));
		});
		resolve();
	});
});

gulp.task('js', () => {
	return gulp
		.src('public/src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/dist/js'));
});

gulp.task('static', () => {
	return gulp
		.src([
			`${src}/fonts/*`,
			`${src}/img/svg/*`,
			`${src}/static/*`
		], {
			base: src
		})
		.pipe(gulp.dest(dist));
});

gulp.task('css:ignore', () => {
	return gulp
		.src(`${src}/css/${ignore}.css`, {
			base: src
		})
		.pipe(cleanCSS())
		.pipe(gulp.dest(dist));
});

gulp.task('css', () => {
	gulp.parallel('css:ignore');
	return gulp
		.src(['public/src/css/*.css', `!public/src/css/${ignore}.css`])
		.pipe(
			purgecss({
				content: ['views/**/*.pug', 'public/src/js/*.js']
			})
		)
		.pipe(concatCss('bundle.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(`${dist}/css`));
});

gulp.task('styles', gulp.parallel('static', 'css', 'css:ignore'));
gulp.task('default', gulp.parallel('images', 'static', 'css', 'css:ignore', 'js'));