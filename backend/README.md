# CodeLearn Backend (کدلرن)

A Django REST Framework backend for the **CodeLearn** (کدلرن) online learning platform, providing phone-based authentication and user management via OAuth2.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Reference](#api-reference)
- [User Roles](#user-roles)
- [Authentication Flow](#authentication-flow)

---

## Features

- Phone number–based OTP authentication (no password required)
- OAuth2 token issuance (access + refresh tokens) on successful verification
- Custom user model with role-based access (`student`, `instructor`, `support`, `admin`)
- User avatar and bio support
- SMS delivery via [SMS.ir](https://sms.ir) with a sandbox mode for development
- Rotating refresh tokens

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Django 6.0.4 |
| REST API | Django REST Framework 3.17 |
| Authentication | django-oauth-toolkit 3.2 |
| Phone Verification | django-phone-verify 3.3 |
| SMS Gateway | smsir-python (SMS.ir) |
| Database | SQLite (default) |
| Config | environs / python-dotenv |

---

## Project Structure

```
code-learn-back/
├── code_learn/          # Django project package
│   ├── settings.py      # Project settings
│   ├── urls.py          # Root URL configuration
│   ├── sms_backend.py   # SMS.ir backend (live + sandbox)
│   ├── asgi.py
│   └── wsgi.py
├── users/               # Users app
│   ├── models.py        # Custom User model
│   ├── views.py         # SMSVerificationViewSet
│   ├── urls.py          # App URL configuration
│   ├── admin.py
│   └── migrations/
├── manage.py
├── requirements.txt
└── .env                 # Environment variables (not committed)
```

---

## Prerequisites

- Python 3.11+
- pip

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hossein-Mofidi/code-learn-back.git
   cd code-learn-back
   ```

2. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file** in the project root (see [Environment Variables](#environment-variables))

5. **Apply migrations**

   ```bash
   python manage.py migrate
   ```

6. **Create an OAuth2 Application** (required for token issuance)

   ```bash
   python manage.py shell
   ```

   ```python
   from oauth2_provider.models import Application
   Application.objects.create(
       name='webapp',
       client_type=Application.CLIENT_CONFIDENTIAL,
       authorization_grant_type=Application.GRANT_PASSWORD,
   )
   ```

7. **Create a superuser** (optional)

   ```bash
   python manage.py createsuperuser
   ```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Django
DEBUG=True

# SMS.ir credentials
SMS_API_KEY=your_sms_ir_api_key
SMS_SANDBOX_KEY=your_sms_ir_sandbox_key
SMS_FROM_NUMBER=your_sender_number
```

| Variable | Description |
|---|---|
| `DEBUG` | Set to `True` in development, `False` in production |
| `SMS_API_KEY` | Live API key from [SMS.ir](https://sms.ir) |
| `SMS_SANDBOX_KEY` | Sandbox API key from SMS.ir |
| `SMS_FROM_NUMBER` | Sender phone number registered with SMS.ir |

> **Note:** In sandbox mode, the OTP code is always `123456` and no real SMS is sent.

---

## Running the Project

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

---

## API Reference

### Base URL

```
/api/v1/users/
```

### Endpoints

#### Request OTP

Sends a one-time password to the provided phone number.

```
POST /api/v1/users/auth/phone/register/
```

**Request body:**

```json
{
  "phone_number": "09123456789"
}
```

**Response:**

```json
{
  "session_token": "<session_token>"
}
```

---

#### Verify OTP and Obtain Tokens

Verifies the OTP code and returns OAuth2 tokens. Creates the user if they do not exist yet.

```
POST /api/v1/users/auth/phone/verify/
```

**Request body:**

```json
{
  "phone_number": "09123456789",
  "session_token": "<session_token>",
  "security_code": "123456"
}
```

**Response:**

```json
{
  "access_token": "<access_token>",
  "refresh_token": "<refresh_token>",
  "token_type": "Bearer",
  "expires_in": "<expiry_datetime>",
  "user_id": 1,
  "role": "student",
  "is_new_user": true
}
```

---

### Token Details

| Token | Expiry |
|---|---|
| Access Token | 10 hours (36 000 seconds) |
| Refresh Token | 30 days (2 592 000 seconds) |

Refresh tokens rotate on every use.

---

## User Roles

| Role | Description |
|---|---|
| `student` | Default role assigned on registration |
| `instructor` | Course instructor |
| `support` | Support staff |
| `admin` | Platform administrator |

---

## Authentication Flow

```
Client                          Server
  │                                │
  │  POST /auth/phone/register/    │
  │ ──────────────────────────────►│
  │  { phone_number }              │  Sends OTP via SMS.ir
  │◄──────────────────────────────-│
  │  { session_token }             │
  │                                │
  │  POST /auth/phone/verify/      │
  │ ──────────────────────────────►│
  │  { phone_number,               │  Validates OTP
  │    session_token,              │  Creates user if needed
  │    security_code }             │  Issues OAuth2 tokens
  │◄───────────────────────────────│
  │  { access_token,               │
  │    refresh_token, ... }        │
```

Subsequent authenticated requests must include the access token as a Bearer token:

```
Authorization: Bearer <access_token>
```
