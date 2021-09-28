import React from 'react'
import { Heading, Text, } from '@chakra-ui/react';

const markettitle = () => {
    return (
        <div>
             <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: { base: '20%', md: '30%' },
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              NFT Ticketing
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              MarketPlace
            </Text>{' '}
          </Heading>
        </div>
    )
}

export default markettitle;
