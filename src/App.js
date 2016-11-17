const React = require('react')
const {BrowserRouter, Match } = require('react-router')

const Resources = require('./pages/resources')
const ResourceForm = require('./pages/resources/form')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <h1>Gnosis</h1>
          <Match exactly pattern="/" component={Resources} />
          <Match pattern="/new" component={ResourceForm} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
