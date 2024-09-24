## authorization table

export const JWT_SECRET = 'minimal-secret-key';

export const JWT_EXPIRES_IN = '3 days';

export const _users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    photoURL: _mock.image.avatar(24),
    phoneNumber: _mock.phoneNumber(1),
    country: _mock.countryNames(1),
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
    //
    email: 'demo@minimals.cc',
    password: '@demo1',
  },
];

## posts table

const generateComments = () => {
  const userList = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.fullName(index),
    avatarUrl: _mock.image.avatar(index),
  }));

  return [
    {
      id: uuidv4(),
      name: userList[0].name,
      avatarUrl: userList[0].avatarUrl,
      message: _mock.sentence(1),
      postedAt: _mock.time(1),
      users: [userList[0], userList[1], userList[2]],
      replyComment: [
        {
          id: uuidv4(),
          userId: userList[1].id,
          message: _mock.sentence(2),
          postedAt: _mock.time(2),
        },
        {
          id: uuidv4(),
          userId: userList[0].id,
          message: _mock.sentence(3),
          tagUser: userList[1].name,
          postedAt: _mock.time(3),
        },
        {
          id: uuidv4(),
          userId: userList[2].id,
          message: _mock.sentence(4),
          postedAt: _mock.time(4),
        },
      ],
    },
    {
      id: uuidv4(),
      name: userList[4].name,
      avatarUrl: userList[4].avatarUrl,
      message: _mock.sentence(5),
      postedAt: _mock.time(5),
      users: [userList[5], userList[6], userList[7]],
      replyComment: [
        {
          id: uuidv4(),
          userId: userList[5].id,
          message: _mock.sentence(6),
          postedAt: _mock.time(6),
        },
        {
          id: uuidv4(),
          userId: userList[6].id,
          message: _mock.sentence(7),
          postedAt: _mock.time(7),
        },
        {
          id: uuidv4(),
          userId: userList[7].id,
          message: _mock.sentence(8),
          postedAt: _mock.time(8),
        },
      ],
    },
    {
      id: uuidv4(),
      name: userList[8].name,
      avatarUrl: userList[8].avatarUrl,
      message: _mock.sentence(9),
      postedAt: _mock.time(9),
      users: [],
      replyComment: [],
    },
    {
      id: uuidv4(),
      name: userList[9].name,
      avatarUrl: userList[9].avatarUrl,
      message: _mock.sentence(10),
      postedAt: _mock.time(10),
      users: [],
      replyComment: [],
    },
  ];
};

export const _posts = () =>
  [...Array(19)].map((_, index) => {
    const comments = generateComments();

    const publish = index % 3 ? 'published' : 'draft';

    const metaKeywords = _tags.slice(8, 11);

    return {
      id: _mock.id(index),
      publish,
      comments,
      metaKeywords,
      content: CONTENT,
      tags: _tags.slice(0, 5),
      metaTitle: 'Minimal UI Kit',
      createdAt: _mock.time(index),
      title: _mock.postTitle(index),
      coverUrl: _mock.image.cover(index),
      totalViews: _mock.number.nativeL(index),
      totalShares: _mock.number.nativeL(index + 2),
      totalComments: _mock.number.nativeL(index + 1),
      totalFavorites: _mock.number.nativeL(index + 3),
      metaDescription: 'The starting point for your next project with Minimal UI Kit',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
      author: {
        name: _mock.fullName(index),
        avatarUrl: _mock.image.avatar(index),
      },
      favoritePerson: [...Array(20)].map((__, personIndex) => ({
        name: _mock.fullName(personIndex),
        avatarUrl: _mock.image.avatar(personIndex),
      })),
    };
  });

  ## chat table

export const _contacts = () =>
  [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    role: _mock.role(index),
    email: _mock.email(index),
    name: _mock.fullName(index),
    lastActivity: _mock.time(index),
    address: _mock.fullAddress(index),
    avatarUrl: _mock.image.avatar(index),
    phoneNumber: _mock.phoneNumber(index),
    status: (index % 2 && 'online') || (index % 3 && 'offline') || (index % 4 && 'alway') || 'busy',
  }));

export const _conversations = () => {
  const myContact = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    role: 'admin',
    status: 'online',
    name: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    phoneNumber: '+40 777666555',
    address: '90210 Broadway Blvd',
    avatarUrl: _mock.image.avatar(24),
    lastActivity: fSub({ minutes: 1 }),
  };

  const files = _files();

  const otherContacts = _contacts();

  return [
    {
      id: otherContacts[1].id,
      participants: [myContact, otherContacts[1]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: otherContacts[1].id,
          body: _mock.sentence(1),
          contentType: 'text',
          attachments: files.slice(0, 1),
          createdAt: fSub({ hours: 5 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(2),
          contentType: 'text',
          attachments: files.slice(1, 2),
          createdAt: fSub({ hours: 4 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[1].id,
          body: _mock.sentence(3),
          contentType: 'text',
          attachments: files.slice(2, 3),
          createdAt: fSub({ hours: 3 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(4),
          contentType: 'text',
          attachments: files.slice(3, 6),
          createdAt: fSub({ hours: 2 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[1].id,
          body: _mock.sentence(5),
          contentType: 'text',
          attachments: files.slice(6, 10),
          createdAt: fSub({ hours: 1 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[1].id,
          attachments: [],
          contentType: 'image',
          body: _mock.image.cover(4),
          createdAt: fSub({ minutes: 15 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          contentType: 'text',
          attachments: [],
          body: _mock.sentence(6),
          createdAt: fSub({ minutes: 1 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(7),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ minutes: 0 }),
        },
      ],
    },
    {
      id: otherContacts[2].id,
      participants: [myContact, otherContacts[2]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: otherContacts[2].id,
          body: _mock.sentence(2),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 6 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(3),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 5 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[2].id,
          body: _mock.sentence(4),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 4 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(5),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 7 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[2].id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 3 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[2].id,
          body: _mock.image.cover(7),
          attachments: [],
          contentType: 'image',
          createdAt: fSub({ hours: 2 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(8),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 1 }),
        },
      ],
    },
    {
      id: otherContacts[3].id,
      participants: [myContact, otherContacts[3]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: otherContacts[3].id,
          body: _mock.sentence(3),
          contentType: 'text',
          attachments: files.slice(0, 1),
          createdAt: fSub({ hours: 8 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(4),
          contentType: 'text',
          attachments: files.slice(1, 2),
          createdAt: fSub({ hours: 7 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[3].id,
          body: _mock.sentence(5),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 6 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: files.slice(2, 4),
          createdAt: fSub({ hours: 5 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[3].id,
          body: _mock.sentence(7),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 4 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[3].id,
          body: _mock.image.cover(8),
          contentType: 'image',
          attachments: [],
          createdAt: fSub({ hours: 3 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[3].id,
          body: _mock.image.cover(9),
          contentType: 'image',
          attachments: [],
          createdAt: fSub({ hours: 2 }),
        },
      ],
    },
    {
      id: otherContacts[4].id,
      participants: [myContact, otherContacts[4]],
      type: 'ONE_TO_ONE',
      unreadCount: 8,
      messages: [
        {
          id: uuidv4(),
          senderId: otherContacts[4].id,
          body: _mock.sentence(4),
          contentType: 'text',
          attachments: files.slice(2, 4),
          createdAt: fSub({ hours: 4 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(5),
          contentType: 'text',
          attachments: files.slice(4, 6),
          createdAt: fSub({ hours: 3 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[4].id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 2 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(7),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 1 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(8),
          contentType: 'text',
          attachments: files.slice(6, 10),
          createdAt: fSub({ minutes: 45 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[4].id,
          body: _mock.sentence(9),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ minutes: 5 }),
        },
      ],
    },
    {
      id: otherContacts[5].id,
      participants: [myContact, otherContacts[5]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(5),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ minutes: 5 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[5].id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ seconds: 30 }),
        },
      ],
    },
    {
      id: otherContacts[6].id,
      participants: [myContact, otherContacts[6]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 2 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[6].id,
          body: _mock.sentence(7),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 1 }),
        },
      ],
    },
    {
      id: `${_mock.id(1)}gr`,
      participants: [myContact, ...otherContacts.slice(6, 11)],
      type: 'GROUP',
      unreadCount: 2,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 5 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[9].id,
          body: _mock.sentence(7),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 4 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[10].id,
          body: _mock.sentence(8),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 3 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[8].id,
          body: _mock.sentence(9),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 2 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          attachments: [],
          body: _mock.sentence(10),
          contentType: 'text',
          createdAt: fSub({ hours: 1 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[6].id,
          body: _mock.sentence(11),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ minutes: 5 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[7].id,
          body: _mock.sentence(12),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ seconds: 30 }),
        },
      ],
    },
    {
      id: otherContacts[7].id,
      participants: [myContact, otherContacts[7]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(7),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ days: 4 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[7].id,
          body: _mock.sentence(8),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ days: 3 }),
        },
      ],
    },
    {
      id: otherContacts[8].id,
      participants: [myContact, otherContacts[8]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(8),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 9 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[8].id,
          body: _mock.sentence(9),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 8 }),
        },
      ],
    },
    {
      id: otherContacts[9].id,
      participants: [myContact, otherContacts[9]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(9),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 5 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[9].id,
          body: _mock.sentence(10),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ hours: 3 }),
        },
      ],
    },
    {
      id: `${_mock.id(2)}gr`,
      participants: [myContact, ...otherContacts.slice(1, 5)],
      type: 'GROUP',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(1),
          contentType: 'text',
          attachments: files.slice(0, 5),
          createdAt: fSub({ hours: 4 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[1].id,
          body: _mock.sentence(2),
          contentType: 'text',
          attachments: files.slice(5, 6),
          createdAt: fSub({ hours: 3 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[2].id,
          body: _mock.sentence(3),
          contentType: 'text',
          attachments: files.slice(6, 7),
          createdAt: fSub({ hours: 2 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[4].id,
          body: _mock.sentence(4),
          contentType: 'text',
          attachments: files.slice(7, 8),
          createdAt: fSub({ hours: 1 }),
        },
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(5),
          contentType: 'text',
          attachments: files.slice(8, 9),
          createdAt: fSub({ minutes: 30 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[3].id,
          body: _mock.sentence(6),
          contentType: 'text',
          attachments: files.slice(9, 10),
          createdAt: fSub({ minutes: 10 }),
        },
      ],
    },
    {
      id: otherContacts[10].id,
      participants: [myContact, otherContacts[10]],
      type: 'ONE_TO_ONE',
      unreadCount: 0,
      messages: [
        {
          id: uuidv4(),
          senderId: myContact.id,
          body: _mock.sentence(10),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ days: 11 }),
        },
        {
          id: uuidv4(),
          senderId: otherContacts[10].id,
          body: _mock.sentence(11),
          contentType: 'text',
          attachments: [],
          createdAt: fSub({ days: 10 }),
        },
      ],
    },
  ];
};

## mail events table

const primaryMain = COLORS.primary.main;
const secondaryMain = COLORS.secondary.main;
const infoMain = COLORS.info.main;
const infoDarker = COLORS.info.darker;
const successMain = COLORS.success.main;
const warningMain = COLORS.warning.main;
const errorMain = COLORS.error.main;
const errorDarker = COLORS.error.darker;

const base = (index: number) => ({
  id: _mock.id(index),
  title: _mock.eventNames(index),
  description: _mock.description(index),
});

export const _events = () => [
  {
    ...base(1),
    allDay: false,
    color: primaryMain,
    start: fSub({ days: 12, hours: 3, minutes: 30 }),
    end: fSub({ days: 12, hours: 0, minutes: 0 }),
  },
  {
    ...base(2),
    allDay: false,
    color: infoMain,
    start: fSub({ days: 6, hours: 3, minutes: 30 }),
    end: fSub({ days: 6, hours: 0, minutes: 0 }),
  },
  {
    ...base(3),
    allDay: true,
    color: errorMain,
    start: dayjs(fSub({ days: 3 }))
      .startOf('day')
      .format(),
    end: dayjs(fSub({ days: 3 }))
      .endOf('day')
      .format(),
  },
  {
    ...base(4),
    allDay: false,
    color: secondaryMain,
    start: fSub({ days: 0, hours: 2 }),
    end: fSub({ days: 0, hours: 0 }),
  },
  {
    ...base(5),
    allDay: false,
    color: infoDarker,
    start: fAdd({ days: 2, hours: 1, minutes: 15 }),
    end: fAdd({ days: 2, hours: 2, minutes: 30 }),
  },
  {
    ...base(6),
    allDay: false,
    color: warningMain,
    start: fAdd({ days: 2, hours: 3, minutes: 15 }),
    end: fAdd({ days: 2, hours: 4, minutes: 30 }),
  },
  {
    ...base(7),
    allDay: false,
    color: successMain,
    start: fAdd({ days: 2, hours: 5, minutes: 15 }),
    end: fAdd({ days: 2, hours: 6, minutes: 30 }),
  },
  {
    ...base(8),
    allDay: false,
    color: infoMain,
    start: fAdd({ days: 2, hours: 7, minutes: 15 }),
    end: fAdd({ days: 2, hours: 8, minutes: 30 }),
  },
  {
    ...base(9),
    allDay: false,
    color: errorDarker,
    start: fAdd({ days: 6, hours: 0, minutes: 0 }),
    end: fAdd({ days: 6, hours: 0, minutes: 30 }),
  },
];

## files table

export const _files = () =>
  _fileNames.map((name, index) => ({
    id: _mock.id(index),
    name,
    path: URLS[index],
    preview: URLS[index],
    size: GB / ((index + 1) * 500),
    createdAt: _mock.time(index),
    modifiedAt: _mock.time(index),
    type: `${name.split('.').pop()}`,
  }));

## kanban tasks table

const generateAttachments = () => [...Array(20)].map((_, index) => _mock.image.cover(index));

const generateAssignees = () =>
  [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.fullName(index),
    avatarUrl: _mock.image.avatar(index),
  }));

const generateComments = () =>
  [...Array(8)].map((_, index) => ({
    id: uuidv4(),
    name: _mock.fullName(index),
    avatarUrl: _mock.image.avatar(index),
    createdAt: fSub({ minutes: 20 - index }),
    messageType: [1, 2].includes(index) ? 'image' : 'text',
    message: [1, 2].includes(index) ? _mock.image.cover(index + 5) : _mock.sentence(index),
  }));

const COLUMN_NAMES = {
  name1: 'To do',
  name2: 'In progress',
  name3: 'Ready to test',
  name4: 'Done',
};

const COLUMN_IDS = {
  id1: `${1}-column-${_mock.id(1)}`,
  id2: `${2}-column-${_mock.id(2)}`,
  id3: `${3}-column-${_mock.id(3)}`,
  id4: `${4}-column-${_mock.id(4)}`,
};

const PRIORITY_LEVEL = {
  low: 'low',
  medium: 'medium',
  hight: 'hight',
};

// ----------------------------------------------------------------------

const createTask = (index: number) => {
  const commentList = generateComments();
  const assignedUser = generateAssignees();
  const attachmentList = generateAttachments();

  const reporter = {
    id: _mock.id(16),
    name: _mock.fullName(16),
    avatarUrl: _mock.image.avatar(16),
  };

  return {
    id: `${index}-task-${_mock.id(index)}`,
    reporter,
    name: _mock.taskNames(index),
    labels: _tags.slice(0, index),
    comments: commentList.slice(0, index),
    assignee: assignedUser.slice(0, index),
    description: _mock.description(index),
    due: [fAdd({ days: index + 1 }), fAdd({ days: index + 2 })],
    priority:
      ([1, 3].includes(index) && PRIORITY_LEVEL.hight) ||
      ([2, 4].includes(index) && PRIORITY_LEVEL.medium) ||
      PRIORITY_LEVEL.low,
    attachments:
      (index === 1 && attachmentList.slice(11, 15)) ||
      (index === 5 && attachmentList.slice(4, 9)) ||
      [],
    status:
      ([0, 1, 2].includes(index) && COLUMN_NAMES.name1) ||
      ([3, 4].includes(index) && COLUMN_NAMES.name2) ||
      ([5].includes(index) && COLUMN_NAMES.name4) ||
      '',
  };
};

const tasks = () => ({
  [COLUMN_IDS.id1]: [createTask(1), createTask(2), createTask(3)],
  [COLUMN_IDS.id2]: [createTask(4), createTask(5)],
  [COLUMN_IDS.id3]: [],
  [COLUMN_IDS.id4]: [createTask(6)],
});

const columns = () => [
  { id: COLUMN_IDS.id1, name: COLUMN_NAMES.name1 },
  { id: COLUMN_IDS.id2, name: COLUMN_NAMES.name2 },
  { id: COLUMN_IDS.id3, name: COLUMN_NAMES.name3 },
  { id: COLUMN_IDS.id4, name: COLUMN_NAMES.name4 },
];

export const _board = () => ({
  tasks: tasks(),
  columns: columns(),
});

## mail table

export const _labels = () => [
  { id: 'all', type: 'system', name: 'all', unreadCount: 3 },
  { id: 'inbox', type: 'system', name: 'inbox', unreadCount: 1 },
  { id: 'sent', type: 'system', name: 'sent', unreadCount: 0 },
  { id: 'drafts', type: 'system', name: 'drafts', unreadCount: 0 },
  { id: 'trash', type: 'system', name: 'trash', unreadCount: 0 },
  { id: 'spam', type: 'system', name: 'spam', unreadCount: 1 },
  { id: 'important', type: 'system', name: 'important', unreadCount: 1 },
  { id: 'starred', type: 'system', name: 'starred', unreadCount: 1 },
  { id: 'social', type: 'custom', name: 'social', unreadCount: 0, color: COLORS.primary.main },
  {
    id: 'promotions',
    type: 'custom',
    name: 'promotions',
    unreadCount: 2,
    color: COLORS.warning.main,
  },
  { id: 'forums', type: 'custom', name: 'forums', unreadCount: 1, color: COLORS.error.main },
];

export const _mails = () =>
  [...Array(9)].map((_, index) => {
    const files = _files();

    const attachments =
      (index === 1 && files.slice(0, 2)) ||
      (index === 2 && files.slice(0, 4)) ||
      (index === 5 && files.slice(4, 10)) ||
      [];

    const folder =
      ([1, 2].includes(index) && 'spam') || ([3, 4].includes(index) && 'sent') || 'inbox';

    const labelIds =
      (index === 1 && ['promotions', 'forums']) ||
      (index === 2 && ['forums']) ||
      (index === 5 && ['social']) ||
      [];

    const from = {
      name: _mock.fullName(index),
      email: _mock.email(index),
      avatarUrl: [1, 2, 6].includes(index) ? null : _mock.image.avatar(index),
    };

    const to = [
      { name: 'Jaydon Frankie', email: 'demo@minimals.cc', avatarUrl: null },
      { name: _mock.fullName(12), email: _mock.email(12), avatarUrl: _mock.image.avatar(12) },
    ];

    return {
      id: _mock.id(index),
      to,
      from,
      folder,
      labelIds,
      attachments,
      createdAt: _mock.time(index),
      subject: _mock.postTitle(index),
      isUnread: [1, 3].includes(index),
      isImportant: _mock.boolean(index),
      message: _mock.description(index),
      isStarred: _mock.boolean(index + 2),
    };
  });

## products table

const COLORS = [
  '#FF4842',
  '#1890FF',
  '#FFC0CB',
  '#00AB55',
  '#FFC107',
  '#7F00FF',
  '#000000',
  '#FFFFFF',
];

const DESCRIPTION = `
<h6>Specifications</h6>
<table>
  <tbody>
    <tr>
      <td>Category</td>
      <td>Mobile</td>
    </tr>
    <tr>
      <td>Manufacturer</td>
      <td>Apple</td>
    </tr>
    <tr>
      <td>Warranty</td>
      <td>12 Months</td>
    </tr>
    <tr>
      <td>Serial number</td>
      <td>358607726380311</td>
    </tr>
    <tr>
      <td>Ships from</td>
      <td>United States</td>
    </tr>
  </tbody>
</table>

<h6>Product details</h6>
<ul>
  <li>
    <p>The foam sockliner feels soft and comfortable</p>
  </li>
  <li>
    <p>Pull tab</p>
  </li>
  <li>
    <p>Not intended for use as Personal Protective Equipment</p>
  </li>
  <li>
    <p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p>
  </li>
  <li>
    <p>Style: 921826-109</p>
  </li>
  <li>
    <p>Country/Region of Origin: China</p>
  </li>
</ul>
<h6>Benefits</h6>
<ul>
  <li>
    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>
    and durability.
  </li>
  <li>
    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>
    ning underfoot.
  </li>
  <li>
    <p>The foam midsole feels springy and soft.</p>
  </li>
  <li>
    <p>The rubber outsole adds traction and durability.</p>
  </li>
</ul>
<h6>Delivery and returns</h6>
<p>Your order of $200 or more gets free standard delivery.</p>
<ul>
  <li>
    <p>Standard delivered 4-5 Business Days</p>
  </li>
  <li>
    <p>Express delivered 2-4 Business Days</p>
  </li>
</ul>
<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>

`;

const generateAttachments = () => [...Array(20)].map((_, index) => _mock.image.product(index));

const generateReviews = () => {
  const attachments = generateAttachments();

  return [...Array(8)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.fullName(index),
    postedAt: _mock.time(index),
    comment: _mock.sentence(index),
    isPurchased: _mock.boolean(index),
    rating: _mock.number.rating(index),
    avatarUrl: _mock.image.avatar(index),
    helpful: _mock.number.nativeL(index),
    attachments:
      (index === 1 && attachments.slice(0, 1)) ||
      (index === 3 && attachments.slice(2, 4)) ||
      (index === 5 && attachments.slice(5, 8)) ||
      [],
  }));
};

const getColorSliceForIndex = (index: number) => {
  if (index === 0) return COLORS.slice(0, 2);
  if (index === 1) return COLORS.slice(1, 3);
  if (index === 2) return COLORS.slice(2, 4);
  if (index === 3) return COLORS.slice(3, 6);
  if (index === 4 || index === 16 || index === 19) return COLORS.slice(4, 6);
  if (index === 5 || index === 17) return COLORS.slice(5, 6);
  if (index === 6 || index === 18) return COLORS.slice(0, 2);
  if (index === 7) return COLORS.slice(4, 6);
  if (index === 8) return COLORS.slice(2, 4);
  if (index === 9 || index === 11) return COLORS.slice(2, 6);
  if (index === 10) return COLORS.slice(3, 6);
  if (index === 12) return COLORS.slice(2, 7);
  if (index === 13) return COLORS.slice(4, 7);
  if (index === 14) return COLORS.slice(0, 2);
  if (index === 15) return COLORS.slice(5, 8);
  return COLORS.slice(2, 6); // Default case
};

const generateRatings = () =>
  [...Array(5)].map((_, index) => ({
    name: `${index + 1} Star`,
    starCount: _mock.number.nativeL(index),
    reviewCount: _mock.number.nativeL(index + 1),
  }));

const generateImages = () => [...Array(8)].map((_, index) => _mock.image.product(index));

// ----------------------------------------------------------------------

export const _products = () =>
  [...Array(20)].map((_, index) => {
    const reviews = generateReviews();
    const images = generateImages();
    const ratings = generateRatings();

    const publish = index % 3 ? 'published' : 'draft';

    const category = (index % 2 && 'Shose') || (index % 3 && 'Apparel') || 'Accessories';

    const gender = (index % 2 && ['Men']) || (index % 3 && ['Women', 'Kids']) || ['Kids'];

    const available = (index % 2 && 72) || (index % 3 && 10) || 0;

    const inventoryType = (index % 2 && 'in stock') || (index % 3 && 'low stock') || 'out of stock';

    const priceSale = index % 3 ? null : _mock.number.price(index);

    return {
      id: _mock.id(index),
      gender,
      images,
      reviews,
      publish,
      ratings,
      category,
      available,
      priceSale,
      taxes: 10,
      quantity: 80,
      inventoryType,
      tags: _tags.slice(0, 5),
      code: `38BEE27${index}`,
      description: DESCRIPTION,
      sku: `WW75K521${index}YW/SV`,
      createdAt: _mock.time(index),
      name: _mock.productName(index),
      price: _mock.number.price(index),
      coverUrl: _mock.image.product(index),
      colors: getColorSliceForIndex(index),
      totalRatings: _mock.number.rating(index),
      totalSold: _mock.number.nativeM(index + 1),
      totalReviews: _mock.number.nativeL(index + 1),
      newLabel: { enabled: [1, 2, 3].includes(index), content: 'NEW' },
      saleLabel: { enabled: [4, 5].includes(index), content: 'SALE' },
      sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
      subDescription:
        'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    };
  });

