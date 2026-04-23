import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";



export const signup = async (req, res) => {
     try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }  
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" }); 
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword     });
        await newUser.save();   
        return res.status(201).json({ message: "User registered successfully" });   
    
    }
    catch(error){ 
            res.status(500).json({ error: error.message  });                   
    }  
}


export const login = async (req, res) => {
        try {
            const { email, password } = req.body; 
            if (!email || !password) {     
                return res.status(400).json({ error: "Email and password are required" });
             }  
             const user = await User.findOne({ email });
            
                if (!user) {
                    return res.status(400).json({ error: "Invalid email or password" });        
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ error: "Invalid email or password" });
                }

                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                  res.cookie('token', token,{
                    secure: true, // Set to true since Render uses HTTPS
                    sameSite: 'None', // Allows cross-site cookies with HTTPS
                    httpOnly: true,
                    secure: true, // Render uses HTTPS
                    sameSite: 'None',
                    })

                return res.status(200).json({ message: "Login successful" });   
            
        }
        catch (error) { 
            res.status(500).json({ error: error.message });          
        }   
}


export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });           
}
