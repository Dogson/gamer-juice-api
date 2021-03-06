export async function addMediaConfigToEpisode() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const MongoClient = require('mongodb').MongoClient;


// Connection URL
    const url = process.env.CONNECTION_STRING;
    const client = new MongoClient(url);
// Use connect method to connect to the server
    await client.connect();
    const db = await client.db("gamerjuice");


    await db.collection("episodes").updateMany({"media.name": "Artefact"}, {
        "$set": {
            "media.config": {
                "episodeMustInclude": [],
                "excludeStrings": [
                    "ARTEFACT",
                    "Au programme",
                    "pixels",
                    "pixels flash",
                    "dossier"
                ],
                "excludeRegex": [],
                "ignoreEpisode": [],
                "ignoreEpisodeRegex": [],
                "endOfParseStrings": ["Bibliographie"],
                "parseProperty": "description"
            },
        }
    });
    console.log("done");

    await client.close();
}