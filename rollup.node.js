const fs = require('fs');
const rollup = require('rollup');

rollup.rollup({
  input: 'index.js'
}).then((bundle) => bundle.generate({
  format: 'cjs'
})).then((bundled) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      'dist/assign-reducers.node.js',
      bundled.code,
      'utf8',
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      }
    );
  })
).catch((e) => {
  // eslint-disable-next-line
  console.error(e);
});
