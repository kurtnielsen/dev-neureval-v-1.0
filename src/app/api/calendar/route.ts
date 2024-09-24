import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { _events } from 'src/_mock/_event';

// ----------------------------------------------------------------------
// The provided code is a TypeScript module for handling CRUD operations on event data within a Next.js application. This module is designed to run on the edge runtime, which allows for serverless functions to be executed closer to the user, reducing latency.
// ----------------------------------------------------------------------

export const runtime = 'edge';

type EventType = ReturnType<typeof _events>[number];

// A mutable array clonedData is initialized to store the event data. This array is used throughout the module to perform various operations on the event data.
let clonedData: EventType[] = [];

// The module defines four asynchronous functions to handle different HTTP methods:
/** **************************************
 * Get all events
 * GET: This function retrieves all events. It logs the current number of events, updates the clonedData array with the latest events from _events, and returns a response with the event data and a status of OK. If an error occurs, it handles the error using the handleError function.
 *************************************** */
export async function GET() {
  try {
    logger('Get events', clonedData.length);

    clonedData = _events();

    return response({ events: clonedData }, STATUS.OK);
  } catch (error) {
    return handleError('Event - Get all', error);
  }
}

/** **************************************
 * Create new event
 * POST: This function creates a new event. It extracts the new event data from the request body, adds it to the clonedData array, finds the newly added event by its ID, logs the new event and the updated number of events, and returns a response with the new event data and a status of OK. If an error occurs, it handles the error using the handleError function.
 *************************************** */
export async function POST(req: NextRequest) {
  try {
    const { eventData: newEvent } = await req.json();

    clonedData.push(newEvent);
    const event = findEventById(clonedData, newEvent.id);

    logger('New event', event);
    logger('Update Events', clonedData.length);

    return response({ event }, STATUS.OK);
  } catch (error) {
    return handleError('Event - Create', error);
  }
}

/** **************************************
 * Update event
 * PUT: This function updates an existing event. It extracts the updated event data from the request body, updates the clonedData array using the updateEventList function, finds the updated event by its ID, logs the updated event, and returns a response with the updated event data and a status of OK. If an error occurs, it handles the error using the handleError function.
 *************************************** */
export async function PUT(req: NextRequest) {
  try {
    const { eventData: updateEvent } = await req.json();

    clonedData = updateEventList(clonedData, updateEvent);
    const eventUpdated = findEventById(clonedData, updateEvent.id);

    logger('Update event', eventUpdated);

    return response({ event: eventUpdated }, STATUS.OK);
  } catch (error) {
    return handleError('Event - Update', error);
  }
}

/** **************************************
 * Delete event
 * PATCH: This function deletes an event. It extracts the event ID from the request body, removes the event from the clonedData array using the deleteEventById function, logs the deleted event ID and the updated number of events, and returns a response with the deleted event ID and a status of OK. If an error occurs, it handles the error using the handleError function.
 *************************************** */
export async function PATCH(req: NextRequest) {
  try {
    const { eventId } = await req.json();

    clonedData = deleteEventById(clonedData, eventId);

    logger('Delete event', eventId);
    logger('Update Events', clonedData.length);

    return response({ eventId }, STATUS.OK);
  } catch (error) {
    return handleError('Event - Delete', error);
  }
}

/** **************************************
 * Actions & Utility
 *************************************** */

// findEventById: This function finds an event in the array by its ID and returns it. If no event is found, it returns undefined.
function findEventById(events: EventType[], eventId: string): EventType | undefined {
  return events.find((event) => event.id === eventId);
}
// updateEventList: This function updates an event in the array by its ID. It returns a new array with the updated event data.
function updateEventList(events: EventType[], updatedEvent: EventType): EventType[] {
  return events.map((event) =>
    event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
  );
}
// deleteEventById: This function deletes an event from the array by its ID. It returns a new array without the deleted event.
function deleteEventById(events: EventType[], eventId: string): EventType[] {
  return events.filter((event) => event.id !== eventId);
}
// Overall, this module provides a comprehensive set of functions to manage event data, including creating, reading, updating, and deleting events, while ensuring proper error handling and logging.