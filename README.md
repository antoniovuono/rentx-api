# LEGENDAS:
**RF** => REQUESITOS FUNCIONAIS

**RNF** => REQUESITOS NÃO FUNCIONAIS

**RNF** => REGRAS DE NEGÓCIO 

# Cadastro de carro:
**RF** => REQUESITOS FUNCIONAIS:
=> Deve ser possível cadastrar um novo carro.
**RNF** => REGRAS DE NEGÓCIO:
=> Não deve ser possível cadastrar um carro com uma placa já existente.
=> Não deve ser possível alterar a placa de um carro já existente.
=> O carro deve ser cadastrado com com a disponibilidade para ser alugado por padrão.
=> O usuário responsável pelo cadastro de carros deve ser um adminstrador.

# Listagem de carro:
**RF** => REQUESITOS FUNCIONAIS
=> Deve ser possível listar todos os carros disponíveis para aluguel.
=> Deve ser possível listar todos os carros disponíveis pelo nome da categoria de carros.
=> Deve ser possível listar todos os carros disponíveis pelo nome da marca.
=> Deve ser possível listar todos os carros disponíveis pelo nome do carro.
**RNF** => REGRAS DE NEGÓCIO:
=> O usuário não precisa estar autenticado no sistema para visualizar a lista.

# Cadastro de especificação de carro:
**RF** => REQUESITOS FUNCIONAIS:
=> Deve ser possível cadastrar uma especificação de um carro.
=> Dever ser possível listar todas as especificação.
=> Deve ser possível listar todos os carros.
**RNF** => REGRAS DE NEGÓCIO:
=> Só deve ser possível cadastrar uma especificação de um carro existente.
=> Não deve ser possível cadastrar duas especificações para o mesmo carro.
=> O usuário responsável pelo cadastro de carros deve ser um adminstrador.

# Cadastro de imagem do carro:
**RF** => REQUESITOS FUNCIONAIS:
=> Deve ser possível cadastrar a imagem do carro.
**RNF** => REQUESITOS NÃO FUNCIONAIS:
=> Utilizar o multer para o upload dos arquivos
**RNF** => REGRAS DE NEGÓCIO:
=> O usuário pode cadastrar mais de uma imagem para determinado carro.

# Aluguel de carro:
**RF** => REQUESITOS FUNCIONAIS:
=> Deve ser possível cadastrar um aluguel
**RNF** => REGRAS DE NEGÓCIO:
=> O aluguel deve ter duração minima de 24 horas.
=> Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para um usuário.
=> Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para um mesmo carro.