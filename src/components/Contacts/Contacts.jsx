import PropTypes from 'prop-types';
import css from '../Contacts/Contacts.module.css';

export const Contacts = ({ contacts, contactDeleteHandler }) => {
  return (
    <ul>
      {contacts.map(({ id, number, name }) => {
        return (
          <li className={css.item} key={id}>
            <p className={css.text}>
              {name}: {number}
            </p>
            <button
              className={css.btn}
              type="button"
              onClick={() => contactDeleteHandler(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  contactDeleteHandler: PropTypes.func.isRequired,
};
