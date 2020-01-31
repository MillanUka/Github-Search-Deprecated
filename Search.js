document.getElementById("searchbutton").addEventListener("click", function() {
    console.log("search button clicked")
    performSearch(API + SEARCH_USER + document.getElementById("searchbar").value);
});

function performSearch(search) {
    clearResults();
    $.ajax({
        type: 'GET',
        url: search,
        dataType: 'jsonp',
        success: function getProfile(data) {
            nextSearchResultsLinks = data.meta.Link;
            console.log(data)
            displaySearchResults(data.data.items);
        },
        async: false
    });
}

function nextSearchResults() {
    clearResults();
    console.log(nextSearchResultsLinks);
    if (nextSearchResultsLinks[0][0] != null && nextSearchResultsLinks[0][1].rel == "next")
        performSearch(nextSearchResultsLinks[0][0]);
    else if (nextSearchResultsLinks[1][0] != null && nextSearchResultsLinks[1][1].rel == "next") {
        performSearch(nextSearchResultsLinks[1][0]);
    }
}

function prevSearchResults() {
    clearResults();
    console.log(nextSearchResultsLinks);
    if (nextSearchResultsLinks[0][0] != null && nextSearchResultsLinks[0][1].rel == "prev")
        performSearch(nextSearchResultsLinks[0][0]);
}

function displaySearchResults(items) {
    var searchResults = document.getElementById('searchresults');
    items.forEach(userProfile => {
        var userProfileElement = "<a href=\"" +
            userProfile.html_url + "\"><div class=\"card border\" id=\"searcheduser\"><div class=\"card-title\"id=\"userdetails\" style=\"text-align: center;\"><h1>" +
            userProfile.login + "</h1> <img class=\"card-img-top border\" src=\"" +
            userProfile.avatar_url + "\" alt=\"User profile image\"></div></div></a>";
        searchResults.insertAdjacentHTML('beforeend', userProfileElement);
    });

    searchResults.insertAdjacentHTML('beforeend', "<button class=\"btn bg-primary text-white\" id=\"prev\">Prev</button><button class=\"btn bg-primary text-white\" id=\"next\">Next</button>");
    document.getElementById("next").addEventListener("click", nextSearchResults);
    document.getElementById("prev").addEventListener("click", prevSearchResults);
}

function clearResults() {
    $("#searchresults").empty();
}