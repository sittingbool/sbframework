# Deploy Hints

## Initial NPM deployment

Add access level because otherwise it would be restricted by default and need a paid account to publish.

    npm publish -w @sbfw/core --access public

After that its fine to just do

    npm publish -w @sbfw/core