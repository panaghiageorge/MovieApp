import Realm from 'realm';
import MovieModel from './models/MovieModel';

const realm = new Realm({ schema: [MovieModel] });

const RealmService = {

    getAllMovies: () => realm.objects('Movie'),

    addMovie: (movies) => {
        const existingMovies = realm.objects('Movie');

        realm.write(() => {
            movies.forEach((item) => {
                const movieExists = existingMovies.filtered('id = $0', item.id).length > 0;

                if(item.id && !movieExists) {
                    realm.create('Movie', {
                        backdrop_path: item['backdrop_path'],
                        id: item['id'],
                        original_language: item['original_language'],
                        original_title: item['original_title'],
                        overview: item['overview'],
                        popularity: item['popularity'],
                        poster_path: item['poster_path'],
                        release_date: item['release_date'],
                        title: item['title'],
                        video: item['video'],
                        vote_average: item['vote_average'],
                        vote_count: item['vote_count'],
                    })
                }

            });
        });
    },
};

export default RealmService;
