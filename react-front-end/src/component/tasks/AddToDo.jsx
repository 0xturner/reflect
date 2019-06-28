import React, { Component } from 'react';

export class AddTodo extends Component {
  state = {
    title: ''
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addToDo(this.state.title);
    this.setState({ title: '' });
  }

  onChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
        <input 
          type="text" 
          name="title"
          placeholder="Add Todo..." 
          value={this.state.title}
          onChange={this.onChange}
        />
        <input 
          type="submit"
          value="Submit"
          className="btn"
        />
      </form>
    )
  }
}

export default AddTodo;