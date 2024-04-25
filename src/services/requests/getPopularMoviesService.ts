import {
  setPopularMovies,
} from '../../libraries/redux/slices';
import axios from "axios";

export function getPopularMoviesService() {

  return async (dispatch: (arg0: any) => any) => {
    // @ts-ignore
      const response: Object = await axios.get('https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGVmOTAxZTMxMjc5ZTQzMmJjNTEzODliNGY2ZjRkZSIsInN1YiI6IjY2MjU2YjdhMDdmYWEyMDE0OTk4NWVkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hEGgoomRqIUWEZ8SyYW8dkIhtY5NZhvs6T343OXV_Wo'
        }
        // data: options
      })
      .catch(error => console.error(error));

    if (response.data) {
        await dispatch(setPopularMovies(response.data.results));
    }
  };
}

