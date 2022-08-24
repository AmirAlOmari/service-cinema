# Service WMS

## Taskfile

This project uses [Taskfile](https://taskfile.dev/#/installation) over GNU Make.
An effort has been made to replicate the interface that is usually provided by Cubyn Makefiles.

### Installing Taskfile

Official installation instructions are listed on the Taskfile home page in the [installation section](https://taskfile.dev/#/installation).

MacOs users can use `Homebrew` :

```sh
brew install go-task/tap/go-task
```

or `Nix`.

Windows users can use `Chocolatey` or `Scoop`.
Linux (Ubuntu) users can use `Snap`, but proposed installed script seems to be the preferred solution.

_Warning to Fish users_: The installation script seems to have portability issues and you should launch it from bash.

### Launching a task

Use `task <taskname>` to launch a task.

Example:

```sh
task build
```

### Listing all available tasks

```sh
task -l
```

## Working on this project

Generally speaking, you will need:

- a running instance of [service-wcs](https://gitlab.com/cubyn/software/squad-automation/service-wcs-os2)
- a Camunda instance (containers available on Cubyn's [infra-docker-compose](https://github.com/cubyn/infra-docker-compose))
- a RabbitMQ broker (containers available on Cubyn's [infra-docker-compose](https://github.com/cubyn/infra-docker-compose))
- a Postgresql instance (containers available on Cubyn's [infra-docker-compose](https://github.com/cubyn/infra-docker-compose))
- to properly initialize the `.env` and `.env.test` files according to the `.env.tpl` file
- to create the corresponding databases manually

### Running Camunda

You may disable camunda with `ZEEBE_MOCK_ENABLED=true` (easiest option if your tests don't rely on it).

If you need to run tests in integration with Camunda, you can launch it with:

```sh
(cd /path/to/infra-docker-compose; docker-compose -f camunda-operate/docker-compose.yml up)
```

Then, make sure you correctly setup you `.env` file:

```diff
-ZEEBE_GATEWAY_URL=zeebe:26500
-ZEEBE_HEALTHCHECK_URL=zeebe:8080/actuator/health/liveness
+ZEEBE_GATEWAY_URL=localhost:26500
+ZEEBE_HEALTHCHECK_URL=localhost:8080/actuator/health/liveness
```

or add to your `/etc/hosts`:

```txt
127.0.0.1 zeebe
```

### Fixtures

You can populate all tables with a default data set using fixtures.
Fixtures are available on the [fixture sheet](https://docs.google.com/spreadsheets/d/1OZuK0dCTDPyoIIuLYF5FapcNqBlmRMp3edcFOqOCRJk/edit#gid=1014144461).
You can export them as JSON using the scripts available in the `Cubyn` drop-down menu.

When working on the staging environment favor using the fixtures 'Without locations' in order to not override all the locations that have been imported directly from Quicktron's RMS.
_NEVER_ reset the fixtures on the production environment as this will truncate all the tables.
