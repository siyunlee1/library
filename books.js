
var idTracker = 0;
var bookArray = []; //array to store the books
var page = 1;

var readingStatusArray = []


function getId() {
    idTracker = idTracker + 1;
    return idTracker;
}


function Book(title, author, pages, read) { //blueprint for book object
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = getId(); // Call getID inside the constructor
    this.info = function () {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
    }
}


function helper(className, textContent){ //helper function to make a div with a certain classname and textcontent for when book object is converted into a div
    let element = document.createElement('div');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}

function addBooktoArray(...books) { //turns book object into div, adds to bookArray
    books.forEach(book => {
        let bookContainer = document.createElement('div');
        
        bookContainer.classList.add("book-container");
        let idCode = book.id
        bookContainer.setAttribute("id", idCode);
    
        //making a delete button
        let deleteButton = document.createElement('div');
        deleteButton.classList.add("delete-button");
        //adding the x icon
        let xIcon = document.createElement('i');
        xIcon.classList.add("fa-solid");
        xIcon.classList.add("fa-x");
        //append icon to button
        deleteButton.appendChild(xIcon);
        deleteButton.addEventListener("click", ()=> handleDelete(deleteButton));
        
        //adding title, author, pages and read/ unread
        bookContainer.appendChild(helper("title", book.title));
        bookContainer.appendChild(helper("author", book.author));
        bookContainer.appendChild(helper("pages", book.pages));
        bookContainer.appendChild(helper("read", book.read));
        bookContainer.appendChild(deleteButton)
        //appending to bookContainerLIst
        bookArray.push(bookContainer)});};
        
    

function handleForm(e) { //turns submitted book into to object, then by addBooktoArray function, turns it into an item in array
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let getSelectedValue = document.querySelector(   
        'input[name="read"]:checked').value;  
    newBook = new Book(title, author, pages, getSelectedValue);//makes a new book object for the specific book and then 
    addBooktoArray(newBook);
    form.reset();
    render();
}

function handleDelete(button){
    let bookContainer = button.parentElement;
    bookContainer.remove(); //removes the book from DOM 
    let idCode = bookContainer.id;
    bookArray = bookArray.filter(function (item) {
        return item.id != idCode 
    }); //removes the div from the array
    render();
    if (Math.floor(bookArray.length/3)== bookArray.length/3){
        if (bookArray.length != 0){
            handleBack();
            render();
        }
        else {
            let noBookAlert = document.createElement("div")
            noBookAlert.className = "book-container";
            noBookAlert.textContent = "No books yet!";

            container.appendChild(noBookAlert);
        };
        
    };
}

function handleRead(button) {
    let options = ["read", "unread", "reading"];
    let book = button.parentElement
    let readingStatus = button.textContent.toLowerCase();
    let index = options.indexOf(readingStatus);
    if (index == 2){
        var newIndex = 0;
    }
    else {
        var newIndex = index + 1;
    }
    bookArray[bookArray.indexOf(book)].read = options[newIndex];
    button.textContent = options[newIndex];
};

function handleBack() {
    if (page > 1){
        page = page - 1; //that way if the page
    }
};

function handleGo(){
    if (page < Math.ceil(bookArray.length/3)){
        page = page + 1;
    };
};

function render() {
    let books = document.querySelectorAll(".book-container")
    let visibleBooks = [];
    try {
        visibleBooks = bookArray.slice(3*page -3,3*page); //first adds 3 books within supposed page into array
    }
    catch {
        visibleBooks = bookArray.slice(3*page -3, -2); //if theres not enough books
    }
    
    books.forEach((book) => {
        book.remove();
    }); //removes already there books
    visibleBooks.forEach((book) => {
        container.appendChild(book);
    }); 
    //displays new book according to page number
    console.log("page is")
    console.log(page)
    readingStatusArray = document.querySelectorAll(".read");//finds the read/unread/reading buttons
    console.log(readingStatusArray)
    readingStatusArray.forEach(button => {
        console.log("i")
        button.addEventListener("click", ()=> handleRead(button));
    }); //added event listener to the read
    //arrow colour
    if (page <= 1) {
        backButton.classList.add("gray-arrow");
    }
    else {
        backButton.classList.remove('gray-arrow');
    };
    if (page >= Math.ceil(bookArray.length/3)) {
        goButton.classList.add("gray-arrow");
    }
    else {
        goButton.classList.remove("gray-arrow");
    };
}

const threeBodyProblem = new Book("The Three Body Problem", "Ci Xin Liu", "300", "read");
const hobbit = new Book("The Hobbit", "J.R.R Tolkein", "431", "unread");
const deathsEnd = new Book("Death's End", "Ci Xin Liu", "600", "reading");
const submitButton = document.getElementById("formSubmit")
const form = document.getElementById("form")
const goButton = document.getElementById("go")
const backButton = document.getElementById("back")
const container = document.querySelector('.container')


addBooktoArray(threeBodyProblem, hobbit, deathsEnd);
render();



goButton.addEventListener('click', function(){
    handleGo();
    render()
})

backButton.addEventListener('click', function(){
    handleBack();
    render()
})

submitButton.addEventListener('click', handleForm);




