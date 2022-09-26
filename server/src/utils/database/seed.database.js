require("dotenv").config("../../../.env");

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info", "query"] });

// ==========================================================

// Create compound
// Create admin user
// Create resident user
// Create security user
// assign admin to compound
// assign security to compound
// Create security user to compound

(async () => {
  await prisma.compound.create({
    data: {
      name: "Tech-Hive Compound - " + Date.now(),
      users: {
        create: [
          {
            user: {
              create: {
                email: "admin@example.com",
                name: "admin name",
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
                email: "superadmin@example.com",
                name: "admin name",
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
                email: "resident@example.com",
                name: "resident name",
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
                email: "security@example.com",
                name: "security name",
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
})();
