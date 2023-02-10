var express = require('express');

//DEFINE ALL REST API that are used for admin app
module.exports = function (dbPool) {
  var sanitizeService = require('../service/sanitizeService')(dbPool);
  var router = express.Router();
  router.get('/preview-html', sanitizeService.previewHtml);

  router.put('/sanitize-html', sanitizeService.sanitizeHtml);

  router.put('/sanitize-entire-table-html', sanitizeService.sanitizeEntireTableHtml);
  return router;
};