import { Box, ChakraProvider, Heading, Input, Link, Textarea } from "@chakra-ui/react";
import * as React from "react";
import psl from 'psl';
import { fixDomain, fixSource } from "../utils/parser";
import { Helmet } from "react-helmet";
import ReactSEOMetaTags from "react-seo-meta-tags";

const subrc = `
~	IN	CNAME	r.forwarddomain.net
~	IN	TXT	forward-domain=https://$/*
~	IN	TXT	forward-domain-cert-maintainer=@
`
const apexrc = `
~	IN	A	206.189.61.89
~	IN	AAAA	2a03:b0c0:3:d0::13a8:c001
~	IN	TXT	forward-domain=$
~	IN	TXT	forward-domain-cert-maintainer=@
`

const Content = () => {
  const [domain, setDomain] = React.useState('');
  const [source, setSource] = React.useState('');
  const [email, setEmail] = React.useState('');
  const generatedRecord = React.useMemo(() => {
    let s = fixSource(source);
    let r = psl.parse(s).subdomain ? subrc : apexrc;
    return r.replace(/\$/g, fixDomain(domain)).replace(/\@/g, email || '<Your email here>').replace(/\~/g, s)
  }, [domain, email, source]);
  return <Box py={3}>
    <Input my={1} value={domain} textAlign="center" onChange={(e) => setDomain(e.target.value)}
      placeholder="To where the domain forwards to?" />
    <Input my={1} value={source} textAlign="center" onChange={(e) => setSource(e.target.value)}
      placeholder="From where the domain is placed?" />
    <Input my={1} value={email} autoComplete="email" textAlign="center" onChange={(e) => setEmail(e.target.value)}
      placeholder="Which email that owns or maintenance this domain?" />
    <Box my={5}>
      Then put these DNS records on <b>{source}</b>:
    </Box>
    <Textarea readOnly value={generatedRecord} rows="6" />
  </Box>
}
// markup
const IndexPage = () => {
  return (
    <ChakraProvider>
      <ReactSEOMetaTags
        render={(el) => <Helmet>{el}</Helmet>}
        website={{
          url: 'https://forwarddomain.net',
          title: 'ForwardDomain.net 📦',
          language: 'en-US',
          description: 'Forward domains completely free and trackers-free using 301 HTTP redirects.',
          author: {
            email: 'willnode@wellosoft.net',
            name: 'Wildan M',
          },
        }}
      />
      <Box as="main" p={5} textAlign="center" maxWidth="1000px" mx="auto">
        <Heading as="h1" my={5}>
          ForwardDomain.net 📦
        </Heading>
        <Box my={5}>Forward domains completely free and trackers-free using 301 HTTP redirects.</Box>

        <Box><small>(a beta service)</small></Box>
        <Content />
        <Box my={5}>
          <Link href="https://github.com/willnode/forward-domain#readme">
            Check our GitHub for explanations
          </Link>
        </Box>
        <Box my={5}>
          Proudly created by <Link href="https://github.com/willnode">Wildan M</Link> 🔥
        </Box>
      </Box>
      <a className="github-fork-ribbon" href="https://github.com/willnode/forward-domain" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
    </ChakraProvider>
  )
}

export default IndexPage
