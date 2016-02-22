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
        src: ["lib/*.js", "tests/*.js"],
        options: {
          destination: "target/html"
        }
      }
    },
    instrument: {
      files: ["lib/*.js", "index.js"],
      options: {
        lazy: true,
        basePath: "target/instrumented"
      }
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

  // Task definitions.
  // run `grunt <task>` in command line and it will run the sequence in brackets
  grunt.registerTask("default", ["clean","jsdoc"]);
  grunt.registerTask("doc", ["jsdoc"]);
};
