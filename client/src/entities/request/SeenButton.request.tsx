import {
  useDataProvider,
  useLocaleState,
  useRecordContext,
  useRefresh,
} from 'react-admin';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Preview';

export const SeenButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const refresh = useRefresh();
  const [locale] = useLocaleState();
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { mutateAsync, isLoading } = useMutation(
    ['request', 'seen', { id: record?.id }],
    (variables) =>
      dataProvider.update('request', {
        id: record?.id,
        data: variables,
      })
  );
  const submitHandler = async () => {
    const res = await mutateAsync({
      userType: 'Admin',
      adminSeen: true,
    });
    if (res?.data?.id) {
      handleClose();
      refresh();
    }
  };
  if (!record || record.adminSeen) return null;
  return (
    <>
      <Button
        startIcon={<VisibilityIcon />}
        disabled={isLoading}
        onClick={handleOpen}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          `${locale === 'ar' ? ' تمييز كمقروءة' : 'Mark as Seen '}`
        )}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          {locale === 'ar' ? 'تمييز  ' : 'Mark '}
          {record?.id}
          {locale === 'ar' ? ' كمقروءة ' : ' as Seen '}
        </DialogTitle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Button
            onClick={() => {
              submitHandler();
              handleClose();
            }}
          >
            {locale === 'ar' ? 'نعم' : 'Yes'}
          </Button>
          <Button onClick={() => handleClose()}>
            {locale === 'ar' ? 'لا' : 'No'}
          </Button>
        </div>
      </Dialog>
    </>
  );
};
