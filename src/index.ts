import { Container } from 'typedi';
import { MovieService } from './movie';

export const MoviesService = Container.get(MovieService);
