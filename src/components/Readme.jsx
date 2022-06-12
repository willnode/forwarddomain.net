import { Heading, ListItem, Text, UnorderedList, Code } from '@chakra-ui/layout';
import * as React from 'react';
import GitHubButton from 'react-github-btn';

const Readme = () => {
    return (
        <div className="readme">
            <Heading as="h2">FAQ</Heading>
            <Text>This services forwards domains using 301 HTTP(s) redirects.</Text>
            <Text>Besides it's free, it's also open source so you can see it's free of tracking or if you want to fork this service to your own server.</Text>
            <GitHubButton href="https://github.com/willnode/forward-domain" data-size="large" data-show-count="true" aria-label="Star willnode/forward-domain on GitHub">Check our GitHub page</GitHubButton>
            <Heading as="h3">Possible scenarios:</Heading>
            <UnorderedList>
                <ListItem>Forward non-www to www URLs or inversely</ListItem>
                <ListItem>Forward old URLs to new URLs</ListItem>
            </UnorderedList>
            <Heading as="h3">Why use this service?</Heading>
            <UnorderedList>
                <ListItem>No coding required</ListItem>
                <ListItem>No hosting required</ListItem>
                <ListItem>No registration required</ListItem>
                <ListItem>Completely anonymous</ListItem>
                <ListItem>Completely free</ListItem>
            </UnorderedList>
            <Heading as="h3">How it is possible?</Heading>
            <UnorderedList>
                <ListItem>Point your domain to us using CNAME or A records</ListItem>
                <ListItem>Tell us where to forward using TXT records</ListItem>
                <ListItem>We handle HTTPS certificates for you</ListItem>
            </UnorderedList>
            <Heading as="h3">Is it really free?</Heading>
            <Text style={{ maxWidth: 600 }}>Forwarding domains should be easy to set up.
                I use this myself for <a href="https://domcloud.io" target="_blank" rel="noreferrer">domcloud.io</a>.</Text>
            <Heading as="h3">How can I check redirects will work?</Heading>
            <Text style={{ maxWidth: 600 }}>This service uses Google's <a href="https://dns.google" rel="nofollow">Public DNS Resolver</a>.
                Once first accessed, values will be cached for a day.
                For right now there's no way to flush the cache sorry.</Text>
            <Heading as="h3">Why does it load slowly?</Heading>
            <Text>It is only being slow the first time because it has to sign HTTPS certificates.</Text>
            <Heading as="h3">How about IPv6?</Heading>
            <Text style={{ maxWidth: 600 }}>IPv6 record is added in <Code>r.forwarddomain.net</Code> so subdomain redirects will simply work with IPv6. We don't guarantee that its IPv6 address will be persistent though. See <a href="https://github.com/willnode/forward-domain/issues/2#issuecomment-1003831835" target="_blank" rel="noreferrer">#2</a> for apex domains setup.</Text>
            <Heading as="h3">What records do we keep?</Heading>
            <Text style={{ maxWidth: 600 }}>
                We only keep caches of DNS records and SSL certs. This also means we can see how many users and what domains are using our service from the software cache, but that's all. We don't keep log traffic nor keep any user data anywhere on our server.</Text>
            <Heading as="h3">Can you guarantee the uptime?</Heading>
            <Text style={{ maxWidth: 600 }}>
                We aimed to keep this service available at best. But as this is a free service, there's no guarantee.
                You can check our <a href="https://stats.uptimerobot.com/AA77Xt9Jx8" target="_blank" rel="noreferrer">status page</a> if you wanted to.</Text>
            <Heading as="h3">How can I support this service?</Heading>
            <Text>Star our repo and spread the word, please :)</Text>
            <Text>Additionally, you can also help us cover hosting costs.</Text>
            <p>
                <a href='https://ko-fi.com/willnode' target='_blank' rel="noreferrer"><img src='https://ko-fi.com/img/githubbutton_sm.svg' alt='Support me at ko-fi.com' /></a>
            </p>
            <Heading>Usual Disclaimer</Heading>
            <Text fontStyle="italic">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
            </Text>
        </div>
    );
}

export default Readme;
