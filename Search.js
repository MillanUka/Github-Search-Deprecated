document.getElementById("searchbutton").addEventListener("click", function() {
    console.log("search button clicked")
    performSearch(document.getElementById("searchbar").value);
});

function performSearch(searchedUsername) {
    clearResults();
    console.log(API + SEARCH_USER + searchedUsername);
    $.ajax({
        type: 'GET',
        url: API + SEARCH_USER + searchedUsername,
        dataType: 'jsonp',
        success: function getProfile(data) {
            var searchResults = document.getElementById('searchresults');

            console.log(data)
            data.data.items.forEach(userProfile => {
                SEARCH_USER_PROFILE_LIST.push(userProfile);
                var userProfileElement = "<a href=\"" +
                    userProfile.html_url + "\"><div class=\"card\" id=\"searcheduser\"><div class=\"card-title\"id=\"userdetails\" style=\"text-align: center;\"><h1>" +
                    userProfile.login + "</h1> <img class=\"card-img-top\" src=\"" +
                    userProfile.avatar_url + "\" alt=\"User profile image\"></div></div></a>";
                searchResults.insertAdjacentHTML('beforeend', userProfileElement);
            });

            console.log(SEARCH_USER_PROFILE_LIST);
        },
        async: false
    });
}

function clearResults() {
    $("#searchresults").empty();
}