import { connectToDB } from "@/lib/dbConnect";
import Admin from "@/models/AdminModel";

import bcrypt from "bcryptjs";

export async function POST(req) {
    await connectToDB();
    const { password } = await req.json();
    console.log(password);
    try {

        const existingAdmin = await Admin.findOne({ role: "admin" });
        // Hash password
        console.log(existingAdmin);
        if (existingAdmin==null) {
            const newAdmin = new Admin({ role: "admin", password });
            const hashedPassword = await bcrypt.hash(password, 10);
            newAdmin.password = hashedPassword;
            await newAdmin.save();
            return new Response("Admin created successfully", { status: 201 });
            
        }
        const hashedPassword = await bcrypt.hash(password, 10);
         existingAdmin.password = hashedPassword;
        await newAdmin.save();

        return new Response("Admin created successfully", { status: 201 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function PUT(req) {
    await connectToDB();
    const { password } = await req.json();

    try {
        const admin = await Admin.findOne({ role: "admin" });

        if (!admin) {
            return new Response("Admin not found!", { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return new Response("Incorrect password!", { status: 401 });
        }

        return new Response("Login successful", { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
