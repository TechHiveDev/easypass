import { useRecordContext, useTranslate } from 'react-admin';

const DiscoverTitle = ({ create = false }) => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  return (
    <span>
      {create ? t('create') : ''}{' '}
      {create
        ? t('singleDiscoverCategory').replace('ال', '')
        : t('discoverCategory')}
      {record ? record.id : ''}
    </span>
  );
};
export default DiscoverTitle;
