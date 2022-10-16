import { ImageField } from "react-admin";

const PreviewImage = ({ record, source }) => {
  if (typeof record == "string") {
    record = {
      [source]: record,
    };
  }
  return <ImageField record={record} source={source} />;
};
export default PreviewImage;
