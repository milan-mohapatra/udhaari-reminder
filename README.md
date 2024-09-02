# Udhaari Reminder

This is the best tool to get your Udhaari mony back by sending them embarrassing jokes and emotional blackmailing.

## Tech Stack
- React.js
- Materia UI
- Node.js
- Express.js
- MongoDB

## How to use it
1. Open your terminal "udhaari-reminder" folder.
2. Navigate to both "client" and "server" folder and run command `npm install`
3. Then open `.env` file of `server` folder and use your mongodb atlas userid and password.
4. Then run `npm run dev` in both client and server folder.
5. Also check PORT numbers and URLS for any path error.
6. The first user in this BD is admin and has dashboard access.

## USP: Funny emails
![ss](https://i.ibb.co/jfC8nXB/ss.png)

### AUTH UI
![auth ss](https://i.ibb.co/Bgt5Cpp/auth.png)

### HOME UI
![home ss](https://i.ibb.co/jTJkG84/Udhaari-Reminder.png)

### ADMIN DASHBOARD UI
![admin ss](https://i.ibb.co/XFdLcqP/Udhaari-Reminder-1.png)

## API DOC

|  | METHOD | URL | AUTH | ACCESS | BODY | RESPONSE | DESCRIPTION |
|--|--------|-----|------|--------|------|----------|-------------|
|01.| POST | /api/v1/auth/signup | no | public | `{name, email, password}` | `{token}` | Sign up |
|02.| POST | /api/v1/auth/login | no | public | `{email, password}` | `{token}` | Login |
|03.| POST | /api/v1/borrowers/email | yes | private | `{borrowerName, borrowerEmail, borrowingAmount, yourMessage}` | `message` | Send reminder to borrower |
|04.| GET | /api/v1/admin/users | admin | NA | NA | `[{user}]` | Get all users |
|05.| DELETE | /api/v1/admin/users/:userId | admin | NA | NA | `message` | Delete a user |

> The first user is admin by default