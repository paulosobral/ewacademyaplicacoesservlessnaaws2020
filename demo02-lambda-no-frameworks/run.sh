# 1 - criar arquivo de politicas de seguranca
# 2 - attachar a role para a nossa lambda

aws --version

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs20.x
FUNCTION_NAME=hello-cli

mkdir -p logs

aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://policies.json \
    | tee logs/1.role.log

POLICY_ARN="arn:aws:iam::144842881551:role/lambda-example"
# POLICY_ARN=$(cat logs/1.role.log | jq -r .Role.Arn)
echo $POLICY_ARN

aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# 3 - passo, criar o arquivo
# 4 - zipar o projeto
zip function.zip index.js
chmod 755 function.zip

sleep 5

aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime $NODEJS_VERSION \
    --handler index.handler \
    --role $POLICY_ARN \
    --zip-file fileb://function.zip \
    | tee logs/2.lambda-create.log

sleep 5

aws lambda invoke \
    --function-name $FUNCTION_NAME logs/3.lambda-exec.log \
    --log-type Tail \
    --query 'LogResult' \
    --output text | base64 -d

sleep 5

# ATUALIZAR:
zip function.zip index.js

aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name $FUNCTION_NAME \
    --publish \
    | tee logs/4.lambda-update.log

sleep 5

aws lambda invoke \
    --function-name $FUNCTION_NAME logs/5.lambda-exec-update.log \
    --log-type Tail \
    --query 'LogResult' \
    --cli-binary-format raw-in-base64-out \
    --payload '{"name":"erickwendel"}' \
    --output text | base64 -d

# TODO: 12:13 https://play.ewacademy.com.br/area/produto/item/2981036