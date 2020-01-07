import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');

export class Lab4Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const handler = new lambda.Function(this, 'Func', {
      code: new lambda.InlineCode(`exports.handler = (event, context, callback) =>
      callback(null, {
        statusCode: '200',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
        },
      });`),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
    });
  const restApi = new apigateway.LambdaRestApi(this, 'RestApi', {
    handler
  })
  }
}
  