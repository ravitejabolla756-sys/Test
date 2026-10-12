import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

export function getS3Client(): S3Client {
  return new S3Client({
    region: process.env.AWS_REGION ?? 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'fixture-aws-access-key-id',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'fixture-aws-secret-access-key'
    }
  });
}

export async function listBucketObjects(s3Client: S3Client, bucketName: string) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName
  });
  return s3Client.send(command);
}

export async function fetchBucketObject(s3Client: S3Client, bucketName: string, key: string) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });
  return s3Client.send(command);
}
