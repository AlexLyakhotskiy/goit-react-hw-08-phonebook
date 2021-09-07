import { useDispatch, useSelector } from 'react-redux';

import { changeFilter } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';

import styles from './Filter.module.css';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        value={value}
        onChange={e => dispatch(changeFilter(e.target.value))}
        className={styles.input}
        name="filter"
        type="text"
      ></input>
    </label>
  );
};

export default Filter;
