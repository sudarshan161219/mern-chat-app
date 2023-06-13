import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import  {Login, SignUp} from "../components"
const Home = () => {
  return (
    <Container gap="10px" display="grid" maxW="550px">
      <Box
        className="box-1"
        d="flex"
        justifyContent="center"
        p={3}
        width="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text textAlign="center">Chat WEB_APP</Text>
      </Box>

      <Box
        className="box-1"
        d="flex"
        justifyContent="center"
        p={3}
        width="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sing Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
