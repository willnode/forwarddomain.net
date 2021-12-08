import * as React from "react";
import { Box, ChakraProvider, Heading, Link } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ReactSEOMetaTags from "react-seo-meta-tags";
import favicon from '../images/favicon.svg';
import metaimg from '../images/image.png';
import gatsbyConfig from "../../gatsby-config";
import Content from "../components/Content";
import Readme from "../components/Readme";

// markup
const IndexPage = () => {
  return (
    <ChakraProvider>
      <ReactSEOMetaTags
        render={(el) => <Helmet>{el}<link rel="icon" href={favicon} /></Helmet>}
        website={{
          url: 'https://forwarddomain.net',
          title: 'ForwardDomain.net',
          language: 'en-US',
          description: 'Completely Free Domain Forwarding Service using 301 HTTP redirects. Without trackers or any hidden costs.',
          image: gatsbyConfig.siteMetadata.siteUrl + metaimg,
          author: {
            email: 'willnode@wellosoft.net',
            name: 'Wildan M',
          },
        }}
      />
      <Box as="main" p={5} textAlign="center" maxWidth="1000px" mx="auto">
        <Box>
          <Heading as="h1" my={5}>
            ForwardDomain.net 📦
          </Heading>
          <Box my={5}>Completely Free Domain Forwarding Service using 301 HTTP redirects. Without trackers or any hidden costs.</Box>
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
