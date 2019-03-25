source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.1'

gem 'active_model_serializers'
gem 'acts_as_votable', '~> 0.12.0'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'foreman', '~> 0.82.0'
gem 'i18n'
gem 'jwt'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'rack-cors'
gem 'rails', '~> 5.2.2', '>= 5.2.2.1'
gem 'simple_command'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'doorkeeper'
  gem 'doorkeeper-jwt'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'letter_opener'
  gem 'pry'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 3.8'
  gem 'rubocop-performance'
  gem 'simplecov', require: false
end

group :test do
  gem 'database_cleaner'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end