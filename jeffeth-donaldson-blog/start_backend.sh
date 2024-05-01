# Create mount point
if [ ! -d database ]; then
    mkdir database
else
    echo "Using existing database dir at $(pwd)"
fi

if [ ! -d uploads ]; then
	mkdir uploads
else
	echo "Using existing uploads dir at $(pwd)"
fi

# Run container
docker container run -p 127.0.0.1:1337:1337 -v ./database:/opt/app/.tmp -v ./uploads:/opt/app/public/uploads -it joshuamcc/jeffeth-donaldson-blog-strapi:0.0.2