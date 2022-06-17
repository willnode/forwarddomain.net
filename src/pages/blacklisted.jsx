import * as React from "react";
import { background, Box, ChakraProvider, Heading, Link } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ReactSEOMetaTags from "react-seo-meta-tags";
import favicon from '../images/favicon.svg';
import metaimg from '../images/image.png';
import gatsbyConfig from "../../gatsby-config";
import Content from "../components/Content";
import Readme from "../components/Readme";
import { useState } from "react";

const isBrowser = typeof window !== "undefined"

// markup
const IndexPage = () => {
    const [page, setPage] = useState(() => {
        return new URLSearchParams(isBrowser ? window.location.search : '').get('d')
    });
    return (
        <ChakraProvider>
            <ReactSEOMetaTags
                render={(el) => <Helmet>{el}<link rel="icon" href={favicon} /></Helmet>}
                website={{
                    url: 'https://forwarddomain.net/blacklisted',
                    title: 'Blacklisted | ForwardDomain.net',
                    language: 'en-US',
                    description: 'You\'ve been redirected for your safety',
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
                    <Box my={5}>
                        Sorry if this is incovencient, but you've been redirected for your safety.
                    </Box>
                </Box>
                <Box>
                    <Heading as="h2" my={5}>
                        Why? What? 🤔
                    </Heading>
                    <Box my={5}>
                        The site {page ? <strong>{page}</strong> : 'in question'} is using our <i>free service</i>  to redirect you to some <span style={{color: 'maroon'}}>dangerous website</span>,
                        which could be a spam or phising site. We have been alerted and override the website for your safety.
                    </Box>
                    <Box my={5}>
                        If you haven't aware about this, please to <strong>not go back</strong> to the site, if you can, block the person who send you the link.
                    </Box>
                    <Box my={5}>
                        <i>Seriously, block the person and go away.</i>
                    </Box>
                </Box>
                <hr />
                <Box>
                    <Heading fontSize={"1.5em"} as="h2" my={5}>
                        Shameless Plug: A free service? 👀
                    </Heading>
                    <Box my={5}>
                        <a href="/"><u>forwarddomain.net</u></a> is a free service to redirect domains.
                    </Box>
                    <Box my={5}>
                        If you have a domain on the internet, you can try our service, it's completely free and super simple to use.
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    )
}

export default IndexPage
