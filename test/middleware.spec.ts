const expect = require('chai').expect;
const { OpenApiValidator } = require('../src');
const packageJson = require('../package.json');

describe(packageJson.name, () => {
  it('should succeed when spec exists and is valid', async () => {
    const oam = new OpenApiValidator({
      apiSpecPath: './openapi.yaml',
      enableObjectCoercion: true, // should be default
    });

    expect(oam)
      .to.have.property('install')
      .that.is.a('function');
  });

  it('should throw when spec is missing', async () => {
    const createMiddleware = () =>
      new OpenApiValidator({
        apiSpecPath: './not-found.yaml',
        enableObjectCoercion: true, // should be default
      });

    expect(createMiddleware).to.throw(
      'spec could not be read at ./not-found.yaml'
    );
  });
});
