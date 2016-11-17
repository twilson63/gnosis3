const React = require('react')
const { pluck } = require('ramda')

const Db = require('../../components/db')

const Resources = React.createClass({
  getInitialState() {
    return {
      resources: []
    }
  },
  componentDidMount() {
    this.props.db.allDocs({
      include_docs: true
    }, (e,r) => {
      if (e) return this.setState({ error: e.message })
      this.setState({resources: pluck('doc', r.rows)})
    })
  },
  render () {
    const listResource = resource =>
      <li key={resource._id}>
        <a href="/">{resource.title}</a>
      </li>
    
    return (
    <div>

      <div className="row">
        <div className="six columns">
          <a href="/new" className="button button-primary">Add Resource</a>
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <h3>Resources</h3>

          <ul>
            {this.state.resources.map(listResource)}
          </ul>
        </div>
      </div>
    </div>
    )
  }
})

module.exports = Db(Resources)
