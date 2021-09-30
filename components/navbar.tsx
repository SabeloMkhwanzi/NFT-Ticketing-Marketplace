import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';


import ColorModeSwitcher from './colorSwitch/ColorModeSwitcher.tsx'

 const connectWallet = async () => {
  // Check if MetaMask is installed on user's browser
  if(window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    // Check if user is connected to Mainnet
    if(chainId != '0x1') {
      alert("Please connect to Polygon Testnet");
    } else {
      let wallet = accounts[0];
      setWalletAddress(wallet);
    }
  } else {
    alert("Please install Mask");
  }
  }
 

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            color='purple.600'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Text fontSize="3xl" fontWeight="bold" >TicketVast</Text></Box>
            
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Stack direction={'row'} spacing={6}>
                <Link
                  px={2}
                  py={1}
                  fontWeight='bold'
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('purple.400', 'purple.400'),
                  }}
                  href={'/'}>Home</Link>
                <Link
                px={2}
                  py={1}
                  fontWeight='bold'
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('purple.400', 'purple.400'),
                }}  
                href={'sell'}>Sell Tickets</Link>
                <Link
                px={2}
                  py={1}
                  fontWeight='bold'
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('purple.400', 'purple.400'),
                }}
                href={'collections'}>Collectibles</Link>
                <Link
                px={2}
                  py={1}
                  fontWeight='bold'
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('purple.400', 'purple.400'),
                }}
               href={'dashboard'}>Dashboard</Link>
              </Stack>
             </HStack>   
          </HStack>
          <Flex alignItems={'center'}>
            <ColorModeSwitcher
             variant={'solid'}
              bg={'purple.400'}

              size={'sm'}
              mr={4}
            />
            <Button
              variant={'solid'}
              bg={'purple.400'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={connectWallet}
            >
              connect wallet
            </Button>
        
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
                <Link
                  px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
                  href={'/'}>Home</Link>
                <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}  
                href={'sell'}>Sell Ticket</Link>
                <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={'collections'}>Collectibles</Link>
                <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
               href={'dashboard'}>Dashboard</Link>
              </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

function setWalletAddress(wallet: any) {
  throw new Error('Function not implemented.');
}
