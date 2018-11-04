# Install dependencies
# docker run -v "$(pwd)"/frontend:/frontend node:8 sh -c "cd /frontend && yarn && yarn build"
# docker run -v "$(pwd)"/admin:/admin node:8 sh -c "cd /admin && yarn && yarn build"
# toolbox sh -c "cd /media/root$PWD/frontend && npm install"
# toolbox sh -c "cd /media/root$PWD/admin && npm"
# Build production
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:/rootfs/$PWD" \
    -w="/rootfs/$PWD" \
    docker/compose:1.13.0 -f docker-compose.yml -f docker-compose.prod.yml build --force-rm