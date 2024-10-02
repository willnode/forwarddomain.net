import * as React from "react";
import { Box, ChakraProvider, Heading, Input, Button, Checkbox } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ReactSEOMetaTags from "react-seo-meta-tags";
import favicon from '../images/favicon.svg';
import metaimg from '../images/image.png';
import gatsbyConfig from "../../gatsby-config";

// markup
const IndexPage = () => {
    const [domain, setDomain] = React.useState(window ? new URL(window.location.href).searchParams.get('domain') || '' : '');
    const [dnsState, setDnsState] = React.useState(null);

    React.useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('domain', domain);
        window.history.pushState({}, '', url);
    }, [domain])

    async function check() {
        const dom = domain;
        var txt1 = await (await fetch(`https://dns.google/resolve?name=_.${dom}&type=TXT`)).json();
        var txt2 = await (await fetch(`https://dns.google/resolve?name=fwd.${dom}&type=TXT`)).json();
        var a = await (await fetch(`https://dns.google/resolve?name=${dom}&type=A`)).json();
        const txt = txt1.Answer?.[0]?.data || txt2.Answer?.[0]?.data || '';
        const ip = a.Answer?.find(x => (x?.data + '').match(/[\d.]+/))?.data;
        console.log(txt, ip);
        setDnsState({ dom, txt, ip, txtPrefix: txt2.Answer?.[0]?.data == txt ? 'fwd.' : '_.' });
    }
    return (
        <ChakraProvider>
            <ReactSEOMetaTags
                render={(el) => <Helmet>{el}<link rel="icon" href={favicon} /></Helmet>}
                website={{
                    url: 'https://forwarddomain.net/blacklisted',
                    title: 'Purge Cache | ForwardDomain.net',
                    language: 'en-US',
                    description: 'Purge Our Cache',
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
                        Doesn't Working? Diagose with our Check and Purge Tool
                    </Box>
                </Box>
                <Box>
                    <form action="https://r.forwarddomain.net/flushcache" method="POST" encType="application/x-www-form-urlencoded">
                        <Heading as="h3" size='md' my={5}>
                            Step 1: Enter Your Domain 👇
                        </Heading>
                        <Box my={5}>
                            <Input textAlign="center" autocompletion="off" name="domain" placeholder="Enter Domain" required value={domain} onChange={e => setDomain(e.currentTarget.value)} />
                        </Box>

                        <Heading as="h3" size='md' my={5}>
                            Step 2: Check if Google DNS Picked Your TXT and CNAME records 👇
                        </Heading>

                        <Button onClick={check} isDisabled={!domain}>Check DNS</Button>
                        {dnsState && (<Box textAlign="left" width="fit-content" mx="auto" my={5}>
                            Domain Checked: <b>{dnsState?.dom}</b>  <br />
                            TXT Data {(dnsState?.txt + '').includes('forward-domain=') ? '✅' : '❌'}:   <b>{dnsState.txt}</b>  <br />
                            IP Address {dnsState?.ip == '167.172.5.31' ? '✅' : '❌'}: <b>{dnsState.ip}</b>  <br />
                            {(dnsState?.txt + '').includes('forward-domain=') && dnsState?.ip == '167.172.5.31' ? (
                                <p>Your DNS seems fine 🥳 URL redirect not correct? Fix it and <a href="https://dns.google/cache" target="_blank">Flush DNS Google</a> </p>
                            ) : (
                                <p>I think your DNS is incorrect 😢 Please fix it and <a href="https://dns.google/cache" target="_blank">Flush DNS Google</a> </p>
                            )}
                        </Box>)}

                        <Heading as="h3" size='md' my={5}>
                            Step 3: Try our Service Now 👇
                        </Heading>

                        <Box my={5}>
                            👉<a href={`https://${domain}`} target="_blank">Open {domain}</a>👈 <br />
                        </Box>

                        <Button type="submit" my={5}>Incorrect? Try Flush Our Cache</Button>

                    </form>
                </Box>
                <hr />
                <Box>
                    <Heading fontSize={"1.5em"} as="h2" my={5}>
                        Wait! What is this? 👀
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
