"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: ["target"],
    eslint: {
      lib: {
        src: ["lib/**/*.js"]
      },
      options: {
        configFile: "conf/eslint.json"
      },
      gruntfile: {
        src: "Gruntfile.js"
      }
    },
    jsdoc: {
      dist: {
        src: "lib/*.js",
        options: {
          destination: "target/html"
        }
      }
    },
     mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['tests/**/*.js']
      }
    },
    'gh-pages': {
      options: {
        base: 'target/html'
      },
      src: ['**/*']
    },
    watch: {
      gruntfile: {
        files: "<%= eslint.gruntfile.lib %>",
        tasks: ["eslint:gruntfile"]
      },
      lib: {
        files: "<%= eslint.lib.src %>",
        tasks: ["eslint:lib"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");;
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Task definitions.
  // run `grunt <task>` in command line and it will run the sequence in brackets
  grunt.registerTask("default", ["clean","jsdoc", "test"]);
  grunt.registerTask("doc", ["jsdoc", "gh-pages"]);
  grunt.registerTask("test", ["mochaTest"]);
};
