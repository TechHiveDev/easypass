require("dotenv").config("../../../.env");

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info", "query"] });

// ==========================================================


const numScans = 20;
const minDays = 1;
const maxDays = 30;

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
            i *
            Math.floor(Math.random() * (maxDays - minDays + 1) + minDays)
      ),
      type,
      deviceId: deviceId ? deviceId : undefined,
      invitationId: invitationId ? invitationId : undefined,
    };
  });
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
                name: "resident name",
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
      name: "Pyramid Heights Compound - " + Date.now(),
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
})();
