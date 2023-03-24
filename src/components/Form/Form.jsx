import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../Form/Form.module.css';
import PropTypes from 'prop-types';

export class InputForm extends Component {
  state = {
    name: '',
    number: '',
  };

  inputHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  submitHandler = e => {
    e.preventDefault();

    const { name, number } = this.state;

    if (this.props.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts!`);
      this.setState({
        name: '',
        number: '',
      });
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.props.newContactAdding(newContact);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div>
        <form name="inputForm" onSubmit={this.submitHandler}>
          <label htmlFor="name">
            <p>Name: </p>
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.inputHandler}
              value={this.state.name}
            />
          </label>
          <label htmlFor="number">
            <p>Number: </p>
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.inputHandler}
              value={this.state.number}
            />
          </label>
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

InputForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
