const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost/SampleDb', { useNewUrlParser: true});

  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
  });

  mongoose.Promise = global.Promise;
};