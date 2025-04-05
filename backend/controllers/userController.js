const User = require('../models/User');


const registerUser = async (req, res) => {
    try {
        let { email, password, role } = req.body;

        // Ensure email and role are lowercase for consistency
        email = email.toLowerCase();
        role = role.toLowerCase();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: `User already registered as '${existingUser.role}'. Please use a different email.`
            });
        }

        // ⚠️ Storing password as plain text (NOT SECURE)
        const newUser = await User.create({
            email,
            password,  // Stored as plain text
            role
        });

        return res.status(201).json({
            message: "User registered successfully (Password NOT hashed)",
            user: { id: newUser._id, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



const loginUser = async (req, res) => {
    try {
        console.log("🚀 Received Login Request:", req.body);

        let { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        email = email.toLowerCase();
        role = role.toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found for email:", email);
            return res.status(404).json({ message: "Email not registered. Please sign up first." });
        }

        console.log("📝 Stored Role:", user.role, " | 📝 Received Role:", role);
        if (user.role.toLowerCase() !== role) {
            return res.status(403).json({ 
                message: `This email is registered as '${user.role}', not '${role}'. Please login with the correct role.` 
            });
        }

        console.log("🔑 Entered Password:", password);
        console.log("🔑 Stored Password:", user.password);

        // ✅ Directly compare plain-text passwords (INSECURE)
        if (password !== user.password) {
            console.log("❌ Password does not match!");
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }

        console.log("✅ Login Successful!");
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { registerUser, loginUser };




