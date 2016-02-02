# Hittup-Backend

# Production
```
npm install
forever start server.js
```
to stop server: `forever stop server.js`

# Development

default port is 8080

```
npm install
npm start
```

## EventHittups/GetAllHittups

```
{"success":true, "hittups":[
  {
    "_id": "<uid>",
    "title": "<title>",
    "isPrivate": <boolean>,
    "duration": <seconds>,
    "dateCreated": <seconds>,
    "images": [ {
		"lowQualityImageurl": "<full url>",
		"highQualityImageurl": "<full url>"
    },...],
    "usersJoined": [
       "_id": "<uid>",
       "fbid": "<fbid>",
       "firstName": "<firstName>",
        "lastName": "<lastName>",
        },
        ...
    ],
    "usersInvited": [ {
       "_id": "<uid>",
       "fbid": "<fbid>",
        "firstName": "<firstName>",
        "lastName": "<lastName>",
        },
        ...
    ],
    "loc": {
      "state": "<state>",
      "city": "<city>",
      "type": "Point",
      "coordinates": [<long>, <lat>],
      "lastUpdatedTime": <Int>
    }
  }
  , ...
]
}
```


## EventHittups/RemoveHittup
### POST format:
```
{
	"hittupuid": "<uid>",
	"owneruid": "<uid>",
	"ownerName": "<string>"
}
```
### Response format:
```
{"success":true}
```
or

```
{"success":false, "error":"<error message>"}
```

## EventHittups/PostHittup
### POST format:

```
{
	"ownerName": name,
	"ownerImageurl": imageurl,
    "coordinates": [longitude, latitude],
    "duration": <seconds>,
    "title": "<title>",
    "description": "<title>",
    "image": "<base64encodedimage>"
    "dateStarts": <seconds>,
    "imageurl": "<url>"
}
```
format of the image doesn't matter

### Response format:
```
{"success":true, "uid": "<uid>"}
```
or

```
{"success":false, "error":"<error message>"}
```