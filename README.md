# MongoDB Express Node Authentication Api

## Api Endpoints

### Signup

- /api/signup

```javascript
  {
  "name":"Name",
  "email":"Email",
  "password":"Password"
  }
```

### Signin

- /api/signin

```javascript
  {
  "email":"Email",
  "password":"Password"
  }
```

### Signout

- /api/signout

### Signed

- /api/signed

### Only For Signed Users Access

- /secret/:userId

### Only For Admin Access

- /api/admin/:userId
