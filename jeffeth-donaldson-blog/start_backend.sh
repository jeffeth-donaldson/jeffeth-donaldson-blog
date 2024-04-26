# Create mount point
if [ ! -d database ]; then
    mkdir database
else
    echo "Using existing database dir at $(pwd)"
fi

# Run container
docker container run -p 1337 -v ./database:/opt/app/.tmp -it joshuamcc/jeffeth-donaldson-blog-strapi:latest