var gulp = require('gulp'),
    less = require('gulp-less'),            /*less */
    plumber = require('gulp-plumber'),  
    htmlmin = require('gulp-htmlmin'),      /**压缩html及其css js */
    jsmin = require('gulp-uglify'),         /*压缩js */
    spriter = require('gulp-css-spriter'),  /*合并图片 */
    cleancss = require('gulp-clean-css'),   /*压缩css */
    browserSync = require('browser-sync').create(),  /*浏览器热刷新 */
    reload = browserSync.reload,         
    del = require('del'),
    concat = require('gulp-concat'),         /**合并文件 */
    order=require('gulp-order');        

/*路径 */
var static = {
    html: '*.html',
    css: 'css/**/*.css',
    less: 'less/**/*.less',
    js: 'js/**/*.js',
    img: 'images/**/*',
    fonts: 'fonts/**/*',
    swf: 'swf/**/*.swf',

    path: {
        outPath: './dist/',
        outPath_img: './dist/images/',
        outPath_css: './dist/css/',
        outPath_js: './dist/js/'
    }
}
//清空输出目录
gulp.task('delete', function (cb) {
    return del(['dest/*'], cb);
});
//less编译
gulp.task('start-less', function () {
    gulp.src([static.less,'!./less/default-less.less'])
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('css'));
});




//压缩html页面
gulp.task('minhtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(static.html)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(static.path.outPath))
        .pipe(reload({stream:true}));
});
//压缩js
gulp.task('minjs', function () {
    gulp.src(static.js)
        .pipe(concat('index.js'))
        .pipe(jsmin())
        .pipe(gulp.dest(static.path.outPath_js))
        .pipe(reload({stream:true}));
})
//压缩css
gulp.task('mincss', ['start-less'], function () {
    var options = {

        // The path and file name of where we will save the sprite sheet 
        'spriteSheet': './dist/images/spritesheet.png',
        // Because we don't know where you will end up saving the CSS file at this point in the pipe, 
        // we need a litle help identifying where it will be. 
        'pathToSpriteSheetFromCSS': '../images/spritesheet.png'

    }
    return gulp.src(static.css)
        .pipe(order([
            'css/index.css',
            static.css
        ]))
        .pipe(concat('main.css'))
        // .pipe(spriter(options))
        .pipe(cleancss())
        .pipe(gulp.dest(static.path.outPath_css))
        .pipe(reload({stream:true}));
})
//合并图片
gulp.task('imgspriter', function () {
    return gulp.src(static.css)
        .pipe(spriter())
        .pipe(gulp.dest(static.path.outPath_css))
        .pipe(reload({stream:true}));
})
gulp.task('default', ['browser-sync']);
//拷贝图片到输出路径
gulp.task('cloneimg',function(){
    return gulp.src(static.img)
            .pipe(gulp.dest(static.path.outPath_img))
            .pipe(reload({stream:true}));
})

gulp.task('browser-sync', ['delete', 'mincss', 'minhtml', 'minjs','cloneimg'], function () {
    var filePath;
    browserSync.init({
        port: 8080,
        server: {
            baseDir: './dist/'
        }
    });
    gulp.watch(static.less, ['start-less']);
    gulp.watch(static.js, ['minjs']);         //监控文件变化，自动更新  
    gulp.watch(static.html, ['minhtml']);
    gulp.watch(static.img,['cloneimg']);
    gulp.watch(static.path.outPath).on('change', reload);
});