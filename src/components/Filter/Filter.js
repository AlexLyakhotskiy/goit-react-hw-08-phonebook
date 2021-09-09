import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { changeFilter } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';

import { useStyles } from './FilterStyled';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const styles = useStyles();

  return (
    <TextField
      fullWidth
      className={styles.input}
      variant="outlined"
      name="filter"
      type="text"
      label="Find contacts by name"
      value={value}
      onChange={e => dispatch(changeFilter(e.target.value))}
    />
  );
};

export default Filter;
