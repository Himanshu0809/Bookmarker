// JAVASCRIPT FILE

//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

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
    if(localStorage.getItem('bookmarks')===null){
        //Init array
        var bookmarks=[];
        //Add to array
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //bookmarks is JSON array so it has to be converted to strings 
    }else{
        //Get bookmarks from localstorage
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks')); //to convert string to JSON
        //Add the bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Prevent the form from submitting
    e.preventDefault();
}