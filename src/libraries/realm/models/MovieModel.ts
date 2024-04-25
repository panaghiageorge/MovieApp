import Realm from 'realm';

class MovieModel extends Realm.Object {

    constructor(realm, properties) {
        super(realm, properties);
    }

    static schema = {
        name: 'Movie',
        properties: {
            backdrop_path: 'string',
            id: 'int',
            original_language: 'string',
            original_title: 'string',
            overview: 'string',
            popularity: 'double',
            poster_path: 'string',
            release_date: 'string',
            title: 'string',
            video: 'bool',
            vote_average: 'double',
            vote_count: 'int',
        },
        primaryKey: 'id',
    };
}

export default MovieModel;
