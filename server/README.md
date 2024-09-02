# Udhaari Reminder

## API Document

|  | METHOD | URL | AUTH | ACCESS | BODY | RESPONSE | DESCRIPTION |
|--|--------|-----|------|--------|------|----------|-------------|
|01.| POST | /api/v1/auth/signup | no | public | `{name, email, password}` | `{token}` | Sign up |
|02.| POST | /api/v1/auth/login | no | public | `{email, password}` | `{token}` | Login |
|03.| POST | /api/v1/borrowers/email | yes | private | `{borrowerName, borrowerEmail, borrowingAmount, yourMessage}` | `message` | Send reminder to borrower |
|04.| GET | /api/v1/admin/users | admin | NA | NA | `[{user}]` | Get all users |
|05.| DELETE | /api/v1/admin/users/:userId | admin | NA | NA | `message` | Delete a user |

> The first user is admin by default