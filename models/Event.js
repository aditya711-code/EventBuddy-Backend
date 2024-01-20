import mongoose from 'mongoose'
const EventSchema = new mongoose.Schema(
  {
  eventId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  summary: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  cityId: {
    type: Number,
  
  },
  // start: {
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   time: {
  //     type: String,
  //   },
  // },
  // end: {
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   time: {
  //     type: String,
  //   },
  // },
  
  },{
    timestamps:true,
  }
);
const Event=mongoose.model("Event",EventSchema);
export default Event;