# Elevação do Grau da Curva de Bézier

Projeto 1 da cadeira de Processamento Gráfico (IF680)

Alunos: <br />
■ Jônatas de Oliveira Clementino - https://github.com/JonatasDeOliveira <br />
■ Valdemiro Rosa Vieira Santos - https://github.com/vrvs

Especificação Geral:

O programa pode ser implementado em qualquer linguagem de programação
com qualquer biblioteca gráfica. O sistema não pode apresentar estouro de
memória, ou excessiva lentidão na execução. Nenhum projeto pode usar rotinas
sofisticadas de bibliotecas, por exemplo: funções que desenham curvas de Bézier,
aplicam transformações afins, animam objetos. O projeto deve ter as bibliotecas
incluídas ao ser enviado, assim como documentação e/ou instruções para compilar/
executar o programa. Após a entrega o projeto não deverá ser alterado,
e haverá um desconto de 1 ponto por dia de atraso na entrega (considerando a
nota valendo de 0 a 10).
Conceito geral: O projeto deve implementar o cálculo e desenho de curvas
de Bézier, e deve atender os seguintes requisitos:

■ As avaliações (número de pontos computados) deve ser feita com o algoritmo
de De Casteljau.

■ O desenho das curvas serão feitos por retas ligando os pontos computados.

■ O número de avaliações da(s) curva(s) é arbitrária (determinada pelo usuário).

■ A menos que seja algum número seja especificado, o número de pontos de
controle da(s) curva(s) é arbitrário, sem limite.

■ O sistema deve ser interativo, permitindo inserir, modificar e deletar os
pontos de controle.

■ A atualização da curva é feita em tempo real.

■ O programa deve ter botões para esconder/exibir: pontos de controle,
poligonal de controle, curva de Bézier.


Especificação Específica:

O usuário poderá solicitar o aumento do grau da curva (que não modifica o
formato da curva), e ele passa a manipular os novos pontos de controle.
