require("dotenv").config("../../../.env");

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info", "query"] });

// ==========================================================

const numScans = 400;
const minDays = 7;
const maxDays = 365;

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
      name: "Tech-Hive Compound - " + Date.now(),
      logoUrl:
        "https://www.christiesrealestate.com/blog/wp-content/uploads/2022/04/msb-33.jpg",
      users: {
        create: [
          {
            user: {
              create: {
                id: 4,
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
                id: 3,
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
                id: 2,
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
                id: 1,
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
  await prisma.device.create({
    data: {
      ip: "476575675611",
      compoundId: 1,
    },
  });

  await prisma.compound.create({
    data: {
      name: "Pyramid Heights Compound",
      logoUrl:
        "https://c8.alamy.com/comp/B0YRKC/living-quarters-inside-a-family-compound-in-the-gambia-B0YRKC.jpg",
      users: {
        create: [
          {
            user: {
              create: {
                id: 5,
                email: "resident2@example.com",
                name: "resident 2 name",
                photoUrl:
                  "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg",
                // password :12345
                password:
                  "pbkdf2:sha256:150000$eb677977$204a8e45b57abd97e11bea7c49d7fd223a32e8b2976c677e5b74e444bad16003",
                type: "Resident",
                phone: "01001200344",
                active: true,
              },
            },
          },
        ],
      },
    },
  });
  await prisma.invitation.createMany({
    data: [
      dynamicInvitationScans("Visitor", 1, 2, 1),
      dynamicInvitationScans("Delivery", 1, 2, 2),
    ],
  });
  await prisma.scan.createMany({
    data: [
      ...arrayScans("Visitor", 1, 2, 1, 1),
      ...arrayScans("Delivery", 1, 2, 1, 2),
      ...arrayScans("Resident", 1, 2, 1),
    ],
  });

  await prisma.announcement.createMany({
    data: [
      {
        title: "Gold Gym",
        description: "Join our gym for a limited discount offer",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Gold%27s_Gym_logo.svg/1200px-Gold%27s_Gym_logo.svg.png",
        compoundId: 1,
        userId: 3,
      },
      {
        title: "Mac openning soon",
        description: "Mac is joining our compound soon",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
        compoundId: 1,
        userId: 4,
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
        compoundId: 1,
        name: "Masr Bank",
        description:
          "added facilities tab in admin panel where admin can crud facilities,full text search them and filter them by compound.added request tab in admin pane",
        photoUrl:
          "https://www.elaosboa.com/wp-content/uploads/2022/09/elaosboa85726.png",
        phone: "19888",
        description: "this is bank masr description",
        slots: [
          {
            to: "2022-10-30T8:30:00.699Z",
            from: "2022-10-30T5:00:00.699Z",
            available: true,
          },
        ],
      },
      {
        compoundId: 1,
        name: "NBE Bank",
        description: "Regional",
        photoUrl:
          "https://www.egycareers.com/wp-content/uploads/2022/05/%D8%A7%D9%84%D8%A8%D9%86%D9%83-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.jpeg",
        phone: "19623",
        description: "this is National Bank of Egypt",
        slots: [
          {
            to: "2022-10-30T8:30:00.699Z",
            from: "2022-10-30T5:00:00.699Z",
            available: true,
          },
        ],
      },
      {
        compoundId: 1,
        name: "Carrefour",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/800px-Carrefour_logo.svg.png",
        phone: "16061",
        description:
          "dfghidkhgfdf kgfdhjkgfhj hkljfgklhjgkh kgfhjkfg fdgfdgfdgdfgfdg",
        slots: [
          {
            to: "2022-10-30T8:30:00.699Z",
            from: "2022-10-30T5:00:00.699Z",
            available: true,
          },
        ],
      },
    ],
  });

  await prisma.discover.createMany({
    data: [
      {
        userId: 3,
        categoryId: 1,
        compoundId: 1,
        name: "Masr Bank",
        description:
          "added facilities tab in admin panel where admin can crud facilities,full text search them and filter them by compound.added request tab in admin pane",
        photoUrl:
          "https://www.elaosboa.com/wp-content/uploads/2022/09/elaosboa85726.png",
        phone: "19888",
        shortDescription: "Egyptian Bank",
        description: "this is bank masr description",
        address: "57 home street , elmnt2a",
      },
      {
        userId: 3,
        categoryId: 1,
        compoundId: 1,
        name: "NBE Bank",
        description: "Regional",
        photoUrl:
          "https://www.egycareers.com/wp-content/uploads/2022/05/%D8%A7%D9%84%D8%A8%D9%86%D9%83-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.jpeg",
        phone: "19623",
        shortDescription: "National Bank of Egypt",
        description: "this is National Bank of Egypt",
        address: "55 home street , elmnt2a",
      },
      {
        userId: 3,
        categoryId: 2,
        compoundId: 1,
        name: "Carrefour",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/800px-Carrefour_logo.svg.png",
        phone: "16061",
        shortDescription: "Online and in place shopping",
        description:
          "dfghidkhgfdf kgfdhjkgfhj hkljfgklhjgkh kgfhjkfg fdgfdgfdgdfgfdg",
        address: "51 home street , elmnt2a",
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
