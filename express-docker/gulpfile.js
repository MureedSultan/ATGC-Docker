const gulp = require('gulp');
const purgecss = require('gulp-purgecss');
const imageresize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

gulp.task('images', () => {
	const paths = {
		folder: 'img/',
		src: './public/src/',
		dest: './public/dist/'
	};
	const images = [{
			folder: 'custom',
			width: 800,
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
			width: 800,
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
				.pipe(imagemin({
					progressive: true,
					svgoPlugins: [{
						removeViewBox: false
					}],
					use: [pngquant()]
				}))
				.pipe(gulp.dest(paths.dest + paths.folder + type.folder));
		});
		resolve();
	});
});

gulp.task('static', () => {
	return gulp
		.src([
			'./public/src/fonts/*',
			'./public/src/img/svg/*',
			'./public/src/css/theme.css',
			'./public/src/static/*'
		], {
			base: './public/src'
		})
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('js', function() {
	return gulp
		.src('public/src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/dist/js'));
});

gulp.task('css', () => {
	return gulp
		.src(['public/src/css/*.css', '!public/src/css/theme.css'])
		.pipe(
			purgecss({
				content: ['views/**/*.pug', 'views/*.pug', 'public/src/js/*.js']
			})
		)
		.pipe(cleanCSS({
			compatibility: 'ie8',
			level: {
				2: {
					all: true
				}
			}
		}))
		.pipe(concatCss("bundle.css"))
		.pipe(gulp.dest('public/dist/css'));
});

gulp.task('styles', gulp.parallel('static', 'css'));
gulp.task('default', gulp.parallel('images', 'static', 'css', 'js'));