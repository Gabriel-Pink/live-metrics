# Live Metrics

O **Live Metrics** é um projeto solo focado no monitoramento de tráfego e ações dos usuários em websites, com suporte a autenticação segura via JWT. Ele permite que administradores de sites acompanhem em tempo real quem acessa o sistema e como interagem com ele.

## Principais Funcionalidades

- **Autenticação JWT**: Garantia de segurança na autenticação de administradores e usuários.
- **Monitoramento Avançado**: Coleta informações como:
  - **IP** dos visitantes.
  - **Origem do acesso** (página anterior ou fonte de tráfego).
  - Outras interações realizadas no site.
- **Codificação de Métricas**: No frontend, os dados são codificados para evitar visibilidade direta no navegador, sendo decodificados no backend para análise.

## Tecnologias Utilizadas

- **AWS Lambda**: Processamento serverless eficiente para as funções do backend.
- **AWS DynamoDB**: Banco de dados escalável para armazenar informações de acessos e interações.
- **AWS Amplify**: Hospedagem do frontend e integração com os serviços AWS.
- **AWS CloudFront**: Distribuição de conteúdo otimizada para maior desempenho.
- **Amazon EC2**: Servidores configurados para operações específicas e processamento adicional.

## Objetivo

Prover insights detalhados e em tempo real para otimizar a experiência do usuário e melhorar a gestão do tráfego no site. O **Live Metrics** utiliza uma infraestrutura robusta da AWS para garantir escalabilidade, segurança e eficiência.