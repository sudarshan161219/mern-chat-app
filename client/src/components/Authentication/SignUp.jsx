import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "dcjzplmer");
      fetch("https://api.cloudinary.com/v1_1/dcjzplmer/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the feilds");
      setLoading(false);
    }
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast.success("Account created successfully!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error("Error Occured");
      setLoading(false);
    }
  };

  return (
    <>

      <VStack spacing={4} align="stretch">
        <FormControl id="name" isRequired>
          <FormLabel color="#EEEEEE">Name</FormLabel>
          <Input
            letterSpacing="1.1px"
            fontSize="1.1rem"
            fontFamily="monospace"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            letterSpacing="1.1px"
            fontSize="1.1rem"
            fontFamily="monospace"
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              letterSpacing="1.1px"
              fontSize="1.1rem"
              fontFamily="monospace"
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="confirmpassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              letterSpacing="1.1px"
              fontSize="1.1rem"
              fontFamily="monospace"
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
          <FormLabel>Upload your picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default SignUp;
