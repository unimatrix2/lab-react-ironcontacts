import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'
import contacts from './contacts.json';

class App extends React.Component {
  state = {
    contacts,
    displayedContacts: [0, 1, 2, 3, 4],
    displaySorted: 0,
  };

  displayContacts = () => {
    if (this.state.displaySorted === 0) {
      const contactsToDisplay = this.state.displayedContacts.map(idx => {
        return (
          <tr key={this.state.contacts[idx].id} className="tr">
            <td className="td">
              <img src={this.state.contacts[idx].pictureUrl} alt="contact"/>
            </td>
            <td className="td align-text">{this.state.contacts[idx].name}</td>
            <td className="td align-text">{this.state.contacts[idx].popularity.toFixed(2)}</td>
            <td className="td"><button className="button is-danger" onClick={() => this.deleteContact(this.state.contacts[idx].id)}>Delete</button></td>
          </tr>
        );
      });
      return contactsToDisplay;
    } else if (this.state.displaySorted === 1) {
      const sorted = this.state.displayedContacts.map(idx => this.state.contacts[idx])
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(contact => {
      return (
        <tr key={contact.id} className="tr">
          <td className="td">
            <img src={contact.pictureUrl} alt="contact"/>
          </td>
          <td className="td align-text">{contact.name}</td>
          <td className="td align-text">{contact.popularity.toFixed(2)}</td>
          <td className="td"><button className="button is-danger" onClick={() => this.deleteContact(contact.id)}>Delete</button></td>
        </tr>
      )
    });
    return sorted;
    } else if (this.state.displaySorted === 2) {
      const sorted = this.state.displayedContacts.map(idx => this.state.contacts[idx])
      .sort((a, b) => a.popularity - b.popularity)
      .reverse()
      .map(contact => {
        return (
          <tr key={contact.id} className="tr">
          <td className="td">
            <img src={contact.pictureUrl} alt="contact"/>
          </td>
          <td className="td align-text">{contact.name}</td>
          <td className="td align-text">{contact.popularity.toFixed(2)}</td>
          <td className="td"><button className="button is-danger" onClick={() => this.deleteContact(contact.id)}>Delete</button></td>
        </tr>
        )
      });
      return sorted;
    }
  }

  addRandomContact = () => {
    const currentDisplayedIndexes = JSON.parse(JSON.stringify(this.state.displayedContacts));
    const currentDisplayedContacts = JSON.parse(JSON.stringify(this.state.displayedContacts)).map(idx => this.state.contacts[idx]);
    const remainingContacts = JSON.parse(JSON.stringify(this.state.contacts));
    currentDisplayedContacts.forEach(contact => {
      remainingContacts.splice(remainingContacts.map(c => c.name).indexOf(contact.name), 1)
    })
    const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)].name;
    currentDisplayedIndexes.push(this.state.contacts.map(c => c.name).indexOf(randomContact));
    this.setState({displayedContacts: currentDisplayedIndexes});
  }

  sortContactsName = () => {
    this.state.displaySorted !== 1 ? this.setState({displaySorted: 1}) : this.setState({displaySorted: 0});
  }

  sortContactsPopulatiry = () => {
    this.state.displaySorted !== 2 ? this.setState({displaySorted: 2}) : this.setState({displaySorted: 0});
  }

  deleteContact = (id) => {
    const currentDisplayedIndexes = JSON.parse(JSON.stringify(this.state.displayedContacts)).map(idx => this.state.contacts[idx].id);
    currentDisplayedIndexes.splice(currentDisplayedIndexes.indexOf(id), 1);
    this.setState({displayedContacts: currentDisplayedIndexes.map(curr => this.state.contacts.map(c => c.id).indexOf(curr))});
  }

  render() {
    return (
      <div className="app">
      <h1>IronContacts</h1>
      <div className="buttons-container">
        <button className="button" onClick={this.addRandomContact}>Add Random Contact</button>
        <button className="button" onClick={this.sortContactsName}>Sort By Name</button>
        <button className="button" onClick={this.sortContactsPopulatiry}>Sort By Popularity</button>
      </div>
      <table className="table">
        <thead className="thead">
          <tr className="tr">
            <th className="th">Picture</th>
            <th className="th">Name</th>
            <th className="th">Popularity</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody className="tbody">{this.displayContacts()}</tbody>
      </table>
      </div>
    );
  }
}

export default App;
