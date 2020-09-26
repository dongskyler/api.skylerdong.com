import dotenv from 'dotenv';

// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';
// var dotenv = require('dotenv');
dotenv.config();

// Set the region
AWS.config.update({ region: 'us-east-2' });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// Create the parameters for calling listObjects
const bucketParams = {
  Bucket: 'skylerdong-docs',
};

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});

const s3ResumeParams = {
  Bucket: 'skylerdong-docs',
  Key: 'resume/tiannong_skyler_dong_resume.pdf',
};

const getResume = () => {
  s3.getObject(s3ResumeParams, function (err, data) {
    // Handle any error and exit
    if (err) return err;
    console.log('getResume!!');
    return data;
  });
};

getResume();
