# networkingNodes-backend

Бэкенд для [networking-nodes-web](https://github.com/andreymesh/networking-nodes-web)
Для запуска бэка потребуется сделать следующее:
* Установить (если еще не установили) [Node.js](https://nodejs.org/) и [PostgreSQL](https://www.postgresql.org/), где будет создан сервер с БД.
* В корневой папке проекта создать файл с расширением **.env** :
```sh
PORT = 3001
DATABASE_URL = postgres://user:password@example.com:5432/dbname
```
* После выполнить в терминале следующие команды:
```sh
cd networkingNodes-backend
npm install
npm run migrate up
npm start
```
