import cdk = require('@aws-cdk/core');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns');
import ecs = require('@aws-cdk/aws-ecs');
import ec2 = require('@aws-cdk/aws-ec2');

export class Lab2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const vpc = this.node.tryGetContext('USE_DEFAULT_VPC') == 1 ? ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true }) : new ec2.Vpc(this, 'Vpc', {
      maxAzs: 3,
      natGateways: 1
    })

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc })


    const svc = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Svc', {
      cluster,
      desiredCount: this.node.tryGetContext('DESIRED_COUNT') ? +this.node.tryGetContext('DESIRED_COUNT') : 1,
      memoryLimitMiB: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
        containerPort: 80,
      }
    })

    // reeduce the task draining time from ALB
    svc.targetGroup.setAttribute('deregistration_delay.timeout_seconds', '30')
    // customize the healthcheck to speed up the ecs rolling update
    svc.targetGroup.configureHealthCheck({
      interval: cdk.Duration.seconds(5),
      healthyHttpCodes: '200',
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 3,
      timeout: cdk.Duration.seconds(4),
    })

    new cdk.CfnOutput(this, 'ClusterName', { value: cluster.clusterName })
    new cdk.CfnOutput(this, 'ServiceName', { value: svc.service.serviceName })

  }
}
