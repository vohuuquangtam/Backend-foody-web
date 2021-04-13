const seedingFolderName = 'seed-development';
module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'ec2-52-72-221-20.compute-1.amazonaws.com',
    url: 'postgres://fvfsunnvicugzl:4102242356c4a2d778ae97d1cd9a0e03b0339227acba56f8ff2a726c881bc10c@ec2-52-72-221-20.compute-1.amazonaws.com:5432/dbeng3m0hf5i1k',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false
    },
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/**/*.entity{.ts,.js}'],
    factories: ['src/database/factories/**/*.factory{.ts,.js}'],
    seeds: [`src/database/${seedingFolderName}/**/*.seed{.ts,.js}`],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  },
];
