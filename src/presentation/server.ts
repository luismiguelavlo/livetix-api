import express, { Router } from 'express';
import cors from 'cors';
import helmet from "helmet";
import hpp from 'hpp';
import morgan from 'morgan';

interface Options {
  port: number;
  routes: Router;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  
  
  async start() {
    
    this.app.use( express.json() ); 
    this.app.use( express.urlencoded({ extended: true }) ); 
    this.app.use( cors() )
    this.app.use( helmet() );
    this.app.use( hpp() );
    this.app.use( morgan('dev') );


    this.app.use('/api/v1',this.routes );

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }

  public close() {
    this.serverListener?.close();
  }

}
