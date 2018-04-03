# A Visual Analysis of UK Number 1s

## In progress
Can see website so far at https://rushlet.github.io/ci301_data-vis/website/index.html

## Development

Run `npm install` to setup.

Run `gulp` to build. (If you get '`gulp: command not found`' then you may need to run `npm install --global gulp-cli`)

Use `npm install -g live-server` and run `live-server` for real time JS update

To run unit tests, run `npm run mocha` in the terminal. To generate a new report run `npm run mocha-report` (tests do not need to be run separately first).
To run cucumber tests, run `npm run cucumber` in the terminal (currently not set up)
You may first need to run `gem install bundler` the `bundle install`
To create a cucumber report run `cucumber features --format html > ./features/reports/report.html`
