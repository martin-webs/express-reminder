let database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
    reminders: [
      { reminderId: 1,
        title: 'Birthdays',
        description: 'Greet Isra next Friday',
        details: 'Isra is the best, we got to meet him on Zoom',
        completed: false,
      },
			{ reminderId: 2,
        title: 'Movies',
        description: 'Buy two movies',
        details: 'Tonight',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
    reminders: [
      { reminderId: 1,
        title: 'Soccer',
        description: 'Greet Isra next Friday',
        details: 'Isra is the best, we got to meet him on Zoom',
        completed: false,
      },
			{ reminderId: 2,
        title: 'Piano',
        description: 'Buy two movies',
        details: 'Tonight',
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
    reminders: [
      { reminderId: 1,
        title: 'web',
        description: 'Greet Isra next Friday',
        details: 'Isra is the best, we got to meet him on Zoom',
        completed: false,
      },
			{ reminderId: 2,
        title: 'servers',
        description: 'Buy two movies',
        details: 'Tonight',
        completed: false,
      },
    ],
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`User with email ${email} not found`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`User with id ${id} not found`);
  },
  findProfileEmail: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    };
  }
};

module.exports = { database, userModel };
