module.exports = {
  ng_appname: 'just',

  build_dir: 'build',
  compile_dir: 'dist',
  config_dir: './config/',

  config_files: {
    json: ['config/*.json']
  },
  app_files: {
    js: [
      'src/app/**/*.js'
    ],

    atpl: ['src/app/**/*.html'],

    less: 'src/less/themes/default/master.less'
  },

  test_files: {
    js: [
      'bower_components/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/jquery-resize/jquery.ba-resize.min.js',
      'bower_components/showdown/compressed/showdown.js',
      'bower_components/respond/dest/respond.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-promise-tracker/promise-tracker.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-sanitize/angular-sanitize.js'
    ],
    css: [

    ],
    assets: [

    ]
  }
};