import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

/**
 * Para tipos que não são comuns (string, number, boolean) é necessário definir a tipagem
 * para evitar erros do TypeScript
 * !! Observação! Adicionar a tipagem apenas das propriedades da API que serão utilizadas
 */
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

/**
 * No TypeScript é possível criar o componente em forma de
 * constante, o que facilita a sua tipagem. O componente abaixo
 * é equivalente à seguinte função (sem tipagem):
 *      function Dashboard() {
 *          return <h1>Dashboard</h1>
 *      }
 */
/**
 * A tipagem de um componente React utilizando o Typescript
 * se dá pelo comando React.FC, onde FC é a abreviação de
 * FunctionComponent.
 */
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  /**
   * É possível definir o retorno inicial como uma function, sendo possível recuperar os itens
   * já existentes em alguma forma de armazenamento e retorná-los para o preenchimento inicial
   * do componente.
   */
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });

  /**
   * A função useEffect é disparada sempre que a variável passada como segundo argumento,
   * nesse caso "[repositories]", tem seu valor alterado.
   * De forma a evitar conflitos com outros itens gravados no local storage, por convensão,
   * deve ser gravado o nome do item utilizando o nome da aplicação seguido do nome da variável
   * precedida de um @:
   * @GithubExplorer:repositories.
   * O local storage não aceita valores que não sejam string, portanto é necessário converter
   * o array para o formato JSON.
   *
   */
  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    /**
     * Evita o comportamento padrão do evento do elemento HTML, nesse caso o recarregar
     * da página no evento Submit do formulário
     */
    event.preventDefault();

    /**
     * Verifica se foi informado um repositório
     */
    if (!newRepo) {
      setInputError('Informe o autor/repositório para a pesquisa.');
      return;
    }

    /**
     * Utilizado o try/catch para capturar o erro retornado da API
     */
    try {
      /**
       * É possível incluir a tipagem de retorno do response para a API, de forma que a variável
       * que recebrá os dados forneça os atributos do objeto retornado e não fique marcada como "any"
       */
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('O autor/repositório informado não foi encontrado.');
    }
  }

  /**
   * A propriedade customizada "hasError" passada para o componente Form possibilita a estilização
   * de seus componentes internos dentro do styled-components (CSS) de forma dinâmica.
   * O comando !! converte o valor da variável de forma que seja passado um booleano indicando
   * verdadeiro/falso conforme seu preenchimento. Por exemplo:
   * Se a variável estiver preenchida a primeira ! converte para "true" e a segunda ! para "false",
   * indicando que não há erro, já se a variável não estiver preenchida será informado o contrário:
   * primeira ! converte para "false" e a segunda ! para "true", indicando que há erro.
   */

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Informe o nome do repositório no Github"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {
        /**
         * Condicional simples para exibição do componente apenas se a variável estiver preenchida,
         * onde o primeiro valor é a variável a ser verificada e o segundo é o componente a ser
         * exibido.
         */
        inputError && <Error>{inputError}</Error>
      }

      <Repositories>
        {repositories.map(repository => (
          /**
           * O componente Link do "react-router-dom" funciona como o elemento "a" do HTML,
           * onde a propriedade "to" é equivalente ao "href", devendo ser passada a rota para
           * a qual será direcionada.
           */
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
