/**
 * Chroniques d'ailleurs - compteur global de Likes
 *
 * À coller dans Apps Script depuis une feuille Google Sheets.
 * Exécutez setupLikesSheet() une fois avant le déploiement.
 */

var LIKES_SHEET_NAME = 'Likes';
var SPREADSHEET_ID_PROPERTY = 'D2L_LIKES_SPREADSHEET_ID';

function setupLikesSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Ouvrez ce script depuis la feuille Google Sheets qui doit stocker les Likes.');
  }

  PropertiesService.getScriptProperties().setProperty(
    SPREADSHEET_ID_PROPERTY,
    spreadsheet.getId()
  );

  var sheet = spreadsheet.getSheetByName(LIKES_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(LIKES_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['post_id', 'titre', 'likes', 'mis_a_jour']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }

  return 'Configuration terminée.';
}

function doGet(e) {
  try {
    var params = (e && e.parameter) || {};
    var action = String(params.action || 'count');

    if (action === 'ping') {
      return output_(e, { ok: true, service: 'Chroniques d ailleurs Likes' });
    }

    if (action !== 'count') {
      return output_(e, { ok: false, error: 'Action inconnue.' });
    }

    var postId = cleanId_(params.postId);
    if (!postId) {
      return output_(e, { ok: false, error: 'Identifiant de texte manquant.', count: 0 });
    }

    var count = getCount_(postId);
    return output_(e, { ok: true, postId: postId, count: count });
  } catch (error) {
    return output_(e, { ok: false, error: String(error && error.message ? error.message : error), count: 0 });
  }
}

function doPost(e) {
  var lock = null;
  try {
    var params = (e && e.parameter) || {};
    var action = String(params.action || '');

    if (action !== 'vote') {
      return json_({ ok: false, error: 'Action inconnue.' });
    }

    var postId = cleanId_(params.postId);
    var title = cleanTitle_(params.title);
    var liked = String(params.liked || '') === '1';

    if (!postId) {
      return json_({ ok: false, error: 'Identifiant de texte manquant.' });
    }

    lock = LockService.getScriptLock();
    lock.waitLock(8000);

    var sheet = getLikesSheet_();
    var row = findPostRow_(sheet, postId);
    var current = 0;

    if (row) {
      current = Math.max(0, Number(sheet.getRange(row, 3).getValue()) || 0);
    } else {
      row = sheet.getLastRow() + 1;
      sheet.getRange(row, 1, 1, 4).setValues([[postId, title, 0, new Date()]]);
    }

    var next = Math.max(0, current + (liked ? 1 : -1));
    sheet.getRange(row, 2).setValue(title || sheet.getRange(row, 2).getValue());
    sheet.getRange(row, 3).setValue(next);
    sheet.getRange(row, 4).setValue(new Date());

    return json_({ ok: true, postId: postId, count: next });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    if (lock) lock.releaseLock();
  }
}

function getCount_(postId) {
  var sheet = getLikesSheet_();
  var row = findPostRow_(sheet, postId);
  if (!row) return 0;
  return Math.max(0, Number(sheet.getRange(row, 3).getValue()) || 0);
}

function getLikesSheet_() {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty(SPREADSHEET_ID_PROPERTY);
  if (!spreadsheetId) {
    throw new Error('Exécutez setupLikesSheet() avant de déployer le Web App.');
  }

  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(LIKES_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(LIKES_SHEET_NAME);
    sheet.appendRow(['post_id', 'titre', 'likes', 'mis_a_jour']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function findPostRow_(sheet, postId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  var ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  for (var i = 0; i < ids.length; i += 1) {
    if (String(ids[i][0]) === postId) return i + 2;
  }
  return 0;
}

function cleanId_(value) {
  var id = String(value || '').trim();
  if (!/^[a-zA-Z0-9._-]{1,120}$/.test(id)) return '';
  return id;
}

function cleanTitle_(value) {
  return String(value || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 220);
}

function output_(e, payload) {
  var callback = e && e.parameter ? String(e.parameter.callback || '') : '';
  var text = JSON.stringify(payload);

  // JSONP uniquement pour les lectures publiques et non sensibles.
  if (/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + text + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
