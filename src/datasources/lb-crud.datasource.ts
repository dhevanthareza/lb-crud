import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'lb_crud',
  connector: 'mysql',
  url: 'mysql://root:mawarmelati@ssh.iris.my.id:3308/lb_crud',
  host: '127.0.0.1',
  port: 3308,
  user: 'root',
  password: 'mawarmelati',
  database: 'lb_crud',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LbCrudDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'lb_crud';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.lb_crud', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
