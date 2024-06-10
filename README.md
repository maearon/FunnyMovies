# FunnyMovies
A web app for sharing YouTube videos.

```
npm create vite@latest
cd client
npm i 
npm run dev
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version ```3.3.2```
```
nvm install v22.2.0
nvm alias default v22.2.0
nvm use default
sudo apt update
sudo apt upgrade
rbenv install --list-all
git -C /home/manhpc/.rbenv/plugins/ruby-build pull
rbenv install 3.3.2
ruby -v
rbenv global 3.3.2
cd FunnyMovies/
rbenv global 3.3.2
rbenv local 3.3.2
gem install bundler --no-document
gem update --system 3.5.11
gem install rails -v 7.1.3.4
gem install rubocop
rbenv rehash
rm /home/manhpc/.rbenv/shims/.rbenv-shim
rbenv rehash
cd FunnyMovies/
rails new api  --api --database=postgresql
cd api/
rm -rf .git
cd ..
git add api/
git commit -m "Add API files"
git push --set-upstream origin main
git config --global push.default current (or upstream)
cd api/
rails g scaffold Video url:string description:text
```
* System dependencies

* Configuration
```
cd api/
rails s
---> http://127.0.0.1:3000/
```
* Database creation
```
rails db:create
rails db:migrate
```
* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
