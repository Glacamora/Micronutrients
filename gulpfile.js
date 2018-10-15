"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var run = require("run-sequence");
var minifycss = require("gulp-csso");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var concat = require('gulp-concat');

gulp.task("data", function() {
  gulp.src("data.json")
    .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minifycss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("js", function() {
  gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js/"))
    //.pipe(uglify())
    .pipe(concat("all.js"))
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "html",
    "style",
    "js",
    "data",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    injectChanges: true,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["js"]);
  gulp.watch("source/img/*", ["copy"]);
  gulp.watch("source/*.html").on('change', server.reload);
});
