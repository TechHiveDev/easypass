require("dotenv").config("../../../.env");

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info", "query"] });

// ==========================================================

const numScans = 400;
const minDays = 7;
const maxDays = 365;

//
const PyramidHeightsAdmin = 4;
const PyramidHeightsSuperAdmin = 3;
const PyramidHeightsResident = 2;
const PyramidHeightsSecurity = 1;

const PyramidHeightsCompoundId = 1;
const PyramidHeightsDeviceId = 1;


const MountainViewAdmin = 5;
const MountainViewSuperAdmin = 6;
const MountainViewResident = 7;
const MountainViewSecurity = 8;

const MountainViewDeviceId = 2;
const MountainViewCompoundId = 2;

function dynamicInvitationScans(type, compoundId, userId, invitationId) {
  return {
    id: invitationId,
    name: "seeded invitation name",
    type,
    notes: "seeded invitation notes",
    userId,
    compoundId,
  };
}

function arrayScans(type, compoundId, userId, deviceId, invitationId) {
  return new Array(numScans).fill().map((e, i) => {
    return {
      compoundId,
      userId,
      success: Math.random() < 0.5,
      createdAt: new Date(
        new Date().valueOf() -
        1000 *
        60 *
        60 *
        24 *
        Math.floor(Math.random() * (maxDays - minDays + 1) + minDays)
      ),
      type,
      deviceId: deviceId ? deviceId : undefined,
      invitationId: invitationId ? invitationId : undefined,
    };
  });
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

(async () => {
  await prisma.compound.create({
    data: {
      name: "Pyramid Heights",// + Date.now(),
      logoUrl:
        "https://www.christiesrealestate.com/blog/wp-content/uploads/2022/04/msb-33.jpg",
      users: {
        create: [
          {
            user: {
              create: {
                id: PyramidHeightsAdmin,
                email: "admin@example.com",
                name: "admin name",
                photoUrl:
                  "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Admin",
                phone: "01201200222",
                active: true,
              },
            },
          },
          {
            user: {
              create: {
                id: PyramidHeightsSuperAdmin,
                email: "superadmin@example.com",
                name: "admin name",
                photoUrl:
                  "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "SuperAdmin",
                phone: "01201200333",
                active: true,
              },
            },
          },
          {
            user: {
              create: {
                id: PyramidHeightsResident,
                email: "resident@example.com",
                name: "Nour",
                photoUrl:
                  "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Resident",
                phone: "01201200343",
                active: true,
              },
            },
          },
          {
            user: {
              create: {
                id: PyramidHeightsSecurity,
                email: "security@example.com",
                name: "security name",
                photoUrl:
                  "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Security",
                phone: "01201200555",
                active: true,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.compound.create({
    data: {
      id: MountainViewCompoundId,
      name: "Mountain View",
      logoUrl:
        "https://c8.alamy.com/comp/B0YRKC/living-quarters-inside-a-family-compound-in-the-gambia-B0YRKC.jpg",
      users: {
        create: [
          {
            user: {
              create: {
                id: MountainViewResident,
                email: "resident@mountainview.com",
                name: "Mountain View resident name",
                photoUrl:
                  "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Resident",
                phone: "01501200344",
                active: true,
              },
            },
          },
          {
            user: {
              create: {
                id: MountainViewAdmin,
                email: "admin@mountainview.com",
                name: "mountain view admin name",
                photoUrl:
                  "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Admin",
                phone: "01501200222",
                active: true,
              },
            },
          },
          {
            user: {
              create: {
                id: MountainViewSuperAdmin,
                email: "superadmin@mountainview.com",
                name: "MountainView super admin",
                photoUrl:
                  "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "SuperAdmin",
                phone: "01501200333",
                active: true,
              },
            },
          }
          , {
            user: {
              create: {
                id: MountainViewSecurity,
                email: "security@mountainview.com",
                name: "security name",
                photoUrl:
                  "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Security",
                phone: "01501200555",
                active: true,
              },
            },
          }
        ],
      },
    },
  });

  await prisma.device.create({
    data: {
      id: PyramidHeightsDeviceId,
      ip: "476575675612",
      compoundId: PyramidHeightsCompoundId,
    },
  });

  await prisma.device.create({
    data: {
      id: MountainViewDeviceId,
      ip: "476575675611",
      compoundId: MountainViewDeviceId,
    },
  });
  await prisma.invitation.createMany({
    data: [
      //type, compoundId, userId, invitationId
      dynamicInvitationScans("Visitor", PyramidHeightsCompoundId, PyramidHeightsResident, 1),
      dynamicInvitationScans("Delivery", PyramidHeightsCompoundId, PyramidHeightsResident, 2),

      dynamicInvitationScans("Visitor", MountainViewCompoundId, MountainViewResident, 3),
      dynamicInvitationScans("Delivery", MountainViewCompoundId, MountainViewResident, 4),
    ],
  });
  await prisma.scan.createMany({
    data: [
      //type, compoundId, userId, deviceId, invitationId
      ...arrayScans("Visitor", PyramidHeightsCompoundId, PyramidHeightsResident, PyramidHeightsDeviceId, 1),
      ...arrayScans("Delivery", PyramidHeightsCompoundId, PyramidHeightsResident, PyramidHeightsDeviceId, 2),
      ...arrayScans("Resident", PyramidHeightsCompoundId, PyramidHeightsResident, PyramidHeightsDeviceId),

      
      ...arrayScans("Visitor", MountainViewCompoundId, MountainViewResident, MountainViewDeviceId, 3),
      ...arrayScans("Delivery", MountainViewCompoundId, MountainViewResident, MountainViewDeviceId, 4),
      ...arrayScans("Resident", MountainViewCompoundId, MountainViewResident, MountainViewDeviceId),
    ],
  });

  await prisma.announcement.createMany({
    data: [
      {
        title: "Gold Gym",
        description: "Join our gym for a limited discount offer",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Gold%27s_Gym_logo.svg/1200px-Gold%27s_Gym_logo.svg.png",
        compoundId: PyramidHeightsCompoundId,
        userId: PyramidHeightsSuperAdmin,
      },
      {
        title: "Mac opening soon",
        description: "Mac is joining our compound soon",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
        compoundId: PyramidHeightsCompoundId,
        userId: PyramidHeightsAdmin,
      },
      //---
      {
        title: "Gold Gym",
        description: "Join our gym for a limited discount offer",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Gold%27s_Gym_logo.svg/1200px-Gold%27s_Gym_logo.svg.png",
        compoundId: MountainViewCompoundId,
        userId: MountainViewSuperAdmin,
      },
      {
        title: "Mac opening soon",
        description: "Mac is joining our compound soon",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
        compoundId: MountainViewCompoundId,
        userId: MountainViewAdmin,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      { id: 1, name: "Banking And Insurance", icon: "bank" },
      { id: 2, name: "Groceries", icon: "cart-outline" },
      { id: 3, name: "Places to Eat", icon: "food" },
      { id: 4, name: "Pharmacies", icon: "pill" },
      { id: 5, name: "Pet Care", icon: "dog-side" },
    ],
  });

  await prisma.facility.createMany({
    data: [
      {
        name: "Car Wash",
        icon: "car-wash",
        compoundId: PyramidHeightsCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Groceries Shopping",
        icon: "cart-outline",
        compoundId: PyramidHeightsCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Laundry",
        icon: "tshirt-crew-outline",
        compoundId: PyramidHeightsCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "House Cleaning",
        icon: "home-search-outline",
        compoundId: PyramidHeightsCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Plumber",
        icon: "water-pump",
        compoundId: PyramidHeightsCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Electrician",
        icon: "tools",
        compoundId: PyramidHeightsCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },

      //--
      {
        name: "Car Wash",
        icon: "car-wash",
        compoundId: MountainViewCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Groceries Shopping",
        icon: "cart-outline",
        compoundId: MountainViewCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Laundry",
        icon: "tshirt-crew-outline",
        compoundId: MountainViewCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "House Cleaning",
        icon: "home-search-outline",
        compoundId: MountainViewCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Plumber",
        icon: "water-pump",
        compoundId: MountainViewCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
      {
        name: "Electrician",
        icon: "tools",
        compoundId: MountainViewCompoundId,
        slots: [
          {
            to: "2022-11-01T14:00:00.000Z",
            from: "2022-11-01T05:00:00.000Z",
            available: true,
          },
        ],
      },
    ],
  });

  await prisma.discover.createMany({
    data: [
      {
        userId: PyramidHeightsSuperAdmin,
        categoryId: 1,
        compoundId: PyramidHeightsCompoundId,
        name: "Masr Bank",
        photoUrl:
          "https://www.elaosboa.com/wp-content/uploads/2022/09/elaosboa85726.png",
        phone: "19888",
        shortDescription: "Egyptian Bank",
        description: "this is bank masr description",
        address: "57 home street",
      },
      {
        userId: PyramidHeightsSuperAdmin,
        categoryId: 1,
        compoundId: PyramidHeightsCompoundId,
        name: "NBE Bank",
        photoUrl:
          "https://www.egycareers.com/wp-content/uploads/2022/05/%D8%A7%D9%84%D8%A8%D9%86%D9%83-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.jpeg",
        phone: "19623",
        shortDescription: "National Bank of Egypt",
        description: "this is National Bank of Egypt",
        address: "55 home street",
      },
      {
        userId: PyramidHeightsSuperAdmin,
        categoryId: 2,
        compoundId: PyramidHeightsCompoundId,
        name: "Carrefour",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/800px-Carrefour_logo.svg.png",
        phone: "16061",
        shortDescription: "Online and in place shopping",
        description:
          "provide customers with quality services, products and food accessible to all across all distribution channels",
        address: "51 home street",
      },
      //--
      {
        userId: MountainViewSuperAdmin,
        categoryId: 1,
        compoundId: MountainViewCompoundId,
        name: "Banque Misr",
        shortDescription: "Egyptian Bank",
        description:
          "Banque Misr is an Egyptian bank co-founded by industrialist Joseph Aslan Cattaui Pasha and economist Talaat Harb Pasha in 1920.",
        photoUrl:
          "https://www.elaosboa.com/wp-content/uploads/2022/09/elaosboa85726.png",
        phone: "19888",
        address: "Abou Quer, Bab Sharqi WA Wabour Al Meyah, Bab Sharqi, Alexandria",
      },
      {
        userId: MountainViewSuperAdmin,
        categoryId: 1,
        compoundId: MountainViewCompoundId,
        name: "National Bank of Egypt",
        photoUrl:
          "https://www.egycareers.com/wp-content/uploads/2022/05/%D8%A7%D9%84%D8%A8%D9%86%D9%83-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.jpeg",
        phone: "19623",
        shortDescription: "National Bank of Egypt",
        description: "National Bank of Egypt is a bank founded in Egypt in June 1898, and is the country's largest bank",
        address: "Mid District, 42, Amir El-Bahr, St., Moharram Bek, Alexandria",
      },
      {
        userId: MountainViewSuperAdmin,
        categoryId: 2,
        compoundId: MountainViewCompoundId,
        name: "Carrefour",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/800px-Carrefour_logo.svg.png",
        phone: "16061",
        shortDescription: "Online and in place shopping",
        description:
          "Carrefour is a French multinational retail and wholesaling corporation headquartered in Massy, France. The eighth-largest retailer in the world by revenue",
        address: "Gate 4 - 1st Alexandria Cairo Desert Road - Alexandria",
      },
    ],
  });

  await prisma.request.createMany({
    data: [
      {
        availableDateFrom: randomDate(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 1))
        ),
        availableDateTo: randomDate(
          new Date(new Date().setDate(new Date().getDate() + 1)),
          new Date(new Date().setDate(new Date().getDate() + 2))
        ),
        status: "Pending",
        type: "Facility",
        respondNote: "complaint response",
        userId: 5,
        userCompoundId: 5,
        compoundId: 2,
        facilityId: 2,
      },
      {
        availableDateFrom: randomDate(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 1))
        ),
        availableDateTo: randomDate(
          new Date(new Date().setDate(new Date().getDate() + 1)),
          new Date(new Date().setDate(new Date().getDate() + 2))
        ),
        status: "Pending",
        type: "Facility",
        respondNote: "complaint response",
        userId: 2,
        userCompoundId: 2,
        compoundId: 1,
        facilityId: 1,
      },
    ],
  });
})();
