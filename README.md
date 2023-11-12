<h1 align="center">NBA Application 🏀</h1>

## About The Project

This was university assignment for _CAB432 - Cloud Computing_. The application is a API Mashup project using Docker and AWS. It uses a variety of APIs to show past and upcoming NBA games with player statistics, highlights, news, ticket information, stadium information and locations using Google Maps. The user can go through different games by selecting a date using the date picker to input a date or select one, as well as use the arrows to go to the previous or next day. The application has integration with Amazon S3 to keep track of the amount of page visits and the website is hosted on an S3 Bucket, while the server is ran on an EC2 instance.

## Getting Started

You'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [Docker](https://docs.docker.com/get-docker/).

You'll also need API keys for [SeatGeek](https://platform.seatgeek.com/), YouTube Data API v3 and Maps JavaScript API from the [Google Cloud Platform](https://console.cloud.google.com/). Optionally while running locally you'll need AWS credentials for programmatic access to display the page counter, otherwise this won't be displayed. These keys can be optional and the NBA games will still display, but not much else.

## Technologies Used

### Client

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Server

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [AWS SDK for Node](https://aws.amazon.com/sdk-for-node-js/)
- [Axios](https://axios-http.com/docs/intro)

## API References

- [BALLDONTLIE](https://www.balldontlie.io/)
- [SeatGeek](https://platform.seatgeek.com/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

## How To Use

### Local

These instructions will get a the project running locally.

From your command line, clone and run NBA-Application:

```bash
# Clone this repository
$ git clone https://github.com/Philllipe/nba-application.git

# Go into the repository
$ cd client

# Install dependencies
client $ npm install
```

From here we will run the client and server separately using Docker. Docker does not need to be used and the server can be ran locally using `npm start` in the server directory after installing dependencies using `npm install`, but the environment variables will need to be set for the terminal session or by using a _.env_ file.

```bash
# Pull the server image from Docker Hub
$ docker pull philllipe/nba-server

# Run the server image, mapping port 8000 to 8000 and setting the environment variables
# AWS credentials are optional and only needed if you want to display the page counter
$ docker run -dp 8000:8000 -e SEATGEEK_KEY=<seatgeek_client_id> -e YOUTUBE_KEY=<youtube_api_key> -e MAPS_KEY=<google_maps_api_key> philllipe/nba-server
```

Now the application should be running on [localhost:3000](http://localhost:3000/).

### Cloud (AWS)

These instructions will get the project running on AWS.

The server will need to be ran on an EC2 instance, this can be done by creating an EC2 instance, downloading Docker and running the following commands.

```bash
# Pull the server image from Docker Hub
$ docker pull philllipe/nba-server

# Run the server image, mapping port 8000 to 8000 and setting the environment variables
$ docker run -dp 8000:8000 -e SEATGEEK_KEY=<seatgeek_client_id> -e YOUTUBE_KEY=<youtube_api_key> -e MAPS_KEY=<google_maps_api_key> philllipe/nba-server
```

The server should now be running on the EC2 instance.

The client will need to be built and hosted on an S3 Bucket. From your command line, clone and run NBA-Application:

```bash
# Clone this repository
$ git clone https://github.com/Philllipe/nba-application.git

# Go into the repository
$ cd client

# Install dependencies
client $ npm install

# Build the client, this will create a build folder
client $ npm run build
```

Once the client has been built go into the build folder and update the config.json file with public IPv4 address/DNS of the EC2 instance on port 8000.

From here create an S3 Bucket to host the website and upload the contents _inside_ (not entire the folder) of the build folder to the bucket. The bucket will need to be configured to allow public access to the objects. Enable static website hosting and set the **index document** and **error document** to _index.html_. Then implement a bucket policy that grants public read access to the bucket. The bucket policy will need to be similar to the following, replacing _bucket-name_ with the name of the bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::bucket-name/*"]
    }
  ]
}
```

After this the website should be accessible from the endpoint provided by the bucket and make calls to the server on the EC2. If the counter does not display on the home page, then the bucket has been removed.
