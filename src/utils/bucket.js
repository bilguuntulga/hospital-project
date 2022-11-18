import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
});

const bucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_S3_BUCKET_NAME },
  region: process.env.REACT_APP_S3_REGION,
});

export default bucket;
