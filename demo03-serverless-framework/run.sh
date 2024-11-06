# instalar
npm i -g serverless@3.16.0

# sls ou serverless para inicializar
sls 
# escolhi o HTTP API TEMPLATE
# nao usei org
# Deploy - Yes

# sempre que mudou o código, usa o
sls deploy

# traz os enderecos e inforações sobre as funções
sls info

# invocar local
sls invoke local -f hello # não precisa do --logs pq ele já mostra os logs

# invocar em prod
sls invoke -f hello

#configurar o serverless dashboard
sls
# Deploy yes

# ver o servless console
sls --console

# matar todo mundo!!
sls remove