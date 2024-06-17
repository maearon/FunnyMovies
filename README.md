# FunnyMovies
A web app for sharing YouTube videos.

```
email: someone@gmail.com
password: foobar
```

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
rails s -p 3001
---> http://127.0.0.1:3001/
API Endpoints
---> http://127.0.0.1:3001/rails/info/routes 
```
* Database creation
```
rails db:create
rails db:migrate
```
* Database initialization

* How to run the test suite
```
rails t
```

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
```
https://funny-movies-pied.vercel.app
https://railstutorialapi.onrender.com
```

* ...

```
npx create-next-app@latest
cd client
npm i 
npm run dev
---> http://127.0.0.1:3000/
```
* How to run the test suite e2e
```
cypress open
---> step-1-signup.cy.js
---> step-2-login.cy.js
```
