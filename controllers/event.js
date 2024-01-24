import axios from "axios";
import Event from "../models/Event.js";
import { city } from "../utils/city.js";
import { API_URLS } from "../utils/constant.js";
import { interestsid } from "../utils/interests.js";
export const getEvents = async (req, res) => {
  try {
    const apiKey = process.env.THIRD_PARTY_API_KEY;
    const apiUrl = API_URLS.getEvents();
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Process the API response
    const responseData = response.data.events;
    response.data.events.map(async (event) => {
      const existingEvent = await Event.findOne({ eventId: event.id });
      if (!existingEvent) {
        const newEvent = new Event({
          eventId: event.id,
          name: event.name.text,
          description: event.description.text,
          summary: event.summary,
          imgUrl: event.logo.original.url ? event.logo.original.url : null,
          cityId: event.venue_id,
        });
        const savedEvent = await newEvent.save();
      }
    });
    res.status(200).json({ events: responseData });
  } catch (error) {
    console.log(`Error finding events ${error}`);
    res.status(500).json(error);
  }
};
//GET EVENTS BY CITY

export const getEventsByCity = async (req, res) => {
  try {
    const { cityName } = req.query;
    const cityId = city[cityName];
    const data = await Event.find({ cityId: cityId });
  
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error finding events by city ${error}`);
    res.status(500).json(error);
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const apiKey = process.env.THIRD_PARTY_API_KEY;
    const apiUrl = API_URLS.getEventById(eventId);
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const responseData = response.data;
    const interestId = responseData.category_id; // Assuming category_id represents interest
    const interest = interestsid[interestId] || null;
    responseData.interest = interest;
    res.status(200).json({ data: responseData });
  } catch (error) {
    console.log(`Error finding events by city ${error}`);
    res.status(500).json(error);
  }
};
