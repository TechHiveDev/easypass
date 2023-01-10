import { FormDataConsumer, ImageField } from "react-admin";

export default function PreviewImage({ record, source }: any) {
  if (typeof record === "string") {
    record = { [source]: record };
  }

  return (
    <>
      <ImageField record={record} source={source} />
      <FormDataConsumer>
        {({ formData, dispatch, ...rest }: any) => {
          if (!formData?.photoUrl?.src && !formData?.logoUrl?.src) {
            return (
              <img
                style={{
                  width: "10vw",
                  height: "30vh",
                  objectFit: "contain",
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
}
