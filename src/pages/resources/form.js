const React = require('react')
const Db = require('../../components/db')

const { Redirect } = require('react-router')

const { set, lensProp, path } = require('ramda')

// pure functions
const addId = set(lensProp('_id'), (new Date()).toISOString())
const setValue = (field, value) => set(lensProp(field), value)
const valueOf = (field, obj) => path(['state', 'resource', field], obj)

const ResourceForm = React.createClass({
  getInitialState () {
    return {
      success: false,
      resource: {
        title: '',
        reference: ''
      }
    }
  },
  handleChange (field) {
    return e => {
      this.setState({
        resource: setValue(field, e.target.value)(
          this.state.resource
        )
      })
    }
  },
  handleSubmit (e) {
    e.preventDefault()
    this.props.db.put(addId(this.state.resource), (err, result) => {
      if (err) return this.setState({
        error: err.message,
        success: false
      })
      this.setState({success: true})
    })
  },
  render() {
    return (
      <div>
        { this.state.success ? <Redirect to="/" /> : null }
        { this.state.error ? <pre><code>{path(['state','error'], this)}</code></pre> : null }
        <h3>New Resource</h3>
        <p>Create a new resource</p>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="six columns">
              <label>Title</label>
              <input
                type="text"
                className="u-full-width"
                onChange={this.handleChange('title')}
                value={valueOf('title', this)} />
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label>Reference</label>
              <input
                type="text"
                className="u-full-width"
                onChange={this.handleChange('reference')}
                value={valueOf('reference', this)} />
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <button className="button-primary">Submit</button>
              <a className="button" style={{marginLeft: '4px'}} href="/">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = Db(ResourceForm)
