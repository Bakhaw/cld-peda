import mongoose from 'mongoose'

const CalendarCardSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  allDay: {
    type: Boolean,
    default: true,
  },
  invitationId: mongoose.Schema.Types.ObjectId,
})

export default mongoose.model(
  'CalendarCard',
  CalendarCardSchema,
  'calendar_cards'
)
