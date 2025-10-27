FROM otel/opentelemetry-collector-contrib:0.131.0 AS otel

FROM node:22.3.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22.3.0

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=otel /otelcol-contrib /otelcol-contrib
COPY --from=otel /etc/otelcol-contrib /etc/otelcol-contrib
COPY config.yaml /etc/otelcol-contrib/config.yaml

EXPOSE 4317 4318 3000

ENV NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
ENV OTEL_SERVICE_NAME="node-js-auto-instrument"
ENV OTEL_TRACES_EXPORTER="otlp"
ENV OTEL_NODE_RESOURCE_DETECTORS="env,host,os"

CMD sh -c "/otelcol-contrib --config=/etc/otelcol-contrib/config.yaml & npm run start:prod"