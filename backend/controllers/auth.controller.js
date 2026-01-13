import { supabase } from '../lib/supabase.config.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
  const { email, fullName, password, userType } = req.body; // userType: 'candidate' or 'company'
  
  try {
    // Validate inputs
    if (!email || !fullName || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    if (!['candidate', 'company'].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType
        }
      }
    });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    // Insert additional user data into profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email,
          full_name: fullName,
          user_type: userType,
          profile_pic: ''
        }
      ])
      .select()
      .single();

    if (profileError) {
      return res.status(400).json({ message: profileError.message });
    }

    res.status(201).json({
      user: authData.user,
      session: authData.session,
      profile
    });

  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      return res.status(400).json({ message: "Profile not found" });
    }

    res.status(200).json({
      user: data.user,
      session: data.session,
      profile
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user.id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update profile in Supabase
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({ profile_pic: uploadResponse.secure_url })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // Get profile data
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      user: req.user,
      profile
    });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile by ID
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};