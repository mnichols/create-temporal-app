# create-temporal-app

## Setup

Let's assume you are using `localhost` for your local services.

### HTTPS for everything

1. Install [mkcert](https://github.com/FiloSottile/mkcert).
1. `mkcert -install` (this just installs the CA to your system)
1. `mkcert localhost` (this makes all our `localhost` servers ok for HTTPS)
    1. Note that it creates `localhost.pem` and `localhost-key.pem` files in our root dir
    2. We will use these from our different servers to serve over https where needed