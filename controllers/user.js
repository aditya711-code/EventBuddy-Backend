import User from "../models/User.js";
import UserInterest from "../models/UserInterest.js";
import { interests, interestsid } from "../utils/interests.js";
import axios from "axios";
import { sendMail } from "../utils/sendMail.js";
import { API_URLS } from "../utils/constant.js";
// ADD INTEREST

export const addInterests = async (req, res) => {
  try {
    const { userId } = req.params;
    const { interests: newInterests } = req.body;

    if (!Array.isArray(newInterests)) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    const interestIds = newInterests.map(
      (interest) => interests[interest.toLowerCase()]
    );
    const userInterests = await UserInterest.findOne({ userId });
    if (!userInterests) {
      const newUserInterests = new UserInterest({
        userId,
        interests: Array.from(new Set(interestIds)),
      });
      await newUserInterests.save();
    } else {
      const uniqueInterests = Array.from(
        new Set([...userInterests.interests, ...interestIds])
      );
      userInterests.interests = uniqueInterests;
      await userInterests.save();
    }

    res.status(200).json({ message: "Interest added successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to add interests " });
  }
};

// REMOVE INTEREST

export const removeInterests = async (req, res) => {
  try {
    const { userId } = req.params;
    const { interests: interestsToRemove } = req.body;
    if (!interestsToRemove) {
      res.status(400).json({ error: "Invalid data format" });
    }
    const userInterests = await UserInterest.findOne({ userId: userId });
    if (!userInterests) {
      return res.status(404).json({ error: "User has no interests." });
    }

    const idsToRemove = interestsToRemove.map(
      (interest) => interests[interest.toLowerCase()]
    );
    userInterests.interests = userInterests.interests.filter(
      (interestId) => !idsToRemove.includes(interestId)
    );

    await userInterests.save();
    res.status(200).json({ message: "Interests removed successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to remove interests" });
  }
};

// GET USER INFO BY USER ID

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// GET USER INTEREST

export const getUserInterests = async (req, res) => {
  try {
    const { userId } = req.params;
    const userInterests = await UserInterest.findOne({ userId });

    if (!userInterests) {
      return res.status(404).json({ error: "User has no interests." });
    }

    const interests = userInterests.interests.map(
      (interest) => interestsid[interest]
    );
    res.status(200).json({ interests });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to fetch user interests" });
  }
};

// DELETE USER

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    await UserInterest.deleteOne({ userId: userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to delete " });
  }
};

// GET USER'S REGISTERED EVENTS

export const getRegisteredEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ registeredEvents: user.registeredEvents });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to fetch registered events" });
  }
};

// MAKING USER REGISTER FOR AN EVENT

export const registerForEvent = async (req, res) => {
  try {
    const { userId } = req.params;
    const { eventId, eventName, summary, imgUrl } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the user is already registered for the event
    if (user.registeredEvents.find((event) => event.eventId === eventId)) {
      return res
        .status(400)
        .json({ error: "User is already registered for the event" });
    }

    user.registeredEvents.push({ eventId, eventName, summary, imgUrl });
    await user.save();
    sendMail(eventName, user.firstName, user.email);
    res
      .status(200)
      .json({ message: "User registered for the event successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to register for the event" });
  }
};

// GET USERS REGISTERED FOR EVENTS

export const getUsersRegisteredForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const users = await User.find({
      "registeredEvents.eventId": eventId,
    });

    res.status(200).json({ users });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch users registered for the event" });
  }
};

// GET EVENTS UNDER A PARTICULAR INTEREST

export const getEventsUnderCategory = async (req, res) => {
  try {
    const { categoryIds } = req.params;
    const token = process.env.THIRD_PARTY_API_KEY;
    const apiUrl = API_URLS.getEvents();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });
    const eventsData = response.data.events;

    // Filter events based on the provided category_id
    // const eventsUnderCategory = eventsData.filter((event) => event.category_id === categoryId);

    // res.status(200).json({ events: eventsUnderCategory });

    const eventsUnderCategory = eventsData.filter((event) =>
      categoryIds.includes(event.category_id)
    );

    res.status(200).json({ events: eventsUnderCategory });
  } catch (error) {
    console.error("Error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch events under the category" });
  }
};
