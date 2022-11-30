import {
  FunctionField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  useTranslate,
} from 'react-admin';
import Title from './title.request';
import { RespondButton } from './RespondButton.request';
import dateFormatter from '../../utils/dateFormatter';

// ------------------------------------------------

export default function ShowRequest(props) {
  const t = useTranslate();
  return (
    <Show title={<Title />} actions={[<RespondButton />]}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <FunctionField
          source="type"
          render={(rec) => `${t(`facilityType.${rec.type}`)}`}
        />
        <ReferenceField source="facilityId" reference="facility" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source="createdAt"
          render={(rec) =>
            `${rec?.createdAt ? dateFormatter(rec.createdAt) : '-'}`
          }
        />
        <FunctionField
          source="availableDateFrom"
          render={(rec) =>
            `${
              rec?.availableDateFrom
                ? dateFormatter(rec.availableDateFrom)
                : '-'
            }`
          }
        />
        <FunctionField
          source="availableDateTo"
          render={(rec) =>
            `${rec?.availableDateTo ? dateFormatter(rec.availableDateTo) : '-'}`
          }
        />
        <FunctionField
          source="respondNote"
          render={(rec) => `${rec?.respondNote ? rec.respondNote : '-'}`}
        />
        <FunctionField
          source="status"
          render={(rec) => `${t(`status.${rec.status}`)}`}
        />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="userCompoundId"
          reference="userCompound"
          link="show"
          label={t('streetBlockUnit')}
        >
          <TextField source="streetName" />
          &nbsp;-&nbsp;
          <TextField source="blockNumber" />
          &nbsp;-&nbsp;
          <TextField source="unitNumber" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
