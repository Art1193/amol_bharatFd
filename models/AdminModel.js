import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    role: { type: String, default: "admin", unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
