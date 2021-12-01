const Book = require('../src/pages/book/Book.jsx').default;

test("book canary", () => {
    console.log(Book)
    expect(true).toEqual(true);
})