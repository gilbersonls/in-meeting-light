FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY packages/api .
COPY yarn.lock .

RUN yarn install --frozen-lockfile && yarn build

# ---

FROM node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/node_modules node_modules
COPY --from=builder /home/node/dist dist

CMD ["node", "dist/main.js"]
