# notes
following code is added
```
afterAll((done) => {
    setImmediate(done);
});
```
[to fix jest connection issue](https://github.com/visionmedia/supertest/issues/520)

# before commit
```bash
yarn prettier
yarn lint
yarn compile
yarn test

# or

yarn build
```
