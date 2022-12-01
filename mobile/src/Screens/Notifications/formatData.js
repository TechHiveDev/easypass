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
    } = item;
    [
      { status: "Pending", date: pendingAt, seen: true },
      { status: "Cancelled", date: cancelledAt, seen: true },
      {
        status: "InProgress",
        date: inProgressAt,
        seen: completedAt || adminRefusedAt ? true : seen,
        respondNote: completedAt ? undefined : respondNote,
      },
      {
        status: "AdminRefused",
        date: adminRefusedAt,
        seen: completedAt ? true : seen,
        respondNote: completedAt ? undefined : respondNote,
      },
      {
        status: "Completed",
        date: completedAt,
        seen: adminRefusedAt ? true : seen,
        respondNote: adminRefusedAt ? undefined : respondNote,
      },
    ].forEach((s) => {
      if (s.date !== null) {
        list.push({ ...s, icon, name, id: id + s.status, requestId: id });
      }
    });
  });
  return list.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
export default formatData;
