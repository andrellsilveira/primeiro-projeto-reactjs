import styled from 'styled-components';
import { shade } from 'polished';

/**
 * As crases ` são utilizadas como "templates literal" para possibilitar
 * a utilização das propriedades CSS de forma tradicional e permitir o uso
 * de variáveis javascript diretamente dentro dos estilos CSS
 */

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 480px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.form`
  margin-top: 48px;
  max-width: 700px;
  display: flex;

  /**
  * É possível realizar o encadeamento dos elementos CSS, de forma que não seja necessário
  * utilizar a sintaxe "form input", "form button", para adicionar estilos aos componentes
  * filhos
  */
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;

    /**
    * Utiliza-se :: para acessar uma propriedade do elemento
    */
    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border: 0;
    border-radius: 0 5px 5px 0;
    font-weight: bold;
    color: #fff;
    transition: background-color 0.2s;

    /**
    * É possível referenciar um elemento utilizando a notação do &, dessa forma não é necessário
    * a repetição de um mesmo elemento dentro do CSS para adicionar estilos diferente aos seus
    * eventos
    */
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    /**
    * Aplica a estilização nos elementos "a" precedidos de outro elemento "a",
    * nesse caso indicado pelo comando &, assim o estilo será aplicado somente a partir
    * do segundo elemento
    */
    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    /**
    * Estilização dos ícones incluídos no React Icons
    */
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
