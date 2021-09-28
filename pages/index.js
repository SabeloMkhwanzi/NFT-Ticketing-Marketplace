/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal, { connectors } from "web3modal";
import { Flex, Container, Box, Image, Badge, useColorModeValue, Button, Heading,Text } from '@chakra-ui/react';

import { nftaddress, nftmarketaddress } from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import Hero from '../components/hero.tsx';


export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/5a36b4b31ade480f9fa7535c6fa41500")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
 
  // Chakra UI Ticket card Logic code
  const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
     name: 'Wayfarer Classic',
  description: 'The Greatest move',
  price: 0.190,
  buy: true,
}

  /*if (loadingState === 'loaded' && !nfts.length) return ( 
     < Box borderWidth = {500} borderColor = "purple.500" p = {5} className = "my-box">
      <Heading size="lg">NFT Ticket Marketplace...<Box as="span" color="red.500" sx={{".my-box:hover &": { color: "green.500",}     
      }} > No items in Marketplace!</Box></Heading></Box>)*/
             
  return (
    <div>
      <Navbar />
      <Hero />
      <Container maxW={'7xl'} p='12' >
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} >
            <Text pl="300" textAlign="justify" color={'blue.400'} as={'span'}>
              MarketPlace
            </Text>{' '}
          </Heading>
            <Flex p={50} w="full" alignItems="center" justifyContent="center">
                <Box
                    bg={useColorModeValue('white', 'gray.800')}
                    maxW="sm"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="lg"
                    position="relative">
                    <Image
                        src={data.imageURL}
                        alt={`Picture of ${data.name}`}
                        roundedTop="lg"
                    />
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            {data.isNew && (
                                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                                    New
                                </Badge>
                            )}
                        </Box>
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Box
                                fontSize="2xl"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated>
                                {data.name}
                            </Box>
                            <Button colorScheme="teal" size="md"
                            >
                                Buy
                            </Button>
                        </Flex>
                        <Flex justifyContent="space-between" alignContent="center">
                            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                                {data.description}
                            </Box>
                        </Flex>
                        <Flex justifyContent="space-between" alignContent="center">
                            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                                <Box as="span" color={'gray.600'} fontSize="lg" pl="250">
                                    Eth
                                </Box>
                                {data.price.toFixed(2)}
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Container>
      
      <Footer />
    </div>
      
  
  )
}
