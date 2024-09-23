import type { NextRequest } from 'next/server';


import { STATUS, response, handleError } from 'src/utils/response';



// ----------------------------------------------------------------------

export const runtime = 'edge';

// type EventType = ReturnType<typeof _events>[number];

// let clonedData: EventType[] = [];

/** **************************************
 * Get all events
 *************************************** */
// export async function GET() {
//   try {


 

//     return response({  }, STATUS.OK);
//   } catch (error) {
//     return handleError('', error);
//   }
// }

/** **************************************
 * Create new event
 *************************************** */
// export async function POST(req: NextRequest) {

// }

/** **************************************
 * Update event
 *************************************** */
// export async function PUT(req: NextRequest) {
//   try {

// }

/** **************************************
 * Delete event
 *************************************** */
// export async function PATCH(req: NextRequest) {

// }

/** **************************************
 * Actions & Utility
 *************************************** */

// function findEventById(events: EventType[], eventId: string): EventType | undefined {
//   return events.find((event) => event.id === eventId);
// }

// function updateEventList(events: EventType[], updatedEvent: EventType): EventType[] {
//   return events.map((event) =>
//     event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
//   );
// }

// function deleteEventById(events: EventType[], eventId: string): EventType[] {
//   return events.filter((event) => event.id !== eventId);
// }
