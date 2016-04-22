angular.module('just.common')
  .controller('LanguageCtrl', ['i18nService','justRoutes', function (i18nService, routes) {
    var that = this;
    i18nService.supportedLanguages()
      .then(function (langs) {
        that.languages = langs;
      });
    i18nService.getLanguage()
      .then(function (lang) {
        that.language = lang;
      });
    this.useLanguage = function (lang) {
      i18nService.useLanguage(lang);
      routes.global.isSelectLanguageOpen = false;
    };
  }]);
