import mongoose from 'mongoose';

const CalendarCardSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
    allDay: Boolean,
    invitationId: String
})

export default mongoose.model('CalendarCard', CalendarCardSchema, 'calendar_cards');