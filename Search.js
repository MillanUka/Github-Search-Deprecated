document.getElementById("searchbutton").addEventListener("click", function() {
    console.log("search button clicked")
    performSearch(document.getElementById("searchbar").value);
});

function performSearch(searchedUsername) {
    clearResults();
    console.log(API + SEARCH_USER + searchedUsername)

    try {
        $.ajax({
            type: 'GET',
            url: API + SEARCH_USER + searchedUsername,
            dataType: 'jsonp',
            success: function(data) {
                console.log(data);

                var searchResults = document.getElementById('searchresults');

                data.data.items.forEach(userProfile => {
                    var userProfileElement = "<a href=\"" +
                        userProfile.html_url + "\"><div id=\"searcheduser\"><div id=\"userdetails\"><h1>" +
                        userProfile.login + "</h1> <img src=\"" +
                        userProfile.avatar_url + "\" alt=\"User profile image\"></div></div></a>";
                    searchResults.insertAdjacentHTML('beforeend', userProfileElement);
                });
            }
        });
    } catch (error) {
        searchResults.insertAdjacentHTML('beforeend', error);
    }
}

function clearResults() {
    $("#searchresults").empty();
}