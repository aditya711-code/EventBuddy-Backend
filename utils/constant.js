export const API_URLS = {
  getEvents: () =>
    `https://www.eventbriteapi.com/v3/organizations/${process.env.ORGANIZATION_ID}/events`,
  getEventById:(eventId)=>
    `https://www.eventbriteapi.com/v3/events/${eventId}/`
  
};
