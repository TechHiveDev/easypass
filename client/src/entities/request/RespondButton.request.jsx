import {
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useLocaleState,
  useRecordContext,
  useRefresh,
  useTranslate,
} from 'react-admin';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveToolbar from '../../components/SaveToolbar';

export const RespondButton = () => {
  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const refresh = useRefresh();
  const [locale] = useLocaleState();
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { mutateAsync, isLoading } = useMutation(
    ['request', 'update', { id: record?.id }],
    (variables) =>
      dataProvider.update('request', {
        id: record?.id,
        data: { ...variables, isAdmin: true },
      })
  );
  const submitHandler = async (values) => {
    const res = await mutateAsync(values);
    if (res?.data?.id) {
      handleClose();
      refresh();
    }
  };
  if (!record) return null;
  return (
    <>
      <Button
        startIcon={<ReplyIcon />}
        disabled={isLoading}
        onClick={handleOpen}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          `${locale === 'ar' ? ' استجيب' : 'respond'}`
        )}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          {locale === 'ar' ? 'استجيب للطلب ' : 'Respond to request '}
          {record?.id}
        </DialogTitle>
        <SimpleForm onSubmit={submitHandler} toolbar={<SaveToolbar />}>
          <TextInput source="respondNote" variant="outlined" multiline />
          <SelectInput
            validate={required()}
            variant="outlined"
            source="status"
            choices={[
              { id: 'Pending', name: t('status.Pending') },
              // { id: 'Completed', name: t('status.Completed') },
              { id: 'Cancelled', name: t('status.Cancelled') },
              // { id: 'Refused', name: t('status.Refused') },
              // { id: 'Done', name: t('status.Done') },
            ]}
          />
        </SimpleForm>
      </Dialog>
    </>
  );
};
