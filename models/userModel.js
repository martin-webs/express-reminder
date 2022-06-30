let database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [
      {
        title: 'Birthdays',
        description: 'Greet Isra next Friday',
        details: 'Isra is the best, we got to meet him on Zoom',
        completed: false,
      },
			{
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
    reminders: [
      {
        title: 'Soccer',
        description: 'Greet Isra next Friday',
        details: 'Isra is the best, we got to meet him on Zoom',
        completed: false,
      },
			{
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
    reminders: [
      {
        title: 'web',
        description: 'Greet Isra next Friday',
        details: 'Isra is the best, we got to meet him on Zoom',
        completed: false,
      },
			{
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
};

module.exports = { database, userModel };
