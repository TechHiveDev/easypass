// enum RequestStatus {
//   Pending // pendingAt  (by user)
// Cancelled // cancelledAt (by user)
// AdminRefused // adminRefusedAt (by admin)
// InProgress // inProgressAt (by user/by admin)
// Completed // completedAt (by user/by admin)
// }
const formatData = (data) => {
  let list = [];
  const currentDate = new Date();
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
      { status: "Pending", date: pendingAt, seen },
      { status: "Cancelled", date: cancelledAt, seen },
      {
        status: "InProgress",
        date: inProgressAt,
        seen,
      },
      {
        status: "AdminRefused",
        date: adminRefusedAt,
        seen,
      },
      {
        status: "Completed",
        date: completedAt,
        seen,
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
  return list
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((e, i) => {
      const { seen, ...rest } = e;
      if (i === 0 && seen === false) {
        return {
          ...rest,
          seen: false,
          past: new Date(e.from) < currentDate,
        };
      }
      return {
        ...rest,
        seen: true,
        past: new Date(e.from) < currentDate,
      };
    });
};
export default formatData;
