AWS_SDK_LOAD_CONFIG=1

const AWS = require('aws-sdk');
const requireLogin = require('../middlewares/requireLogin');
const uuid = require('uuid/v1');
const keys = require('../config/keys');

console.log('keys.accessKeyId: ', keys.accessKeyId)
console.log('keys.secretAccessKey: ', keys.secretAccesskey)

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccesskey,
    signatureVersion: 'v4',
    region: 'eu-north-1',
  });

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {

        const key = `${req.user.id}/${uuid()}.jpeg`

        s3.getSignedUrl('putObject', {
            Bucket: 'advanced-node-js-bucket',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => {
            console.error(err);
            res.send({ key, url })
        })
    });
};