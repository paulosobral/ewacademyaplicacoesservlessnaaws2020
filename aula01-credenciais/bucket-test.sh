aws s3api create-bucket --bucket ps-hello-bucket

aws s3 cp hello.txt s3://ps-hello-bucket
aws s3 cp s3://ps-hello-bucket/hello.txt h.txt

aws s3 rm s3://ps-hello-bucket --recursive
aws s3api delete-bucket --bucket ps-hello-bucket