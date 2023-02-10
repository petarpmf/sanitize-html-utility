const sanitizeHtml = require('sanitize-html');

module.exports = function (dbPool) {

    var handleFunction = {};

    //Preview HTML in GRID based on selected table, column or ids.
    handleFunction.previewHtml = async function(req, res) {
      let tableVal = req.query.tableVal;
      let columnVal = req.query.columnVal;
      let idsVal = req.query.idsVal;

      let sql = handleFunction.generateSelectSqlQuery(tableVal, columnVal, idsVal);

      dbPool.query(sql, [], function (err, data) {
        if (err) {
          throw new Error(err.message);
        } else {
          let responseData = [];
          if (data) {
              data.forEach((row) => {
                let rowText ="";
                if(columnVal == 'extended_attributes'){
                  rowText = JSON.parse(row.text.replace(/\n|\r/g, "")).joiningInstructions;
                }else{
                  rowText = row.text.replace(/\n|\r/g, "");
                }
                responseData.push({"id":row.id, "text": rowText});
              })
            res.send(responseData);
          }
        }
      });
    }

    //Generate "Select" SQL query
    handleFunction.generateSelectSqlQuery = function(tableVal, columnVal, idsVal){
      if (!tableVal) {
        throw new Error('Missing request parameter tableVal.');
      }
      if (!columnVal) {
        throw new Error('Missing request parameter columnVal.');
      }
      var whereQuery="";
      if(idsVal && idsVal != ""){
        var subString = idsVal.split(";");
        var filtered = subString.filter(function (el) {
          return el != "";
        });
        whereQuery = "AND id IN ("+filtered.join(",")+")";
      }
      var likeQuery=""
      if(columnVal == 'extended_attributes'){
        likeQuery = " REGEXP '\"joiningInstructions\":\".+\n{0,}.+\"' AND extended_attributes NOT REGEXP '\"joiningInstructions\":\"\"' ";
      }else{
        likeQuery = " LIKE '%=%' ";
      }
      let sql = "select id, "+columnVal+" as text from "+tableVal + " where "+columnVal+" IS NOT NULL AND "+columnVal+"<>'' AND "+columnVal+ likeQuery + whereQuery;
      return sql;
    }

    //Return cleared/sanitized Html
    handleFunction.cleanedText = function(columnVal, recordFromDb, selectedItemsForTags, selectedItemsForAttributes){
      let dirty="";
      if(columnVal=='extended_attributes'){
        dirty = JSON.parse(recordFromDb.text.replace(/\n|\r/g, "")).joiningInstructions;
      }else{
        dirty = recordFromDb.text.replace(/\n|\r/g, "");
      }

      const clean = sanitizeHtml(dirty, {
        allowedTags: selectedItemsForTags,
        allowedAttributes: {
          '*': selectedItemsForAttributes
        }
      });
      let cleanedText="";
      if(columnVal=='extended_attributes'){
        let extendedAttribute = JSON.parse(recordFromDb.text.replace(/\n|\r/g, ""));
        extendedAttribute.joiningInstructions = clean.trim().replace(/"/g, '\\"').replace(/\n|\r/g, "");
        cleanedText = JSON.stringify(extendedAttribute);
      }else{
        cleanedText = clean;
      }
      return cleanedText;
    }

    //Creared/Sanitized one row from table
    handleFunction.sanitizeHtml = async function(req, res) {
      let id = req.body.id;
      let tableVal = req.body.tableVal;
      let columnVal = req.body.columnVal;
      let selectedItemsForTags = req.body.selectedItemsForTags;
      let selectedItemsForAttributes = req.body.selectedItemsForAttributes;

      let recordFromDb = await handleFunction.getRecordFromDB(id.toString(), tableVal, columnVal);

      if (!recordFromDb[0].id) {
        res.send({ status: 409, message: 'The record doesn\'t exist in DB.' });
        return;
      }
      return handleFunction.updateRecord(tableVal, columnVal, selectedItemsForTags, selectedItemsForAttributes, res, recordFromDb);
    }

    //Creared/Sanitized Entire Table
    handleFunction.sanitizeEntireTableHtml = async function(req, res){
      let tableVal = req.body.tableVal;
      let columnVal = req.body.columnVal;
      let idsVal =req.body.idsVal;
      let selectedItemsForTags = req.body.selectedItemsForTags;
      let selectedItemsForAttributes = req.body.selectedItemsForAttributes;

      let recordFromDb = await handleFunction.getRecordFromDB(idsVal, tableVal, columnVal);

      if (recordFromDb.length == 0) {
        res.send({ status: 409, message: 'The record doesn\'t exist in DB.' });
        return;
      }
      return handleFunction.updateRecord(tableVal, columnVal, selectedItemsForTags, selectedItemsForAttributes, res, recordFromDb);
    }

    //Get record from DB
    handleFunction.getRecordFromDB = function(idsVal, tableVal, columnVal){
      return new Promise((resolve, reject) => {
        let sql = handleFunction.generateSelectSqlQuery(tableVal, columnVal, idsVal);
        dbPool.query(sql, [], function (err, data) {
          if (err) {
            reject(err.message);
          } else {
            resolve(data);
          }
        });
      })
    }

    //Update records based on selected table, column or ids
    handleFunction.updateRecord = async function(tableVal, columnVal, selectedItemsForTags, selectedItemsForAttributes, res, recordFromDb){
        var queries = '';
        recordFromDb.forEach((record) => {
          let cleanedText = handleFunction.cleanedText(columnVal, record, selectedItemsForTags, selectedItemsForAttributes);
          cleanedText = cleanedText.replace(/'/g, "\\'");
          queries += "UPDATE "+tableVal+" SET " +columnVal+"='"+cleanedText+"' where id='"+record.id+"'; ";
        })
        dbPool.query(queries, function (err, data) {
  
          if (err) {
            res.send({ status: 409, message: "This HTML has not been sanitized." });
          } else {
            if (data.affectedRows == 0) {
              res.send({ status: 409, message: "This HTML has not been sanitized." });
            } else {
              if(recordFromDb.length==1){
                res.send({ status: 204, message: 'The HTML is successfully sanitized for table '+tableVal+" and column "+columnVal+" and id "+recordFromDb[0].id+"."});
              }else{
                res.send({ status: 204, message: 'The HTML is successfully sanitized for table '+tableVal+" and column "+columnVal+"."});
              }              
            }
          }
        });
    }
  return handleFunction;
}