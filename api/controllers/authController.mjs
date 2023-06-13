import  asyncHandler  from "express-async-handler";

//*  Register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if(!name || !email || !password){
    
  }
});

//* login
const login = async (req, res) => {
  res.send("login");
};

export { register, login };
