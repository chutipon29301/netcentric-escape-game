# Install dependencies
cd backend
yarn
cd ../frontend
yarn
cd ../admin
yarn
cd ..
# Build production
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --force-rm
cd frontend
yarn build
cd ../admin
yarn build
cd ..
rm -rf public
mkdir -p public
cp -a frontend/build/. public/
cp -a admin/build/. public/admin/