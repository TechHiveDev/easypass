import { FormDataConsumer, ImageField, Labeled } from 'react-admin';

const PreviewImage = ({ record, source, ...props }) => {
  if (typeof record === 'string') {
    record = {
      [source]: record,
    };
  }
  return (
    <>
      <ImageField record={record} source={source} />
      <FormDataConsumer>
        {({ formData, dispatch, ...rest }) => {
          if (!formData?.photoUrl?.src && !formData?.logoUrl?.src) {
            return (
              <img
                style={{
                  width: '10vw',
                  height: '30vh',
                  objectFit: 'contain',
                  margin: 0,
                  padding: 0,
                }}
                src={formData?.photoUrl ?? formData?.logoUrl}
                alt={formData.name || formData.title}
                {...rest}
              />
            );
          }
        }}
      </FormDataConsumer>
    </>
  );
};
export default PreviewImage;
