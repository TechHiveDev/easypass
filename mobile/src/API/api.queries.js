const endpoints = (builder) => ({
  // ------------------------------------------------

  create: builder.mutation({
    query: ({ entity, body }) => ({
      url: `/${entity}`,
      method: "POST",
      body,
    }),
  }),

  // ------------------------------------------------

  getList: builder.query({
    query: ({ entity }) => ({
      url: `/${entity}`,
      method: "GET",
    }),
  }),

  // ------------------------------------------------

  getOne: builder.query({
    query: ({ entity, id }) => ({
      url: `/${entity}/${id}`,
      method: "GET",
    }),
  }),

  // ------------------------------------------------

  update: builder.mutation({
    query: ({ entity, id, body }) => ({
      url: `/${entity}/${id}`,
      method: "PUT",
      body,
    }),
  }),

  // ------------------------------------------------

  deleteOne: builder.query({
    query: ({ entity, id }) => ({
      url: `/${entity}/${id}`,
      method: "DELETE",
    }),
  }),

  // ------------------------------------------------
});

// =============================================================

export default endpoints;
