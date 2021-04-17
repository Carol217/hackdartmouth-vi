# hackdartmouth-vi
HACK DARTMOUTH VI - Productivity Tool

## :pencil: Overview

To be updated.

## :zap: Technologies and Resources
- [Go](https://golang.org/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)

# :balloon: Try It Out
#### :warning: You must have `git`, `mongo`, and `go` installed.

1. Clone this repository

```
$ git clone https://github.com/Carol217/hackdartmouth-vi
```

2. Go into the `hackdartmouth-vi` directory

```
$ cd hackdartmouth-vi
```

3. Install web dependencies

```
$ cd web && yarn install
```

4. Build the web assets

```
$ yarn build
```

5. Navigate back to the project root

```
$ cd ..
```

6. Generate the secrets

- Copy the 64 bytes secret for authentication-key in config.toml
- Copy the 32 bytes secret for encryption-key and csrf-authentication-key in config.toml

```
$ go run scripts/secrets/generate_secrets.go
```

7. Build the backend

```
$ go build
```

8. Run the backend

```
$ ./hackdartmouth-vi --dev
```

## Notes
- The initial setup for the frontend was done via `yarn create react-app`
- The initial setup for the backend was done using [web-template](https://github.com/PGo-Projects/web-template) which helps to cut down
  on the boilerplate needed to get a server up and running.
