const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema( { date: {
                                                  type:String,
                                                  required: true
                                                },
                                            path: {
                                                  type:String,
                                                  required: true
                                                }
                                        }
                          );

const fileDB = mongoose.connection.useDb('file');

const fileInfo = fileDB.model('file', fileSchema);

module.exports = fileInfo;
