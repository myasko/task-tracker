import { Box } from "@chakra-ui/react";

function MainPanel(props) {
  const { variant, children, ...rest } = props;
  
  return (
    <Box
      variant={variant}
      flex={1}
      h="100vh"
      overflowY="auto"
      {...rest}
    >
      {children}
    </Box>
  );
}

export default MainPanel;