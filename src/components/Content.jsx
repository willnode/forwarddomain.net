import * as React from "react";
import { Box, Input, Textarea } from "@chakra-ui/react";
import psl from 'psl';
import { fixDomain, fixSource } from "../utils/parser";

const subrc = `
~.	IN	CNAME	r.forwarddomain.net
_.~.	IN	TXT	forward-domain=$
`
const apexrc = `
~.	IN	A	167.172.5.31
_.~.	IN	TXT	forward-domain=$
`

const Content = () => {
    const [domain, setDomain] = React.useState('');
    const [source, setSource] = React.useState('');
    const normalizedSource = React.useMemo(() => {
        return fixSource(source);
    }, [source]);
    const generatedRecord = React.useMemo(() => {
        let r = psl.parse(normalizedSource).subdomain ? subrc : apexrc;
        return r.replace(/\$/g, fixDomain(domain))
            .replace(/~/g, normalizedSource)
    }, [domain, normalizedSource]);
    return <Box py={3}>
        <Input my={1} value={source} textAlign="center" onChange={(e) => setSource(e.target.value)}
            placeholder="From where the domain is placed?" />
        <Input my={1} value={domain} textAlign="center" onChange={(e) => setDomain(e.target.value)}
            placeholder="To where the domain forwards to?" />
        <Box my={5}>
            Then put these DNS records on <b>{normalizedSource === '@' ? '<your-source-domain>' : normalizedSource}</b>:
        </Box>
        <Textarea readOnly fontFamily="monospace" value={generatedRecord} rows={6} />
        <Box my={5}>
            {normalizedSource !== '@' && <span>
                After putting these records,&nbsp;
                <a target="_blank" href={`https://dns.google/query?name=${normalizedSource}`}>
                    Check if Google DNS resolver has got your new records.
                </a>
            </span>}
        </Box>
    </Box>
}

export default Content;