const mongoose = require('mongoose');

module.exports.init = async function() {
    const username = encodeURIComponent('shakyaharsh1028');
    const password = encodeURIComponent('Dimpy@2802');
    const clusterUrl = 'cluster0.0dx4hq9.mongodb.net';
    const dbName = 'Todoapp';

    const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
