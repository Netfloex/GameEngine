ARG NODE_IMAGE=node:16-alpine

FROM $NODE_IMAGE AS deps
WORKDIR /app

COPY package.json yarn.lock ./
COPY packages/gameEngine/package.json ./packages/gameEngine/
COPY packages/examples/package.json ./packages/examples/

RUN yarn config set network-timeout 600000 -g
RUN yarn install --frozen-lockfile

FROM $NODE_IMAGE AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json tsconfig.project.json ./

COPY package.json yarn.lock ./
COPY packages ./packages

# Temporary until Next.js swc updates for arm
RUN echo '{"presets":["next/babel"]}' > .babelrc

RUN yarn --cwd packages/gameEngine build
RUN yarn --cwd packages/examples build && yarn --cwd packages/examples export


FROM nginx:stable-alpine AS runner
WORKDIR /app


COPY --from=builder /app/packages/examples/out /usr/share/nginx/html