import * as React from "react";
import { Box, ChakraProvider, Heading, Link, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ReactSEOMetaTags from "react-seo-meta-tags";
import favicon from '../images/favicon.svg';
import metaimg from '../images/image.png';
import gatsbyConfig from "../../gatsby-config";
import Content from "../components/Content";
import Readme from "../components/Readme";
import { useEffect } from "react";

// markup
const IndexPage = () => {
  const [stat, setStat] = React.useState(null);
  useEffect(() => {
    fetch("https://s.forwarddomain.net")
      .then(res => res.json())
      .then(setStat)
      .catch(err => console.error(err));
  }, []);
  return (
    <ChakraProvider>
      <ReactSEOMetaTags
        render={(el) => <Helmet>{el}
          <link rel="icon" href={favicon} />
          <link rel="canonical" href='https://forwarddomain.net' />
        </Helmet>}
        website={{
          url: 'https://forwarddomain.net',
          title: 'ForwardDomain.net',
          language: 'en-US',
          description: 'Domain Forwarding Service using DNS. 100% free. No trackers.',
          image: gatsbyConfig.siteMetadata.siteUrl + metaimg,
          author: {
            email: 'willnode@wellosoft.net',
            name: 'Wildan M',
          },
        }}
      />
      <Box as="main" px={10} py={5} textAlign="center" maxWidth="1000px" mx="auto">
        <Box>
          <Heading as="h1" my={5}>
            ForwardDomain.net 📦
          </Heading>
          <Box my={5}>Domain Forwarding Service using DNS. <Text as="span" color="blue.800">100% free. No trackers.</Text></Box>
          <Text my={5} color="blue.800" fontSize={"2xl"}>
            {stat ? <b>{stat.domains}</b> : '...'} websites served 🔥
          </Text>
        </Box>

        <Content />
        <Readme />
        <Box my={5}>
          Proudly created by <Link href="https://github.com/willnode">Wildan M</Link> 🔥
        </Box>
      </Box>
      <a className="github-fork-ribbon" href="https://github.com/willnode/forward-domain" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
    </ChakraProvider>
  )
}

export default IndexPage
