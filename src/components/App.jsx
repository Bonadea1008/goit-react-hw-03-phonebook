import { Component } from 'react';

import { InputForm } from './Form/Form';
import { Section } from './Section/Section';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsLS = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLS);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getContacts = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  filterInputChange = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  filterInputSearch = () => {
    const { filter, contacts } = this.state;
    const normalizedFilterValue = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
  };

  contactDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <InputForm
            newContactAdding={this.getContacts}
            contacts={this.state.contacts}
          />
        </Section>
        <Section title="Contacts">
          <Filter
            filterInputHandler={this.filterInputChange}
            value={this.state.filter}
          />
          <Contacts
            contacts={
              this.state.filter.length > 0
                ? this.filterInputSearch()
                : this.state.contacts
            }
            contactDeleteHandler={this.contactDelete}
          ></Contacts>
        </Section>
      </>
    );
  }
}
