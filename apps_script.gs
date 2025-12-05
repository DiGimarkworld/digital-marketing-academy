
/**
 * Google Apps Script Web App to receive POST and append to a sheet.
 * Replace YOUR_SHEET_ID_HERE with your Google Sheet ID.
 */
function doGet(e){ return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON); }
function doPost(e){
  var ssId = 'YOUR_SHEET_ID_HERE';
  var sheetName = 'Submissions';
  var payload = e.postData.contents ? JSON.parse(e.postData.contents) : {};
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  if(!sh) sh = ss.insertSheet(sheetName);
  sh.appendRow([new Date(), payload.name||'', payload.email||'', payload.pathway||'']);
  return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
}
