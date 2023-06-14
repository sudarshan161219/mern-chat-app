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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmitt = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("Please fill all the feilds");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        },
        config
      );
  
      toast.success("login success!!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setTimeout(() => {
        navigate("/chat");
      }, 2500);
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
        <FormControl id="Loginemail" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            letterSpacing="1.1px"
            fontSize="1.1rem"
            fontFamily="monospace"
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="Loginpassword" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              value={password}
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

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmitt}
          isLoading={loading}
        >
          Log In
        </Button>

        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;
