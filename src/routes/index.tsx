import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

/**
 * Se não houver nenhum outro conteúdo dentro da função além do
 * return, não é necessário utilizar a sintaxe { return ... }, podendo
 * utilizar apenas parenteses.
 */
const Routes: React.FC = () => (
  /**
   * O componente Swicth realiza a exclusividade no acionamento
   * das rotas, impedindo que mais de uma rota seja acessada por vez,
   * pois o react-router-dom verifica apenas se a URL contém o conteúdo
   * do path para redirecionar.
   * Para evitar que a rota raiz (/) seja acionada mesmo quando tentado
   * acionar outra rota, por exemplo "/repository", deve ser utilizada a
   * propriedade "exact", indicando que deve ser verificado o caminho exato
   * indicado para o atributo path.
   */
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository" component={Repository} />
  </Switch>
  /**
   * path: Indica o caminho do arquivo para a rota
   * exact: Indica que a rota deve buscar pelo caminho exato
   * component: Componente ao qual a rota faz referência
   */
);

export default Routes;
