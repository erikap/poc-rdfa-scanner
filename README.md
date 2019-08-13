# poc-rdfa-scanner

Proof of concept to parse an RDFa snippet and convert it to triples.

## Usage

```
docker-compose up -d
curl -X http://localhost:3000/rdfa
```

The cURL request will parse the RDFa snippet from `./input/example.html` and return the triples as response.
