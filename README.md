# JavaScript_Test_Task_Kaspersky_Kiselev_Roman
A react application that displays a list of users
**Options**
- search by username;
- add/delete users
- add/delete groups
- change routes: home/users;
- sort users alphabetically in up/down orders;

The json-server was used as a server to store the data
____
**Launching:**
1. Clone this repo and go to it:
``` sh
git clone git@github.com:dcahall/JavaScript_Test_Task_Kaspersky_Kiselev_Roman.git && cd JavaScript_Test_Task_Kaspersky_Kiselev_Roman/
```
2. Install all npm packages:
``` sh
npm i
```
3. Start json server in terminal:
``` sh
npx json-server --watch data/db.json --port 8000
```

4. Run the module builder in other terminal:
``` sh
npm start
```
____
**Stack**
- ReactJS + hooks
- React Router
- CSS/SCSS
___
**PS:**
Неправильно понял задание, поэтому реализовал только 1 вид отображения данных
