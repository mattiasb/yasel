# Yasel

Yasel (Yasnippet Expand License) outputs commented license snippets for use with Emacs and Yasnippet from a directory of snippet templates.

    Usage: yasel <src> <dest> [options]
    
    src      Path to the license template directory
    dest     Path to your snippets directory
    
    Options:
       -c FILE, --modes-config FILE   Path to modes config.  [./.yasel.json]
       -h, --help                     Show this help.

Example `~/.emacs.d/.yasel.json`:

```json
{
    "c-mode": {
        "pre":  "/*",
        "body": " * ",
        "post": " */"
    },
    "c++-mode": {
        "pre":  "/*",
        "body": " * ",
        "post": " */"
    },
    "emacs-lisp-mode": {
        "body": ";; "
    },
    "go-mode": {
        "pre":  "/*",
        "body": " * ",
        "post": " */"
    },
    "haskell-mode": {
        "body": "-- "
    },
    "js-mode": {
        "pre":  "/*",
        "body": " * ",
        "post": " */"
    },
    "lua-mode": {
        "pre":  "--[[",
        "body": "  * ",
        "post": "--]]"
    },
    "sh-mode": {
        "body": "# "
    }
}
```
