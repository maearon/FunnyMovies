import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';

class index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      autoCompleteResults: [],
      itemSelected: {},
      showItemSelected: false
    };

    $.getJSON('/api/v1/users?q=' + this.state.term)
      .then(response => this.setState({ autoCompleteResults: response.users }))
  }

  getAutoCompleteResults(e){
    this.setState({
      term: e.target.value
    }, () => {
      $.getJSON('/api/v1/users?q=' + this.state.term)
        .then(response => this.setState({ autoCompleteResults: response.users }))
    });
  }

  render(){
    let autoCompleteList = this.state.autoCompleteResults.map((response) => {
      return <ul class="users">
        <li>
          <img alt={response.name} class='gravatar' src={response.gravatar_url} />
          <a href={response.url}>{response.name}</a>
            | <a data-confirm="You sure?" rel="nofollow" data-method="delete" href={response.url} data-remote="true" class={"user-" + response.id}>delete</a>
        </li>
      </ul>
    });

    return (
      <div>
        <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='search' placeholder='Search Name' class='form-control' />
        { autoCompleteList }
      </div>
    )
  }
}

export default index;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <index />,
    document.body.appendChild(document.createElement('div')),
  )
});
