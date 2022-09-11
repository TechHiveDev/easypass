import mapValues from "lodash/mapValues";

// ========================================================

const getFilter = (filter, filtersOption) =>
  mapValues(filter, (value, key) => {
    if (Array.isArray(value)) {
      return { in: value };
    }

    if (filtersOption && filtersOption[key]) {
      return filtersOption[key](value);
    }

    return value;
  });

// ========================================================

const parseSort = (sort) => {
  if (!sort) return {};
  let [key, value] = JSON.parse(sort);
  return { [key]: value.toLowerCase() };
};

// ========================================================

export const parseQuery = (query, filtersOption) => {
  const { range, sort, filter } = query;
  const [from, to] = range ? JSON.parse(range) : [0, 100];
  const { q, ...filters } = JSON.parse(filter || "{}");

  return {
    offset: from,
    limit: to - from + 1,
    filter: getFilter(filters, filtersOption),
    order: parseSort(sort),
    q,
  };
};

// ========================================================

export const setExposeHeaders = (res) => {
  const rawValue = res.getHeader("Access-Control-Expose-Headers") || "";

  if (typeof rawValue !== "string") return;

  const headers = new Set(
    rawValue
      .split(",")
      .map((header) => header.trim())
      .filter((header) => Boolean(header))
  );

  headers.add("Content-Range");
  headers.add("X-Total-Count");
  res.header("Access-Control-Expose-Headers", [...headers].join(", "));
};

// ========================================================

export const setGetListHeaders = (res, offset, total, rowsCount) => {
  setExposeHeaders(res);
  res.header("Content-Range", `${offset}-${offset + rowsCount}/${total}`);
  res.header("X-Total-Count", `${total}`);
};

// ========================================================

export const queryPrisma = (prisma, q) => {
  let entityFields = prisma._dmmf.datamodel.models?.find(
    (model) => model.name === "Office"
  )?.fields;

  let filteredFields = entityFields.map(({ name }) => ({
    [name]: { contains: q },
  }));

  return { where: { OR: filteredFields } };
};
