import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

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
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    /**
     * Evita o comportamento padrão do evento do elemento HTML, nesse caso o recarregar
     * da página no evento Submit do formulário
     */
    event.preventDefault();

    /**
     * É possível incluir a tipagem de retorno do response para a API, de forma que a variável
     * que recebrá os dados forneça os atributos do objeto retornado e não fique marcada como "any"
     */
    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Informe o nome do repositório no Github"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="Teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
