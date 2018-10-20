import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  dates: String,
  checked: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('Invitation', InvitationSchema, 'invitations');