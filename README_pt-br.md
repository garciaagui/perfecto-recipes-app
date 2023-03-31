<a name="readme-top"></a>

<h1 align="center">Projeto App de Receitas (Perfecto) 🧑‍🍳</h1>

> [🇺🇸 Click here to access the English version.](README.md)

## Sumário

<ol>
  <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#como-executar-o-projeto">Como Executar o Projeto</a></li>
  <li><a href="#sobre-a-trybe">Sobre a Trybe</a></li>
  <li><a href="#equipe-de-desenvolvimento">Equipe de Desenvolvimento</a></li>
</ol>

## Sobre o Projeto

Projeto **16** do curso de Desenvolvimento Web da [Trybe][trybe-site-url].

Este projeto é uma aplicação que oferece uma série de receitas de comidas e bebidas, além de permitir que a pessoa usuária salve as suas receitas favoritas e possa executá-las seguindo um passo a passo. O layout tem como foco dispositivos móveis (360 x 640).

A base de dados utilizada provêm de duas APIs distintas: [The MealDB](https://www.themealdb.com) para as receitas de comidas e [TheCockTailDB](https://www.thecocktaildb.com/api.php) para as receitas de bebidas.

O projeto foi realizado em <a href="#equipe-de-desenvolvimento">equipe</a>, com a adoção da metodologia ágil e dos frameworks Scrum e Kanban. O Scrum foi utilizado para gerenciar o projeto, enquanto o Kanban acompanhava as tarefas e permitia uma visualização das atividades.

[![Projeto App de Receitas][project-demo]][project-url]

<br/>

## Tecnologias

<details>
  <summary><strong>💻 Desenvolvimento </strong></summary><br />

- [HTML5][html5-url]
- [CSS3][css3-url]
- [JavaScript][javascript-url]
- [Bootstrap][bootstrap-url]
- [React.js][react-url]
- [React Router][react-router-url]
- [Redux][redux-url]

---

</details>

<details>
  <summary><strong>🧪 Testes </strong></summary><br />

- [Jest][jest-url]
- [React Testing Library][rtl-url]

---

</details>

<details>
  <summary><strong>✨ Alinhamento e qualidade de código </strong></summary><br />

- [ESLint][eslint-url]
- [StyleLint][stylelint-url]

---

</details>

<br/>

## Funcionalidades

<ul>
  <li>Consultar receitas de comidas e bebidas.</li>
  <li>Pesquisar receitas pelo nome, ingredientes e primeira letra (do nome).</li>
  <li>Filtrar receitas por categoria pré-determinadas.</li>
  <li>Favoritar receitas.</li>
  <li>Compartilhar receitas.</li>
  <li>Executar um passo a passo para realizar a receita. Caso todos os passos sejam executados, a receita é considerada concluída.</li>
  <li>Acesso à área do usuário, na qual é possível remover receitas favoritadas e receitas concluídas.</li>
  <li>Filtrar receitas favoritadas e concluídas por comidas e bebidas.</li>
</ul>

<br/>

## Como Executar o Projeto

> ℹ️ Caso deseje somente testar a aplicação, [clique aqui][project-url].

Para rodar o projeto localmente, siga os passos abaixo.

1. Clone o repositório;

```
git clone git@github.com:garciaagui/perfecto-recipes-app.git
```

2. Navegue até a raiz do projeto;

```
cd perfecto-recipes-app/
```

3. Instale as dependências;

```
npm install
```

4. Inicialize o projeto;

```
npm run start
```

5. Ao iniciar a aplicação no navegador, ajuste a resolução de tela para `360 x 640` (360 pixels de largura por 640 pixels de altura) para uma melhor experiência. Você pode utilizar o plugin [Window Resizer](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en) para ajustar as dimensões facilmente.

6. Para executar os testes, utilize o comando abaixo.

```
npm run test-coverage
```

<br/>

## Sobre a Trybe

_"A [Trybe][trybe-site-url] é uma escola do futuro para qualquer pessoa que queira melhorar de vida e construir uma carreira de sucesso em tecnologia, onde a pessoa só paga quando conseguir um bom trabalho."_

_"O programa conta com mais de 1.500 horas de aulas online, aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais._"

<br/>

## Equipe de Desenvolvimento

Confira as redes sociais e meios de contato dos integrantes da equipe responsável pelo desenvolvimento deste projeto 👇

- Guilherme Garcia | [Email][email-guilherme] - [LinkedIn][linkedin-guilherme] - [GitHub][github-guilherme]

- Isaque Almeida | [Email][email-isaque] - [LinkedIn][linkedin-isaque] - [GitHub][github-isaque]

- Marco Túlio Vilaça Diniz | [Email][email-marcos] - [LinkedIn][linkedin-marcos] - [GitHub][github-marcos]

- Ruham Leal Dos Santos Sutil | [Email][email-ruham] - [LinkedIn][linkedin-ruham] - [GitHub][github-ruham]

<p align="right"><a href="#readme-top">Voltar ao topo</a></p>

<!-- MARKDOWN LINKS & IMAGES -->

[trybe-site-url]: https://www.betrybe.com/
[project-demo]: ./project-demo.gif
[project-url]: https://recipes-perfecto-app.vercel.app

<!-- Stacks URLs -->

[bootstrap-url]: https://getbootstrap.com/
[css3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[eslint-url]: https://eslint.org/
[html5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[jest-url]: https://jestjs.io/
[react-url]: https://reactjs.org/
[react-router-url]: https://reactrouter.com/en/main
[redux-url]: https://redux.js.org/
[rtl-url]: https://testing-library.com/docs/react-testing-library/intro/
[stylelint-url]: https://stylelint.io/

<!-- Contact Badges -->

[gmail-badge]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[outlook-badge]: https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[github-badge]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[instagram-badge]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white

<!-- Contact URLs -->

[email-guilherme]: mailto:garciaguig@gmail.com
[linkedin-guilherme]: https://www.linkedin.com/in/garciaagui/
[github-guilherme]: https://github.com/garciaagui
[email-isaque]: mailto:isaque.santos@ufpe.br
[linkedin-isaque]: https://www.linkedin.com/in/isaque-f-s-almeida/
[github-isaque]: https://github.com/IsaqueAlmeida
[email-marcos]: mailto:marcotuliodiniz2257@gmail.com
[linkedin-marcos]: https://www.linkedin.com/in/marcotuliovd/
[github-marcos]: https://github.com/marcotuliovd
[email-ruham]: mailto:ruhamxlpro@hotmail.com
[linkedin-ruham]: https://www.linkedin.com/in/ruham-leal/
[github-ruham]: https://github.com/RuhamLeal
