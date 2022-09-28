echo "Switching to master gh-pages branch"
git checkout gh-pages

echo "Building app..."
npm run deploy 

echo "Deploying files to server...."
scp -r build/* root@82.180.162.253:/var/www/bookappoint.com/

echo "Done!"