import show from './show.facility';
import create from './create.facility';
import edit from './edit.facility';
import list from './list.facility';

export default {
  name: 'facility',
  label: 'Service',
  hide: false,
  create,
  edit,
  list,
  show,
};
