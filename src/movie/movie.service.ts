import { Service, Inject } from 'typedi';
import { CLIENT_SERVICE } from '../client';
import type { IClientService } from '../client';
import type { IPage } from '../common/interfaces';
import type { IMovie } from './interfaces';


@Service()
export class MovieService {
  constructor(
    @Inject(CLIENT_SERVICE)
    private readonly clientService: IClientService
  ) {}

    public getMovieList(): Promise<IPage<IMovie[]>> {
      return this.clientService.get('v1/movie/list');
    }

    public getMovieById(movieId: number): Promise<IMovie> {
      return this.clientService.get(`v1/movie/${movieId}`);
    }
    
 
    public addMovie(movie: any): any {
      
    }
}