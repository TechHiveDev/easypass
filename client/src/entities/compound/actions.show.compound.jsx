import { useState } from 'react';
import {
  AutocompleteInput,
  EditButton,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  TopToolbar,
  useCreateController,
  useRefresh,
  useTranslate,
} from 'react-admin';
import Button from '@mui/material/Button';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import ExploreIcon from '@mui/icons-material/Explore';
import SaveToolbar from '../../components/SaveToolbar';

const CompoundShowActions = () => {
  const { isLoading, permissions } = usePermissions();
  const t = useTranslate();
  const [{ open, type }, setOpen] = useState({ open: false, type: undefined });
  const refresh = useRefresh();
  const { save: saveUser } = useCreateController({
    resource: 'userCompound',
    redirect: false,
  });
  const { save: saveAnnouncement } = useCreateController({
    resource: 'announcement/create',
    redirect: false,
  });
  const { save: saveDiscover } = useCreateController({
    resource: 'discover/create',
    redirect: false,
  });
  const { save: saveFacility } = useCreateController({
    resource: 'facility',
    redirect: false,
  });
  const submitHandler = (values) => {
    if (type === 'announcement') {
      const { id: compoundId, title, description, photoUrl } = values;
      return saveAnnouncement(
        { compoundId, title, description, photoUrl },
        {
          onSuccess: () => {
            setOpen((p) => ({
              ...p,
              open: false,
            }));
            refresh();
          },
        }
      );
    }
    if (type === 'discover') {
      const { id: compoundId, title, description, photoUrl } = values;
      return saveDiscover(
        { compoundId, title, description, photoUrl },
        {
          onSuccess: () => {
            setOpen((p) => ({
              ...p,
              open: false,
            }));
            refresh();
          },
        }
      );
    }
    if (type === 'user') {
      const {
        id: compoundId,
        userId,
        streetName,
        blockNumber,
        unitNumber,
      } = values;
      saveUser(
        {
          compoundId,
          userId,
          streetName,
          blockNumber,
          unitNumber,
        },
        {
          onSuccess: () => {
            setOpen((p) => ({
              ...p,
              open: false,
            }));
            refresh();
          },
        }
      );
    }
    if (type === 'facility') {
      const {
        id: compoundId,
        facilityName: name,
        description,
        price,
        photoUrl,
      } = values;
      saveFacility(
        {
          compoundId,
          name,
          description,
          price,
          photoUrl,
        },
        {
          onSuccess: () => {
            setOpen((p) => ({
              ...p,
              open: false,
            }));
            refresh();
          },
        }
      );
    }
  };
  return (
    <TopToolbar>
      {!isLoading && permissions === 'SuperAdmin' ? <EditButton /> : null}
      {/* Add your custom actions */}
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen({ type: 'user', open: true });
        }}
        startIcon={<HomeIcon />}
      >
        &nbsp;{t('add')} {t('property').replace('ال', '')}
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen({ type: 'announcement', open: true });
        }}
        startIcon={<AnnouncementIcon />}
      >
        &nbsp;{t('add')} {t('announcement').replace('ال', '')}
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen({ type: 'facility', open: true });
        }}
        startIcon={<AnnouncementIcon />}
      >
        &nbsp;{t('add')} {t('facility').replace('ال', '')}
      </Button>{' '}
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen({ type: 'discover', open: true });
        }}
        startIcon={<ExploreIcon />}
      >
        &nbsp;{t('add')} {t('discover').replace('ال', '')}
      </Button>
      <Dialog
        onClose={() =>
          setOpen((p) => ({
            ...p,
            open: false,
          }))
        }
        open={open}
      >
        <div>
          {type === 'user' ? (
            <SimpleForm
              onSubmit={submitHandler}
              toolbar={<SaveToolbar />}
              resource="userCompound"
            >
              <ReferenceInput
                required
                label="user"
                source="userId"
                reference="user"
              >
                <AutocompleteInput
                  optionText="name"
                  label="user"
                  required
                  validate={(v) => {
                    if (v === '') return t('requiredUser');
                    return undefined;
                  }}
                />
              </ReferenceInput>
              <TextInput variant="outlined" source="streetName" required />
              <NumberInput variant="outlined" source="blockNumber" required />
              <NumberInput variant="outlined" source="unitNumber" required />
            </SimpleForm>
          ) : null}
          {type === 'announcement' || type === 'discover' ? (
            <SimpleForm
              onSubmit={submitHandler}
              toolbar={<SaveToolbar />}
              resource={`${type}/create`}
            >
              <TextInput variant="outlined" source="title" />
              <TextInput variant="outlined" source="description" multiline />
              <ImageInput source="photoUrl" accept="image/*">
                <ImageField source="src" title="title" />
              </ImageInput>
            </SimpleForm>
          ) : null}
          {type === 'facility' ? (
            <SimpleForm
              defaultValues={{
                name: '',
              }}
              onSubmit={submitHandler}
              toolbar={<SaveToolbar />}
              resource="facility"
            >
              <TextInput
                variant="outlined"
                source="facilityName"
                label="signUp.name.label"
              />
              <TextInput variant="outlined" source="description" multiline />
              <NumberInput variant="outlined" source="price" />
              <ImageInput source="photoUrl" accept="image/*">
                <ImageField source="src" title="title" />
              </ImageInput>
            </SimpleForm>
          ) : null}
        </div>
      </Dialog>
    </TopToolbar>
  );
};
export default CompoundShowActions;
