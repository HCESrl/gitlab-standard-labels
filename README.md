# gitlab-standard-labels [![stability][0]][1]

Create a standard set of issue labels and board lists for a GitLab CE project via API.

## Installation
Install the package globally:
```bash
npm install -g HCESrl/gitlab-standard-labels
```

Optionally set the private token:
```bash
npm config set gitlab-standard-labels.token your-private-token
```

> *Note:* you can get the private token from your account settings. The token can also be set as a command argument.

## Usage
```txt
  Usage:
    $ gitlab-standard-labels <repository-url>

  Commands:
    <default>   Create a set of labels for a project

  Arguments:
    <repository-url>   The complete URL to the repository (eg. https://gitlab.example.com/group/name)

  Options:
      -t, --token=    The authentication token, overwrites the token in config.json, if defined
      -d, --delete    Delete previous existing labels and board lists before the creation
      -b, --board     Create default board lists
      -h, --help      Print usage
      -v, --version   Print version
```

### Examples
Create the default labels:
```bash
gitlab-standard-labels https://gitlab.example.com/group/name
```

Create the default labels, delete any existing label:
```bash
gitlab-standard-labels -d https://gitlab.example.com/group/name
```

Create the default labels and board lists, delete any existing label or list:
```bash
gitlab-standard-labels -bd https://gitlab.example.com/group/name
```

Create the default labels using a custom token:
```bash
gitlab-standard-labels -b --token=some-other-token https://gitlab.example.com/group/name
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
