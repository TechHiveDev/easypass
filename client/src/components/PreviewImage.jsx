import { ImageField } from 'react-admin';

const PreviewImage = ({ record, source, ...props }) => {
  console.log(record, source, props);
  if (typeof record === 'string') {
    record = {
      [source]: record,
    };
  }
  return <ImageField record={record} source={source} />;
};
export default PreviewImage;
