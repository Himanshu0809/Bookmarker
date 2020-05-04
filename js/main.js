// JAVASCRIPT FILE

//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    //When we submit the form we will store it in the localstorage as an array of objects
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /* Local Storage Test
        //It only stores strings 
    localStorage.setItem('test','Hello');   //add to local storage
    console.log(localStorage.getItem('test'));  

    localStorage.removeItem('test');   //remove from the local storage */

    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //bookmarks is JSON array so it has to be converted to strings 
    } else {
        //Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //to convert string to JSON
        //Add the bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear the form after submitting
    document.getElementById('myForm').reset();

    //Re-fetch the bookmarks
    fetchBookmarks();

    //Prevent the form from submitting
    e.preventDefault();
}

//Delete bookMark
function deleteBookmark(url) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch the bookmarks
    fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //to convert string to JSON

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '<h2>Websites</h2>';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=  '<div class="card card-body bg-light" style="padding:10px; margin:20px;">' +
                                        '<h3>' + name +
                                        ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" style="border-radius:20px;background-color:orangered;color:black;font-weight:700;letter-spacing:2px;font-size:.5em;float:right;margin:5px;" href="#"> Delete</a>' +
                                        ' <a class="btn btn-primary" style="background-color:violet;border-radius:20px;float:right;color:black;font-weight:700;letter-spacing:2px;font-size:.5em; margin:5px" target="_blank" href="' + url + '"> Visit</a>' +
                                        '</h3>' +
                                        '</div>';

    }
}

function validateForm(siteName, siteUrl){
     //to check if the form is filled
     if(!siteName||!siteUrl){
        alert('Please fill in the form');
        return false;
    }

    //to check if the url is valid we will use regular expression

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
 
    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}