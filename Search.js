document.getElementById("searchbutton").addEventListener("click", function() {
    clearResults();
    performSearch(API + SEARCH_USER + document.getElementById("searchbar").value);
    window.onscroll = function(ev) {
        //Checking whether the user is at the bottom of the webpage
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            nextSearchResults();
        }
    }
});

function performSearch(search) {
    $.ajax({
        type: 'GET',
        url: search,
        dataType: 'jsonp',
        success: function getProfile(data) {
            if (data.data.message) {
                alert("You have made too many calls to the Github API. Please try again in an hour");
                return;
            }

            nextSearchResultsLinks = data.meta.Link;
            console.log(data)
            displaySearchResults(data.data.items);
        },
        async: false
    });
}

function nextSearchResults() {
    console.log(nextSearchResultsLinks);
    if (nextSearchResultsLinks[0][0] != null && nextSearchResultsLinks[0][1].rel == NEXT)
        performSearch(nextSearchResultsLinks[0][0]);
    else if (nextSearchResultsLinks[1][0] != null && nextSearchResultsLinks[1][1].rel == NEXT) {
        performSearch(nextSearchResultsLinks[1][0]);
    }
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
}

function clearResults() {
    $("#searchresults").empty();
}