import AWS from 'aws-sdk'
import { ObjectKey, PutObjectRequest, PutObjectRetentionRequest } from 'aws-sdk/clients/s3'
import { errorResponse, successResponse } from './response'

const s3Client = new AWS.S3()

export const s3 = {
    async get() {

    },
    async write(data: any, fileName: any, bucket: any) {
        const params: any = {
            Bucket: bucket,
            Body: data,
            key: fileName as ObjectKey,
            ACL: 'public-read',
            ContentType: data.mime
        }

        const newData = await s3Client.putObject(params).promise()

        if (!newData) {
            errorResponse(400, { message: "image upload failed" })
        }
        return successResponse({ message: 'upload successful' })

    },
    getUploadUrl(){
        const params = {
            Bucket: 'your-bucket-name',
            Key: 'your-object-key',
            ContentType: 'your-file-content-type',
            ACL: 'public-read',
            Expires: 60 // URL expiration time in seconds
          };
          const signedUrl = s3Client.getSignedUrl('putObject', params);
    }
}