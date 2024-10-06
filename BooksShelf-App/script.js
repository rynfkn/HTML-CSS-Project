document.addEventListener("RENDER_BOOK" , function () {
    const FinishedBook = document.getElementById('finished-book-list');
    const UnfinishedBook = document.getElementById('unfinished-book-list');

    FinishedBook.innerHTML = '';
    UnfinishedBook.innerHTML = '';

    for (const book of BookList) {
        const BookElement = MakeBookElement(book);

        if(book.IsCompleted) {
            FinishedBook.append(BookElement)
        }
        else{
            UnfinishedBook.append(BookElement)
        }
    }

    SaveData();
});


document.addEventListener("DOMContentLoaded", function () {
    const SubmitBookForm = document.getElementById('input-new-book');

    SubmitBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        AddBookList();

        document.getElementById('input-book-title').value = '';
        document.getElementById('input-book-author').value = '';
        document.getElementById('input-book-year').value = '';
        document.getElementById('checkbox-book-finished').checked = false;
    });

    LoadData()
    document.dispatchEvent(new Event("RENDER_BOOK"));
})

function AddBookList() {
    const InputBookTitle = document.getElementById("input-book-title").value;
    const InputBookAuthor = document.getElementById("input-book-author").value;
    const InputBookYear = document.getElementById("input-book-year").value;
    const IsBookCompleted = document.getElementById("checkbox-book-finished").checked;

    const BookObject = GenerateBooksObject(
        InputBookTitle,
        InputBookAuthor,
        InputBookYear,
        IsBookCompleted
    );

    BookList.push(BookObject);

    document.dispatchEvent(new Event("RENDER_BOOK"))
}

function GenerateBooksObject(Title, Author, Year, IsCompleted) {
    return {
        Id : +new Date(),
        Title, 
        Author,
        Year,
        IsCompleted
    };
}

function MakeBookElement(BookObject){
    const BookTitle = document.createElement('h3');
    BookTitle.classList.add('book-name');
    BookTitle.innerText = BookObject.Title;

    const BookAuthor = document.createElement('p');
    BookAuthor.classList.add('book-author');
    BookAuthor.innerText = BookObject.Author;

    const BookYear = document.createElement('p');
    BookYear.classList.add('book-year');
    BookYear.innerText = BookObject.Year;

    const BookListElement = document.createElement('li');
    BookListElement.append(BookTitle, BookAuthor, BookYear)

    if(BookObject.IsCompleted) {
        const UndoButton = document.createElement('button');
        UndoButton.type = 'button';
        UndoButton.classList.add('undo-button');
        UndoButton.innerText = 'Undo';
        UndoButton.addEventListener('click', function () {
            BookObject.IsCompleted = false;
            document.dispatchEvent(new Event("RENDER_BOOK"));
        });
        
        const DeleteButton = document.createElement('button');
        DeleteButton.type = 'button';
        DeleteButton.classList.add('delete-button');
        DeleteButton.innerText = 'Delete';
        DeleteButton.addEventListener('click', function() {
            RemoveBooks(BookObject.Id);
        });

        BookListElement.append(UndoButton, DeleteButton);
    }
    else {
        const FinishedButton = document.createElement('button');
        FinishedButton.type = 'button'
        FinishedButton.classList.add('finished-button');
        FinishedButton.innerText = 'Finished';
        FinishedButton.addEventListener('click', function() {
            BookObject.IsCompleted = true;
            document.dispatchEvent(new Event("RENDER_BOOK"));
        });
        
        const DeleteButton = document.createElement('button');
        DeleteButton.type = 'button';
        DeleteButton.classList.add('delete-button');
        DeleteButton.innerText = 'Delete';
        DeleteButton.addEventListener('click', function() {
            RemoveBooks(BookObject.Id);
        })

        BookListElement.append(FinishedButton, DeleteButton);
    }

    return BookListElement;
}

function RemoveBooks(BookId){
    let TargetBookIndex = -1;
    for(let index in BookList) {
        if(BookList[index].Id === BookId){
            TargetBookIndex = index;
            break;
        }
    }

    if(TargetBookIndex === -1) {
        return;
    }

    BookList.splice(TargetBookIndex, 1);
    document.dispatchEvent(new Event("RENDER_BOOK"));
}