# Recuperar Senha

**RF**

- o usuário deve poder recuperar sua senha informando seu e-mail;
- o usuário deve receber instruções de repurações de senha;
- o usuário deve poder resetar sua senha;

**RNF**

- ulizar mailtrap para testar os evniaros de emails;
- utilizar Amazon Ses para envios em produção;
- o envio de e-mail deve acontecer em segundo plano;

**RN**

- o link enviado para resetar a senha deve expirar em 2h;
- o usuário precisa confirmar a nova senha ao mudar a senha

# Atualização do perfil

**RF**

- o usuário deve poder atualizar seu perfil (nome,email,senha);

**RNF**
-
**RN**

- o usuário não pode alterar seu email para um email já utilizado por outro usuário;
- para atualizar sua senha o usuário deve informar a senha antiga ;
- para atualizar a nova seha o usuário deve confirmar a nova senha;

# Painel do prestador

**RF**

- o prestador deve conseguir ver todos os seu agendamentos
- o prestador deve receber uma notificação sempre que houver um novo agendamento
- o prestador deve poder visualizar as notificações não lidas

**RNF**
- os agendamentos do prestador do dia deve ser armazenados no cache
- as notificações devem ser armazenadas no mongo-Db
- as notificações devem ser enviadas em tempo real utilizando socket.io

**RN**
- A notificação deve ter um status de Lida ou Não Lida

# Agendamento de serviços

**RF**

- o usuário deve poder ver uma lista dos prestadores de serviços;
- o usuário deve poder listar os dias disponiveis do prestador de serviço;
- o usuário deve poder agendar um horário;

**RNF**
- listagem de pretadores deve ser armazenados em cache
-
**RN**

- cada agendamento deve ter 1h nexatamente
- os agendamentos devem estar disponiveis entre 8h às 18h
- usuário não pode agendar em um usuário já ocupado
- usuário não pode agendar em um horario passado
- usuário não pode agendar um horario com sigo mesmo

