const options = require('../bot-options.js');

module.exports = {
    name: 'find',
    description: 'Lookup a movie, TV show, or person and post a link back in channel',
    usage: `Usage: find [--'first', 'popular', 'pop'] <movie, TV, or person name>`,
    async execute (message, args) {
        let resultReturnType = 'first';
        if (args[0].substring(0, 2) === '--') {
            resultReturnType = RESULT_RETURN_TYPES[args.shift()];
        }
        
        const searchTerm = args.join(' ');
        const encodedSearchTerm = encodeURI(searchTerm);
        
        try {
            const fetchResponse = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${encodedSearchTerm}`);
            const apiResults = await fetchResponse.json();

            if (apiResults.total_results === 0) {
                return message.reply(`No results found for '${searchTerm}'`);
            }

            let result = null;
            if (resultReturnType === 'popular') {
                result = getMostPopularResult(apiResults.results);
            }
            else {
                result = apiResults.results[0];
            }

            console.debug('final result: ', {
                searchTerm,
                result,
            });

            message.reply(`Showing the _${resultReturnType === 'first' ? 'first' : 'most popular'}_ of ${apiResults.total_results} results for '${searchTerm}':`);
            message.reply(`${options.TMDB_BASE_URL}${result.media_type}/${result.id}`);
        }
        catch(e) {
            message.reply(e.message);
        };
    },
};

const RESULT_RETURN_TYPES = {
    '--first' : 'first',
    '--popular' : 'popular',
    '--pop' : 'popular',
};

const MEDIA_TYPES = {
    'tv' : 'tv',
    'television' : 'tv',
    'movie' : 'movie',
    'person' : 'person',
};

function getMostPopularResult(results) {
    let mostPopular = results[0];
    
    for (let i = 1; i < results.length; i++) {
        if (results[i].popularity > mostPopular.popularity) {
            mostPopular = results[i];
        }
    }

    return mostPopular;
};
