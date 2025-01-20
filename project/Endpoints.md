# Endpoints by project

## Posts

- Список, пагинация и сортировка 

`GET posts/list?sort=&<[-]time|likes|comments|popular>&page=<number>`

- Поиск

`GET posts/search?q=<query>`

- Получение детальной информации по публикации

`GET posts/:id`

- Создание

`POST posts/create`

- Редактирование

`PATCH posts/edit`

- Удаление

`DELETE posts/:id`

## Users

- Детальная информация о пользователе

`GET users/:id`

- Редактирование пользователя

`PATCH users/:id`

- Удаление пользователя

`DELETE users/:id`


## Authentication

- Регистрация

`POST auth/register`

- Авторизация

`POST auth/login`
