# gitlab-standard-labels [![stability][0]][1]

Create a standard set of issue labels and board lists for a GitLab CE project via API.

## Installation
Install the package
```bash
npm install gitlab-standard-labels
```

Copy the example configuration
```bash
cp config.example.json config.json
```

Set the configuration in `config.json`
```json
{
    "host":"https://gitlab.example.com",
    
    "token":"Your-Private-Token",
    
    "labels":[...]
}
```
> *Note:* you can get the private token from your account settings. The token can also be set as a command argument.

## Usage
```txt
  Usage:
    $ gitlab-standard-labels <project-id|project-name>

  Commands:
    <default>   Create a set of labels for a project

  Arguments:
    <project-id|project-name>   `project-id` is the numeric ID of the repository
                                `project-name`is the the namespaced repository name (eg. "group/repo")

  Options:
      -t, --token=    The authentication token, overwrites the token in config.json, if defined
      -d, --delete    Delete previous existing labels and board lists before the creation
      -b, --board     Create default board lists
      -h, --help      Print usage
      -v, --version   Print version
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
