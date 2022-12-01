// enum RequestStatus {
//   Pending // pendingAt  (by user)
// Cancelled // cancelledAt (by user)
// AdminRefused // adminRefusedAt (by admin)
// InProgress // inProgressAt (by user/by admin)
// Completed // completedAt (by user/by admin)
// }
const formatData = (data) => {
  let list = [];
  data?.forEach((item) => {
    const {
      id,
      pendingAt,
      adminRefusedAt,
      cancelledAt,
      completedAt,
      inProgressAt,
      seen,
      respondNote,
      facility: { icon, name },
      availableDateFrom: from,
      availableDateTo: to,
    } = item;
    const respondNoteStatus = respondNote
      ? respondNote.split("#ST#")[0]
      : undefined;
    [
      { status: "Pending", date: pendingAt, seen: true },
      { status: "Cancelled", date: cancelledAt, seen: true },
      {
        status: "InProgress",
        date: inProgressAt,
        seen: completedAt || adminRefusedAt ? true : seen,
      },
      {
        status: "AdminRefused",
        date: adminRefusedAt,
        seen: completedAt ? true : seen,
      },
      {
        status: "Completed",
        date: completedAt,
        seen: adminRefusedAt ? true : seen,
      },
    ]
      .map((e) => {
        if (e.status === respondNoteStatus) {
          return {
            ...e,
            respondNote: respondNote.split("#ST#")[1],
          };
        }
        return e;
      })
      .forEach((s) => {
        if (s.date !== null) {
          list.push({
            ...s,
            icon,
            name,
            id: id + s.status,
            requestId: id,
            from,
            to,
          });
        }
      });
  });
  return list.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
export default formatData;
