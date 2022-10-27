export const allData = [
  {
    name: "Banking and Insurance",
    icon: "bank",
    items: [
      {
        name: "Masr Bank",
        image:
          "https://www.iskanmisr.com/UserFiles/NewsSizes/600/2022/08/09/66683.jpg?220809190800",
        phone: "19888",
        shortDescription: "Egyptian Bank",
        description:
          "Banque Misr is an Egyptian bank founded in 1920. " +
          "The government of the United Arab Republic nationalized the bank in 1960.",
        address: "36 Ahmed El-Sawy St., 6 th District",
        from: "8:00 am",
        to: "5:00 pm",
      },
      {
        name: "NBE Bank",
        image:
          "https://www.egycareers.com/wp-content/uploads/2022/05/%D8%A7%D9%84%D8%A8%D9%86%D9%83-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.jpeg",
        phone: "19623",
        shortDescription: "Egyptian Bank",
        description:
          "National Bank of Egypt is a bank founded in Egypt in June 1898," +
          " and is the country's largest bank in terms of assets, deposits, " +
          "loans, bank-capital, number of total branches, and employees.",
        address: "36 Ahmed El-Sawy St., 6 th District",
        from: "8:00 am",
        to: "5:00 pm",
      },
    ],
  },
  {
    name: "Groceries",
    icon: "cart-outline",
    items: [
      {
        name: "Carrefour",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/800px-Carrefour_logo.svg.png",
        phone: "16061",
        shortDescription: "Online and in place shopping",
        description:
          "French multinational retail and wholesaling corporation " +
          " it operates a chain of hypermarkets," +
          " groceries stores and convenience stores, which as of December 2021, " +
          "comprises its 13,894 stores in over 30 countries",
        address: "36 Ahmed El-Sawy St., 6 th District",
        from: "8:00 am",
        to: "5:00 pm",
      },
    ],
  },
  {
    name: "Places to Eat",
    icon: "food",
    items: [
      {
        name: "Holmes",
        image:
          "https://pbs.twimg.com/profile_images/1269592383441813505/CcPZiXsv_400x400.jpg",
        phone: "01005480048",
        shortDescription: "Holmes Fantastic Burger",
        description:
          "The true happines creators. " +
          "The simplified experience makes you feel its " +
          "authenticity as soon as you get your first bite",
        address: "36 Ahmed El-Sawy St., 6 th District",
        from: "8:00 am",
        to: "5:00 pm",
      },
    ],
  },
  {
    name: "Pharmacies",
    icon: "pill",
    items: [
      {
        name: "ElBeisy",
        image:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbnfsp585gwIUCC2fGm910h6688P0PLPz-9hqtD5Cj1BdRm_9xEopbWDUanWewVeEytrBoM9Rd_rDiYwE7hC47YxIW3BycaYT5vUu5ohVQkPiiZtMU4u7YLHBh2Jn0g_79ExKqzrr-PKJoNhUaNZRk4SC35i8NM4_vxO8mUV3GoS8892ERqsutKLtvxQ/s16000/%D8%B1%D9%82%D9%85-%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D8%A8%D9%8A%D8%B3%D9%89-%D8%A7%D9%84%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9.png",
        phone: "033929566",
        shortDescription: "Nearby Pharmacy",
        description:
          "we guarantee extraordinary experience to our beloved customers through " +
          "personalised services that result in customer loyalty." +
          "We have 24 hours delivery all over Alexandria and Agami also you can order through whatsapp",
        address: "36 Ahmed El-Sawy St., 6 th District",
        from: "8:00 am",
        to: "5:00 pm",
      },
    ],
  },
  {
    name: "Pet Care",
    icon: "dog-side",
    items: [
      {
        name: "Pets Care Clinic",
        image:
          "https://petscare-qa.com/wp-content/uploads/2018/09/cropped-fff5e965-74c0-452d-bfb7-2ac29f4c09e5.png",
        phone: "01144447592",
        shortDescription: "Excellent care clinic",
        address: "37 Ahmed El-Sawy St., 7 th District",
        from: "12:00 pm",
        to: "8:00 pm",
        description:
          "The Pet Care Clinic is dedicated to providing high quality, low cost, client-centered health care services to your pets.",
      },
    ],
  },
];
export const fakeData = allData.map((d) => {
  const { times, ...data } = d;
  return data;
});
