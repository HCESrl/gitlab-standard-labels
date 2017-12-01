# gitlab-standard-labels [![stability][0]][1]

Create a standard set of issue labels for a GitLab CE project via API

## Usage
```txt
  Usage:
    $ gitlab-standard-labels <project>

  Commands:
    <default>   Create a set of labels for a project

  Options:
    -d, --delete    Delete previous existing labels
    -h, --help      Print usage
    -v, --version   Print version
```

## Labels
```txt
duplicate             #ededed
greenkeeper           #ededed
starter               #ffc0cb
Priority: Critical    #ee0701
Priority: High        #d93f0b
Priority: Low         #0e8a16
Priority: Medium      #fbca04
Status: Abandoned     #000000
Status: Available     #c2e0c6
Status: Blocked       #ee0701
Status: In Progress   #cccccc
Status: On Hold       #e99695
Status: Proposal      #d4c5f9
Status: Review Needed #fbca04
Type: Bug             #ee0701
Type: Documentation   #5319e7
Type: Enhancement     #1d76db
Type: Maintenance     #fbca04
Type: Question        #cc317c
```


## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
