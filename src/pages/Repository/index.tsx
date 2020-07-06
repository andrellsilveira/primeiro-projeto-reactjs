import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

/**
 * Interface utilizada para definir os parâmetros da rota
 */
interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  /**
   * Recupera os parâmetros da rota utilizando a função "useRouterMatch" da biblioteca
   * "react-router-dom", passando como tipagem a interface criada para definição dos
   * parâmetros da rota.
   */
  const { params } = useRouteMatch<RepositoryParams>();

  /**
   * Inicializa o estado indicando que o valor pode ser um objeto no formato Repository ou nulo
   */
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    /**
     * Existem duas formas de executar requisições assíncornas independentes ao mesmo tempo., ou
     * seja, quando uma não de depende da resposta da outra.
     * A primeira é utilizando ".then" e recuperando a resposta, a segunda é utilizando o método
     * Promise.all que executará ao mesmo tempo todas as requisições informadas como parâmetro,
     * retornando as respostas como um array.
     */
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });

    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`),
    //   ]);
    // }

    // loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {
        /**
         * Indica que o componente só será exibido se a variável estiver preenchida
         */
        repository && (
          <RepositoryInfo>
            <header>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{repository.stargazers_count}</strong>
                <span>Stars</span>
              </li>
              <li>
                <strong>{repository.forks_count}</strong>
                <span>Forks</span>
              </li>
              <li>
                <strong>{repository.open_issues_count}</strong>
                <span>Issues abertas</span>
              </li>
            </ul>
          </RepositoryInfo>
        )
      }

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
