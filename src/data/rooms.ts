// Rooms and prices. Edit prices here.

export const currency = 'PEN';

export interface Room {
  name: string;
  /** Price per room per night, in PEN */
  price: number;
  bathroom: string;
}

export interface RoomGroup {
  title: string;
  beds: string;
  /** Image name in src/assets/images (see src/data/images.ts) */
  image: string;
  rooms: Room[];
}

export const included = ['Breakfast', 'Towels', 'Shampoo and soap'];

export const notes = [
  'All rooms have bedside tables and a wardrobe',
  'Check-in after 3 pm and check-out at 12 pm. Late checkout options are available',
  'We do not take online payments. All payments are made in cash on arrival at the lodge',
];

export const roomGroups: RoomGroup[] = [
  {
    title: 'Single',
    beds: '1 single bed',
    image: 'room-single',
    rooms: [
      {
        name: 'Single room with shared bathroom',
        price: 70,
        bathroom: 'The bathroom is shared with one other room and comprises a shower, washbasin, and WC',
      },
      {
        name: 'Single room with ensuite bathroom',
        price: 80,
        bathroom: 'The ensuite bathroom comprises a shower, washbasin, and WC',
      },
    ],
  },
  {
    title: 'Twin',
    beds: '2 single beds',
    image: 'room-twin',
    rooms: [
      {
        name: 'Twin room with ensuite bathroom',
        price: 150,
        bathroom: 'The ensuite bathroom comprises a shower, washbasin, and WC',
      },
      {
        name: 'Twin room with private bathroom',
        price: 130,
        bathroom: 'The bathroom is directly opposite the room and comprises a shower, washbasin and WC',
      },
    ],
  },
  {
    title: 'Super King Size',
    beds: '1 super king-size bed',
    image: 'room-super-king',
    rooms: [
      {
        name: 'Super king-size room with ensuite bathroom',
        price: 200,
        bathroom: 'The ensuite bathroom comprises a bath, shower, washbasin, and WC',
      },
    ],
  },
  {
    title: 'Double',
    beds: '1 double bed',
    image: 'room-double',
    rooms: [
      {
        name: 'Standard double room with ensuite bathroom',
        price: 150,
        bathroom: 'The ensuite bathroom comprises a shower, washbasin, and WC',
      },
    ],
  },
  {
    title: 'Triple',
    beds: '3 single beds',
    image: 'room-triple',
    rooms: [
      {
        name: 'Triple room with ensuite bathroom',
        price: 200,
        bathroom: 'The ensuite bathroom comprises a shower, washbasin and WC',
      },
    ],
  },
];
