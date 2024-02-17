# Sample microservice NestJS

Tech stacks:

- NestJS: 1 app, 2 microservices with healthcheck
- Docker
- Github action workflow for ECS services
- AWS CDK typescript
  - ECS
  - VPC + NAT gateway
  - Api gateway
  - Network load balancing/Cloudmap
  - Service connect
  - ECR


# Sample AWS IaC Cloudformation using AWS CDK

### 🍺 TechStack

- VPC
- Cloudwatch
- ECS
- ElasticCache
- RDS (Postgres)

## 🚀 CDK-Project Build & Deploy

To efficiently define and provision AWS cloud resources, [AWS Cloud Development Kit(CDK)](https://aws.amazon.com/cdk) which is an open source software development framework to define your cloud application resources using familiar programming languages is utilized.

![AWS-CDKIntro](assets/aws_cdk_intro.png)

Because this solusion is implemented in CDK, we can deploy these cloud resources using CDK CLI. Among the various languages supported, this solution used **typescript**. Because the types of **typescript** are very strict, with the help of auto-completion, **typescript** offers a very nice combination with AWS CDK.

### 🧰 ***CDK Useful commands***

- `npm install`     install dependencies
- `cdk list`        list up stacks
- `cdk deploy`      deploy this stack to your default AWS account/region
- `cdk diff`        compare deployed stack with current state
- `cdk synth`       emits the synthesized CloudFormation template

### 🧾 **Prerequisites**

First of all, AWS Account and IAM User is required. And then the following modules must be installed.

- AWS CLI: aws configure --profile [profile name]
- Node.js: node --version
- AWS CDK: cdk --version

### 💳 ***Configure AWS Credential***

Please configure your AWS credential to grant AWS roles to your develop PC.

```bash
aws configure --profile [your-profile] 
AWS Access Key ID [None]: xxxxxx
AWS Secret Access Key [None]:yyyyyy
Default region name [None]: ap-southeast-1 
Default output format [None]: json
...
...
```

If you don't know your AWS account information, execute the following commad:

```bash
aws sts get-caller-identity --profile [your-profile]
...
...
{
    "UserId": ".............",
    "Account": "1234*******",
    "Arn": "arn:aws:iam::1234*******:user/[your IAM User ID]"
}
```

### 🤚 ***Check CDK project's launch config***

The `cdk.json` file tells CDK Toolkit how to execute your app. Our current entry point for our project is `src/main.ts`.

### ✅ ***Set up deploy config***

The `config/app-config-demo.json` file describes how to configure deploy condition & stack condition. First of all, change project configurations(Account, Profile are essential) in ```config/app-config-demo.json```.

```json
{
    "Project": {
        "Name": "EcsProject",
        "Stage": "Demo",
        "Account": "1234*******",
        "Region": "ap-southeast-1",
        "Profile": "cdk-demo"
    },
    ...
    ...
}
```

And then set the path of the configuration file through an environment variable.

```bash
export APP_CONFIG=config/app-config-demo.json
```

### 🏃 ***Install dependencies & bootstrap***

```bash
sh scripts/setup_initial.sh config/app-config-demo.json
```

### ***Deploy stacks***

This project has 1 stacks, each of which does the following:

- EcsProjectDemo-VpcInfraStack: VPC, ECS Cluster, CloudMap Namespace for a base infrastructure

`config/app-config-demo.json` file describes how to configure each stack. For example `backend`'s configuration is like this.

```json
...
...
    "Stack": {
        "VpcInfra": {
            "Name": "VpcInfraStack",
            "VPCName": "CommonVPC",
            "VPCMaxAzs": 3,
            "VPCCIDR": "10.0.0.0/16",
            "NATGatewayCount": 0,
            "ECSClusterName": "MainCluster"
        }
    }
...
...
```

Before deployment, check whether all configurations are ready. Please execute the following command:

```bash
cdk list
...
...
==> CDK App-Config File is config/app-config-demo.json, which is from Environment-Variable.
EcsProjectDemo-VpcInfraStack
...
...
```

Check if you can see a list of stacks as shown above.

### 🏁 If there is no problem, finally run the following command

```bash
sh scripts/deploy_stacks.sh config/app-config-demo.json
```

***Caution***: This solution contains not-free tier AWS services. So be careful about the possible costs.

Now you can find deployment results in AWS CloudFormation.
