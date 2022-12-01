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

const keyMapper = {
  // Pending: 'pendingAt',
  Cancelled: 'cancelledAt',
  AdminRefused: 'adminRefusedAt',
  InProgress: 'inProgressAt',
  Completed: 'completedAt',
};
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
        data: variables,
      })
  );
  const submitHandler = async (values) => {
    const { status, respondNote } = values;
    let note;
    const statusFromNote = respondNote?.split('#ST#')[0];
    const noteFromNote = respondNote?.split('#ST#')[1];
    if (!noteFromNote) {
      note = statusFromNote;
    } else {
      note = noteFromNote;
    }
    const currentTime = new Date().toISOString();
    const key = keyMapper[status];
    const variables =
      record.status === status
        ? {
            respondNote: `${status}#ST#${note}`,
            userType: 'Admin',
          }
        : {
            respondNote: `${status}#ST#${note}`,
            userType: 'Admin',
            status,
          };

    const res = await mutateAsync(
      key ? { ...variables, [key]: currentTime } : variables
    );
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
          <TextInput
            source="respondNote"
            variant="outlined"
            format={(v) => {
              const note = v?.split('#ST#')[1];
              return note;
            }}
            multiline
          />
          <SelectInput
            validate={required()}
            variant="outlined"
            source="status"
            // enum RequestStatus {
            //   Pending // pendingAt  (by user) remove
            //   Cancelled // cancelledAt (by user) remove
            //   AdminRefused // adminRefusedAt (by admin)
            //   InProgress // inProgressAt (by user/by admin)
            //   Completed // completedAt (by user/by admin)
            // }
            choices={[
              { id: 'AdminRefused', name: t('status.AdminRefused') },
              { id: 'InProgress', name: t('status.InProgress') },
              { id: 'Pending', name: t('status.Pending'), disabled: true },
              { id: 'Completed', name: t('status.Completed') },
            ]}
          />
        </SimpleForm>
      </Dialog>
    </>
  );
};
