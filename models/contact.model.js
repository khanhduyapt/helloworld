const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    fullname: { type: String },
    phone: { type: String },
    contents: { type: String },

    reply_content: { type: String },
    reply_user: { type: String },
    
    status: { type: String },

    last_modify_ip: { type: String },
    last_modify_account: { type: String },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
