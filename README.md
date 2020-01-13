# Screen Docs админка - веб часть

## Содержание
- [Структура проекта](#Структура-проекта)
- [Как развернуть образ](#Как-развернуть-образ)
- [Поднять контейнер](#Поднять-контейнер)
- [Частые команды Docker](#Частые-команды-Docker)
- [Возникающие сценарии при работе Docker](#)
- [Права .ssh директории и её содержимого](#)

## Структура проекта
| Папка/файл | Назначение |
| ------ | ------ |
| `docker-compose.yml` | Здесь указываются версии python, django и др., имя образа и другие настройки для Dockerfile |
| `Dockerfile` | Запускает развертывание ОС и её окружения, устанавливает и настраивает необходимые приложения |
| `.env` | Файл с настройками среды |
| `public` | Папка с индексным файлом проекта |
| `src` | В этой хранится весь исходный код проекта и здесь ведётся вся разрабока |
| `main.js` | Точки старта приложения. Здесь происходит регистрация всех компонентов |
| `App.vue` | Главный компонент |

## Как развернуть образ
##### Клонировать проект
```sh
git clone git@bitbucket.org:screendocs/admin-web.git
cd admin-web/
```
#### Скопировать env.example в .env
- Если нужно, отредактировать хост

#### Сбилдить образ и поднять контейнер
```
docker-compose up -d --build
```
---
## Частые команды Docker
##### Посмотреть образы
```sh
docker images
```
##### Посмотреть контейнеры
```sh
docker ps -a
```
##### Сбилдить образ и поднять контейнер
```sh
docker-compose up -d --build
```
##### Зайти в контейнер
- `092b52ba54b0` - имя контейнера
```sh
docker exec -ti 092b52ba54b0 sh
```
##### Остановить контейнер (по его ID)
```sh
docker stop 092b52ba54b0
```
##### Удалить контейнер (по его ID)
```sh
docker rm 092b52ba54b0
```
##### Удалить все контейнеры со статусом exited
```sh
docker rm $(docker ps -a -q -f status=exited)
```
##### Удалить образ
- `sdocs` - имя образа, `v1` - его тэг
```sh
docker rmi sdocs:v1
```
##### Удалить все "висячие" образы
```sh
docker rmi $(docker images -f "dangling=true" -q)
```
##### Очистить/удалить всё, кроме контейнеров со статусом Up
```sh
docker system prune
```
##### Очистить/удалить всё и образы, кроме контейнеров со статусом Up и их образов
```sh
docker system prune -a
```
---
## Возникающие сценарии при работе Docker
#### Если контейнер был запущен, но вдруг ушёл в статус `Exited`
##### Стартануть контейнер
```sh
docker start 092b52ba54b0
```
---
## Права `.ssh` директории и её содержимого
| Папка/файл | Права |
| ------ | ------ |
| `.ssh` | 700 |
| `id_rsa` | 600 |
| `id_rsa.pub` | 600 |
| `config` | 700 |
| `known_hosts` | 700 |
---
## Ссылки
https://dillinger.io
