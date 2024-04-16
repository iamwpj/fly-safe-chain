FROM node:18

# Install basic development tools
RUN apt update && apt install -y less man-db sudo iproute2

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME


# This is the default port for hardhat chain
EXPOSE 8545/tcp

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Set default aliases
RUN echo 'alias hardhat="npx hardhat $@"' >> /home/node/.bashrc
