$(document).ready(function () {
    $('#searchButton').click(function(){
        var searchText = $('#searchText').val();
        if(searchText.length > 0){
            ajaxReuest(searchText);
        }
        else{
            alert("Введите название фильма");
        }
    });

    $('#searchText').keypress(function(e){
        if(e.which == 13){
//             move code duplicates to separete function (line 3-9)
            var searchText = $('#searchText').val();
            if(searchText.length > 0){
                ajaxReuest(searchText);
            }
            else{
                alert("Введите название фильма");
            }
        }
    });

    $('#resetButton').click(function(){
        $('#searchText').val('');
        $('#results').html('');
    });
});

function ajaxReuest(term){
    $.ajax({
        type: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi',
        data: {'query': term, 'language' : 'ru-RU', 'api_key': 'd272326e467344029e68e3c4ff0b4059'},
        success: function(data){
            $.each(data.results, function (keyFilm, valFilm) {

                var urls = 'https://image.tmdb.org/t/p/w500';
                valFilm.poster_path = '<img src="'+urls+ valFilm.poster_path+'" />';
                valFilm.backdrop_path = '<img src="'+urls+ valFilm.backdrop_path+'" />';

                var $filmTable=$('<table class="table" align="center"></table>');
//        it would be good to make film presentation more user friendly (not a table with attr names and values)
//           example https://www.themoviedb.org/search?query=home&language=en-US      
                $.each(valFilm, function(keyAttr, valAttr)
                {
                    var $filtAttrTr=$('<tr><td>' + keyAttr + '</td><td>' + valAttr  + '</td></tr>');

                    $filmTable.append($filtAttrTr);
                });
                $('#results').append($filmTable);
            });

        }
    });
}
