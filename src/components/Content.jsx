import * as React from "react";
import { Box, Input, Checkbox, Textarea } from "@chakra-ui/react";
import psl from 'psl';
import { fixDomain, fixSource } from "../utils/parser";

const subrc = `~.	IN	CNAME	r.forwarddomain.net
`
const apexrc = `~.	IN	A	167.172.5.31
~.	IN	AAAA	2400:6180:0:d0::e08:a001
`

const permrc = `fwd.~.	IN	TXT	forward-domain=$`
const temprc = `fwd.~.	IN	TXT	http-status=302;forward-domain=$`

const Content = () => {
    const [domain, setDomain] = React.useState('');
    const [source, setSource] = React.useState('');
    const [is301, setIs301] = React.useState(true);
    const parsedSource = React.useMemo(() => {
        return psl.parse(fixSource(source));
    }, [source]);
    const generatedRecord = React.useMemo(() => {
        let t = is301 ? permrc : temprc;
        let r = parsedSource.subdomain ? subrc : apexrc;
        return (r + t).replace(/\$/g, fixDomain(domain))
            .replace(/~/g, parsedSource.input)
    }, [domain, is301, parsedSource.input, parsedSource.subdomain]);
    return <Box py={3}>
        <Input my={1} value={source} textAlign="center" onChange={(e) => setSource(e.target.value)}
            placeholder="From where the domain is placed?" />
        <Input my={1} value={domain} textAlign="center" onChange={(e) => setDomain(e.target.value)}
            placeholder="To where the domain forwards to?" />
        <Checkbox my={1} checked={is301} defaultChecked onChange={(e) => setIs301(e.target.checked)}
            >Permanent redirection?</Checkbox>
        <Box my={5}>
            Then put these DNS records on <b>{parsedSource.error ? '<your-source-domain>' : parsedSource.domain}</b>:
        </Box>
        <Textarea readOnly fontFamily="monospace" value={generatedRecord} rows={6} />
        <Box my={5}>
            {!parsedSource.error && <span>
                After entering these records,&nbsp;
                <a target="_blank" rel="noreferrer" href={`https://dns.google/query?name=${parsedSource.input}`}>
                    Check if Google DNS resolver has got your new records.
                </a>
            </span>}
        </Box>
    </Box>
}

export default Content;