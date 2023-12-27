# https://hub.docker.com/_/caddy/tags?page=1&name=builder

FROM caddy:2.6.4-builder AS builder

RUN xcaddy build \
    --with github.com/caddyserver/forwardproxy@caddy2

RUN cp /usr/bin/caddy /caddy

HEALTHCHECK NONE
USER caddy
