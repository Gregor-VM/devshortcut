import tags from "../utils/tags";
import { GithubExample } from "../utils/utils";

// Note: Each title will be unique

const examples = [
  {
    title: 'Redux',
    tabs: [
      GithubExample('react', 'https://github.com/saini-vikas/Redux-tutorial'),
      GithubExample('react native', 'https://github.com/hybridheroes/redux-toolkit-example')
    ],
    tags: [tags.react, tags.storeManagament, tags.javascript]
  },
  {
    title: 'NgRx',
    tabs: [
      GithubExample('angular', 'https://github.com/Artikunazo/ngrx-angular-example'),
    ],
    tags: [tags.angular, tags.storeManagament, tags.javascript, tags.typescript]
  },
  {
    title: 'JWT',
    tabs: [
      GithubExample('nestjs', 'https://github.com/pejmanhadavi/real-world-example-nestjs-mongoose-jwt-auth'),
      GithubExample('express', 'https://github.com/bezkoder/node-js-express-login-mongodb'),
      GithubExample('go', 'https://github.com/sohamkamani/jwt-go-example'),
    ],
    tags: [tags.authentication, tags.express, tags.nestjs, tags.go, tags.javascript, tags.typescript, tags.nodejs]
  },
  {
    title: 'GraphQL',
    tabs: [
      GithubExample('express', 'https://github.com/juffalow/express-graphql-example'),
      GithubExample('spring-boot', 'https://github.com/eh3rrera/graphql-java-spring-boot-example'),
    ],
    tags: [tags.express, tags.grahql, tags.java, tags.springBoot, tags.api, tags.nodejs, tags.javascript]
  },
  {
    title: 'React Router',
    tabs: [
      GithubExample('react', 'https://github.com/zacharynoble/react-typescript-vite-tailwind-auth-template'),
    ],
    tags: [tags.react]
  },
  {
    title: 'Middleware',
    tabs: [
      GithubExample('express', 'https://github.com/luizcalaca/nodejs-middleware-express-api-template'),
    ],
    tags: [tags.express, tags.javascript, tags.nodejs]
  }
]

export type Example = typeof examples[0];

export default examples;
