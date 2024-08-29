# 1 - criar arquivo de politicas de seguranca
# 2 - attachar a role para a nossa lambda

aws --version

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs16.x
FUNCTION_NAME=hello-cli

mkdir -p logs

aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://policies.json \
    | tee logs/1.role.log

POLICY_ARN="arn:aws:iam::144842881551:role/lambda-example"
POLICY_ARN=$(cat logs/1.role.log | jq -r .Role.Arn)

# 3 - passo, criar o arquivo
# 4 - zipar o projeto
zip function.zip index.js

aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime $NODEJS_VERSION \
    --role $POLICY_ARN \
    | tee logs/2.lambda-create.log

# TODO: 12:13 https://play.ewacademy.com.br/area/produto/item/2981036