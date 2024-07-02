import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/slices/contacts.slice';
import { setFilter } from './redux/slices/filter.slice';
import styles from "./Contacts/Contacts.module.scss";

const AddContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      alert("Contact with this name already exists.");
      return;
    }

    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[A-Za-z]+(\s[A-Za-z]+){0,2}$"
        required
        value={name}
        onChange={handleChange}
        className={styles.input}
      />
      <label>Phone number</label>
      <input
        type="tel"
        name="number"
        pattern="^\d{9}$"
        required
        value={number}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Add contact</button>
    </form>
  );
};

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find contact"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <li key={contact.id} className={styles.listItem}>
              {contact.name} - {contact.number}
              <button onClick={() => dispatch(deleteContact(contact.id))} className={styles.deleteButton}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phone Book</h1>
      <AddContactForm />
      <ContactList />
    </div>
  );
};

export default App;
