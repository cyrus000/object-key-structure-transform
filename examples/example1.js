const transform = require('../lib/transform');

let config = [
    { from: 'key', to: 'new.path', defaultValue: 'this was empty' },
];

let object = { key: 'some value' };

transform.exec(config, object, (err, newObject) => {
    console.log(newObject); // { new: { path: 'some value' } }
});

object = { key: null };

transform.exec(config, object, (err, newObject) => {
    console.log(newObject); // { new: { path: 'this was empty' } }
});

transform.exec([{from: '123'}], object, (err, newObject) => {
    console.log(err); // null
});


transform.exec({}, object, (err, newObject) => {
    console.log(err); // Error: invalid config
});


transform.exec(config, 123, (err, newObject) => {
    console.log(err); // Error: invalid object
});