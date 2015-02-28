var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var del = require("del");
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jshintStylish = require("jshint-stylish");
var mocha = require("gulp-mocha");
var prettify = require("gulp-jsbeautifier");
var rename = require("gulp-rename");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");

var DEST = "./src";

gulp.task("build", [ "minimize" ]);

gulp.task("clean:src", function(cb){
  del([
    DEST
  ], cb );
});

gulp.task("concat", [ "clean:src" ], function(){
  return browserify("./index.js", { standalone : "numbers" })
    .bundle()
    .pipe(source("numbers.js"))
    .pipe(gulp.dest( DEST ));
});

gulp.task("default", [ "build" ]);

gulp.task("format:lib", function(){
  return gulp.src( ["./lib/**/*.js"], { base : "./lib"} )
    .pipe(prettify({
      js: {
        indentSize: 2,
        space_after_anon_function: true
      }
    }))
    .pipe(gulp.dest("./lib"));
});

gulp.task("format:test", function(){
  return gulp.src( ["./test/*.js"], { base : "./"} )
    .pipe(prettify({
      js: {
        indentSize: 2,
        space_after_anon_function: true
      }  
    }))
    .pipe(gulp.dest("./"));
});

gulp.task("format", [ "format:lib", "format:test" ]);

gulp.task("lint", function(){
  return gulp.src( ["./lib/**/*.js", "./test/*.js"] )
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});

gulp.task("minimize", [ "concat" ], function(){
  return gulp.src( DEST + "/numbers.js")
    .pipe(uglify())
    .pipe(rename({ extname : ".min.js" }))
    .pipe(gulp.dest( DEST ));
});

gulp.task("test", function(){
  return gulp.src(["./test/*.js", "!./test/testing.js"])
    .pipe(mocha({ 
       ui : "tdd"
     }));
});

