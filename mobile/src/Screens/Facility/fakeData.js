export const allData = [
  {
    name: "Car Wash",
    icon: "car-wash",
  },
  {
    name: "Groceries Shopping",
    icon: "cart-outline",
  },
  {
    name: "Laundry",
    icon: "tshirt-crew-outline",
  },
  {
    name: "House Cleaning",
    icon: "home-search-outline",
  },
  {
    name: "Plumber",
    icon: "water-pump",
  },
  {
    name: "Electrician",
    icon: "tools",
  },
];
export const fakeData = allData.map((d) => {
  const { times, ...data } = d;
  return data;
});
