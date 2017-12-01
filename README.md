# gitlab-standard-labels [![stability][0]][1]

Create a standard set of issue labels for a GitLab CE project via API

## Installation
Install the package
```bash
npm install --save gitlab-standard-labels
```

Copy the example configuration
```bash
cp config.example.json config.json
```

Set the configuration in `config.json`
```json
{
    "host":"https://gitlab.example.com",
    "token":"Your-Private-Token"
}
```

## Usage
```txt
  Usage:
    $ gitlab-standard-labels <project-id>

  Commands:
    <default>   Create a set of labels for a project

  Options:
    -d, --delete    Delete previous existing labels
    -h, --help      Print usage
    -v, --version   Print version
```


## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
