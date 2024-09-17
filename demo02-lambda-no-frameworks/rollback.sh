# aws lambda list-functions | grep hello-cli
aws lambda delete-function \
    --function-name hello-cli \
    | tee logs/6.lambda-rm.log

# aws iam list-roles | grep lambda-example
# aws iam list-attached-role-policies --role-name lambda-example
aws iam detach-role-policy \
    --role-name lambda-example \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

aws iam delete-role \
    --role-name lambda-example