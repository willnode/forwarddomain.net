var parse = require('url-parse')

export const fixDomain = (d) => {
    try {
        if (!d) throw new Error();
        if (!d.includes('//')) d = 'https://' + d;
        var u = parse(d, {});
        if (u.pathname.endsWith('/'))
            u.pathname += '*';
        return u.toString();
    } catch (error) {
        return 'https://example.com';
    }
}
export const fixSource = (d) => {
    try {
        if (!d) throw new Error();
        if (!d.includes('//')) d = 'http://' + d;
        var u = parse(d, {});
        u.protocol = '';
        return u.hostname;
    } catch (error) {
        return '@';
    }
}