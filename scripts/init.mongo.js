db.urls.remove({});

const urlList = [
    {
        id: 1,
        long_url: 'https://www.google.com',
        short_url: 'temp'
    },
    {
        id: 2,
        long_url: 'https://www.steampowered.com',
        short_url: 'temp_2'
    }
];

db.urls.insertMany(urlList);
const count = db.urls.count();
print('Inserted', count, 'urls');

db.counters.remove({_id: 'urls'});
db.counters.insert({ _id: 'urls', current: count });

db.urls.createIndex({ short_url: 1 }, {unique: true})