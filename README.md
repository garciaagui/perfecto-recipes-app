<a name="readme-top"></a>

<h1 align="center">Project Recipes App (Perfecto) 🧑‍🍳</h1>

> [🇧🇷 Clique aqui para acessar a versão em português.](README_pt-br.md)

## Summary

<ol>
  <li><a href="#description">Description</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#how-to-run">How to Run</a></li>
  <li><a href="#about-trybe">About Trybe</a></li>
  <li><a href="#development-team">Development Team</a></li>
</ol>

## Description

**16th project** of the [Trybe][trybe-site-url] Web Development course.

This project is an application that offers a variety of food and drink recipes, allowing the user to save their favorite recipes and follow a step-by-step guide to execute them. The layout focuses on mobile devices (360 x 640).

The database used comes from two distinct APIs: [The MealDB](https://www.themealdb.com) for food recipes and [TheCockTailDB](https://www.thecocktaildb.com/api.php) for drinks recipes.

The project was developed by a <a href="#development-team">team</a> using agile methodology and Scrum and Kanban frameworks. Scrum was used to manage the project, while Kanban tracked tasks and allowed visualization of activities.

[![Project Recipes App][project-demo]][project-url]

<br/>

## Technologies

<details>
  <summary><strong>💻 Development </strong></summary><br />

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
  <summary><strong>🧪 Testing </strong></summary><br />

- [Jest][jest-url]
- [React Testing Library][rtl-url]

---

</details>

<details>
  <summary><strong>✨ Code alignment and quality </strong></summary><br />

- [ESLint][eslint-url]
- [StyleLint][stylelint-url]

---

</details>

<br/>

## Features

<ul>
  <li>Browse through food and drink recipes.</li>
  <li>Search for recipes by name, ingredient, or first letter (of the name).</li>
  <li>Filter recipes by predetermined categories.</li>
  <li>Favorite recipes.</li>
  <li>Share recipes.</li>
  <li>Follow a step-by-step guide to make the recipe. If all steps are completed, the recipe is considered done.</li>
  <li>Access the user area, where it is possible to check and remove favorited and completed recipes.</li>
  <li>Filter favorited and completed recipes by food and drinks.</li>
</ul>

<br/>

## How to Run

> ℹ️ If you only want to test the application, [click here][project-url].

To run the project locally, follow the steps below.

1. Clone the repository;

```
git clone git@github.com:garciaagui/perfecto-recipes-app.git
```

2. Navigate to the project root directory;

```
cd perfecto-recipes-app/
```

3. Install the dependencies;

```
npm install
```

4. Start the project;

```
npm run start
```

5. When the application starts in the browser, adjust the screen resolution to 360 x 640 (360 pixels wide by 640 pixels tall) for a better experience. You can use (for Google Chrome) the [Window Resizer](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en) plugin to easily adjust the dimensions.

6. To run the tests, use the command below.

```
npm run test-coverage
```

<br/>

## About Trybe

_"[Trybe][trybe-site-url] is a future school for anyone who wants to improve their lives and build a successful career in technology, where the person only pays when they get a good job."_

_"The program features over 1,500 hours of online classes covering introduction to software development, front-end, back-end, computer science, software engineering, agile methodologies, and behavioral skills."_

<br/>

## Development Team

Check out the social networks and means of contact of the team members responsible for the development of this project 👇

- Guilherme Garcia | [Email][email-guilherme] - [LinkedIn][linkedin-guilherme] - [GitHub][github-guilherme]

- Isaque Almeida | [Email][email-isaque] - [LinkedIn][linkedin-isaque] - [GitHub][github-isaque]

- Marco Túlio Vilaça Diniz | [Email][email-marcos] - [LinkedIn][linkedin-marcos] - [GitHub][github-marcos]

- Ruham Leal Dos Santos Sutil | [Email][email-ruham] - [LinkedIn][linkedin-ruham] - [GitHub][github-ruham]

<p align="right"><a href="#readme-top">Back to top</a></p>

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
