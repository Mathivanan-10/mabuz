# ─── Stage 1: Build ─────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /build

COPY package.json ./
RUN npm install --omit=dev --no-fund --no-audit

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:18-alpine

LABEL maintainer="NeuroFlow HMI"
LABEL description="NeuroFlow HMI - Node-RED industrial robot operator dashboard"

# Create app user (non-root for security)
RUN addgroup -S neuroflow && adduser -S neuroflow -G neuroflow

# Create data directory for Node-RED
RUN mkdir -p /data && chown neuroflow:neuroflow /data

WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /build/node_modules ./node_modules

# Copy application files
COPY --chown=neuroflow:neuroflow flows.json /data/flows.json
COPY --chown=neuroflow:neuroflow settings.js /data/settings.js
COPY --chown=neuroflow:neuroflow package.json ./

# Switch to non-root user
USER neuroflow

EXPOSE 1880

# Health check — polls the Node-RED UI
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:1880/ | grep -q "Node-RED" || exit 1

# Start Node-RED pointing at /data where flows.json and settings.js live
CMD ["node", "node_modules/.bin/node-red", "--userDir", "/data", "--port", "1880"]
