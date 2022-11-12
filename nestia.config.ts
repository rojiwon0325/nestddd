import type nestia from 'nestia';

const NESTIA_CONFIG: nestia.IConfiguration = {
  input: 'src/**/*.controller.ts',
  output: 'doc/sdk',
  json: true,
  primitive: false,
  swagger: {
    output: 'doc/swagger.json',
  },
};

export default NESTIA_CONFIG;
