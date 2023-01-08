#!/usr/bin/env bash

set -e

if [[ ! -f "content/data/ghost.db" ]]; then
    echo "Make sure to fork this repl before continuing. Otherwise your changes will not be saved."
    echo "Make sure your repl is private so your SQLite database is not publicly accessible."
    
    node index.js

    cp content/data/ghost.new.db content/data/ghost.db
fi

exec ghost run
