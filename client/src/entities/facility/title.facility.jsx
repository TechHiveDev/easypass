import { useRecordContext, useTranslate } from 'react-admin';

const FacilityTitle = ({ create = false }) => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  return (
    <span>
      {create ? t('create') : ''}&nbsp;
      {create ? t('service').replace('ال', '') : t('service')}&nbsp;
      {record ? record.id : ''}
    </span>
  );
};
export default FacilityTitle;
