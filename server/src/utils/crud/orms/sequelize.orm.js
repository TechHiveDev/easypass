const sequelizeCrud = (model) => ({
  // --------------------------------------------

  create: async (body) => model.create(body),

  // --------------------------------------------

  getOne: async (id) => model.findByPk(id),

  // --------------------------------------------

  getList: async ({ filter, limit, offset, order }) =>
    model.findAndCountAll({
      limit,
      offset,
      order,
      where: filter,
      raw: true,
    }),

  // --------------------------------------------

  update: async (id, body) => {
    const record = await model.findByPk(id);
    if (!record) throw new Error("Record not found");
    return record.update(body);
  },

  // --------------------------------------------

  destroy: async (id) => {
    const record = await model.findByPk(id);
    if (!record) throw new Error("Record not found");
    await record.destroy();
    return { id };
  },

  // --------------------------------------------
});

export default sequelizeCrud;
